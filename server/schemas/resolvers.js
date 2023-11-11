const { User } = require('../models');
const { Review } = require('../models/Review');
const { signToken, AuthenticationError } = require('../utils/auth');
const fetch = require('node-fetch');
require('dotenv').config()
const audioDbRootUrl = 'https://theaudiodb.p.rapidapi.com';

const audioDbOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'X-RapidAPI-Key': process.env.AUDIODB_APIKEY,
    'X-RapidAPI-Host': 'theaudiodb.p.rapidapi.com',
  },
};

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('reviews');
    },
    getUserProfile: async (parent, { }, context) => {
      const user = await User.findOne({ email: context.req.user.email });
      if (!user) {
        throw AuthenticationError;
      }
      return user.populate('savedReviews');
    },
    reviews: async (parent, { idAlbum }) => {

      const reviews = await Review.find({ idAlbum }).populate('user_id');
        return reviews.map((review) => ({
          ...review.toObject(),
          user: {
            _id: review.user_id._id.toString(),
            username: review.user_id.username,
            email: review.user_id.email,
          },
        }));

      // return Review.find({idAlbum: idAlbum}).populate('user_id').sort({ createdAt: -1 });
    },
    review: async (parent, { reviewId }) => {
      return Review.findOne({ _id: reviewId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user.id }).populate('reviews');
      }
      throw AuthenticationError;
    },
    getAlbumsByArtist: async (parent, { artistName }, context) => {
      try {

        const searchResult = await fetch(`${audioDbRootUrl}/searchalbum.php?s=${artistName}`, audioDbOptions);
        const albums = await searchResult.json();

        return albums.album;
      } catch (error) {
        console.error('Error fetching albums:', error);
        throw error;
      }

    },

    getAlbumById: async (parent, { idAlbum }, context) => {
      try {
        const response = await fetch(`${audioDbRootUrl}/album.php?m=${idAlbum}`, audioDbOptions);
        const data = await response.json();
        return data.album[0] || null;
      } catch (error) {
        console.error('Error fetching album by ID:', error);
        throw error;
      }
    },
  },

  Mutation: {
    registerUser: async (parent, { username, email, password }) => {


      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return { token, user };
    },
    logoutUser: async (parent, args, context) => {

      if (context.req.user) {
        context.res.clearCookie('token'); // If using cookies

        context.req.user = null;

        return true;
      } else {
        return false;
      }
    },
    updatePassword: async (parent, { currentPassword, newPassword, confirmPassword }, context) => {
      // console.log(context)
      const user = await User.findOne({ email: context.req.user.email });
      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(currentPassword);
      if (!correctPw) {
        throw AuthenticationError;
      }
      if (newPassword !== confirmPassword) {
        throw AuthenticationError;
      }
      user.password = newPassword;
      await user.save();
      const token = signToken(user);
      return { token, user };
    },

    createReview: async (parent, { title,content,idAlbum }, context) => {
      console.log(title,content,idAlbum,context.req.user)
      if (context.req.user) {
        console.log('REV',context.req.user._id);
        const review = await Review.create({
          title: title,
          content: content,
          idAlbum: idAlbum,
          user_id: context.req.user._id,
        });

        await User.findOneAndUpdate(
          { _id: context.req.user._id },
          { $addToSet: { reviews: review._id } }
        );

        return review;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },
    updateReview: async (parent, { input }, context) => {
      if (!context.user) {
        throw new Error('You need to be logged in to update a review');
      }
      try {
        const existingReview = await Review.findByPk(input.id);
        if (!existingReview) {
          throw new Error('Review not found');
        }
        if (input.title) {
          existingReview.title = input.title;
        }
        if (input.content) {
          existingReview.content = input.content;
        }
        await existingReview.save();
        return existingReview;
      } catch (error) {
        throw new Error('Error updating the review: ' + error.message);
      }
    },
    removeReview: async (parent, { reviewId }, context) => {
      if (context.user) {
        const review = await Review.findOneAndDelete({
          _id: reviewId,
          reviewUser: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { reviews: review._id } }
        );
        return review;
      }
      throw AuthenticationError;
    },

  },
};

module.exports = resolvers;