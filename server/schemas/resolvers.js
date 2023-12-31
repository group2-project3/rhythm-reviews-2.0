// Import the models
const { User } = require('../models');
const { Review } = require('../models/Review');
const { signToken, AuthenticationError } = require('../utils/auth');
const fetch = require('node-fetch');
require('dotenv').config()
const audioDbRootUrl = 'https://theaudiodb.p.rapidapi.com';
//AUDIO DB API KEY
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
    getUserProfile: async (parent, {}, context) => {
      const user = await User.findOne({ email: context.req.user.email }).populate({
        path: 'savedReviews',
        populate: {
          path: 'user',
          options: {
            strictPopulate: false,
          },
        },
      });

      if (!user) {
        throw AuthenticationError;
      }

      // Include 'rating' in each saved review
      const updatedSavedReviews = user.savedReviews.map((review) => ({
        ...review.toObject(),
        user: {
          _id: review.user._id.toString(),
          username: review.user.username,
          email: review.user.email,
        },
        rating: review.rating, 
      }));

      return { ...user.toObject(), savedReviews: updatedSavedReviews };
    },
    reviews: async (parent, { idAlbum }) => {
      const reviews = await Review.find({ idAlbum }).populate('user');
      return reviews.map((review) => ({
        ...review.toObject(),
        user: {
          _id: review.user._id.toString(),
          username: review.user.username,
          email: review.user.email,
        },
      }));
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
    getTopAlbums: async (parent, args, context) => {
      const reviews = await Review.find()
      const albumIds = reviews.map(review => review.idAlbum)
      const idCounts = albumIds.reduce((acc, id) => {
        acc[id] = (acc[id] || 0) + 1;
        return acc;
      }, {});
    //Logic to get the top 4 albums
      const sortedIds = Object.keys(idCounts).sort((a, b) => idCounts[b] - idCounts[a]);
    
      const topIdALbums = sortedIds.slice(0, 4);
      
      const albums = []
      for (let i = 0; i < topIdALbums.length; i++) {
        const response = await fetch(`${audioDbRootUrl}/album.php?m=${topIdALbums[i]}`, audioDbOptions);
        const data = await response.json();
        albums.push(data.album[0])
      }
      return albums;
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
      
      const user = await User.findOne({ email: context.req.user.email });
      if (!user) {
        throw AuthenticationError('User not found');
      }
      const correctPw = await user.isCorrectPassword(currentPassword);
      if (!correctPw) {
        throw AuthenticationError('Incorrect password');
      }
      if (newPassword !== confirmPassword) {
        throw AuthenticationError;
      }
      user.password = newPassword;
      await user.save();
      const token = signToken(user);
      return { token, user };
    },
    createReview: async (parent, { title, content, idAlbum, rating }, context) => {
      
      if (context.req.user) {
        const review = await Review.create({
          title: title,
          content: content,
          idAlbum: idAlbum,
          rating: rating, 
          user: context.req.user._id,
        });
    
        await User.findOneAndUpdate(
          { _id: context.req.user._id },
          { $addToSet: { savedReviews: review._id } }
        );
    
        return review;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },
    
    updateReview: async (parent, { id, title, content, rating }, context) => {
      if (!context.req.user) {
        throw new Error('You need to be logged in to update a review');
      }
      try {
        const existingReview = await Review.findOne({ _id: id });
        if (!existingReview) {
          throw new Error('Review not found');
        }

        if (existingReview.user._id.toString() !== context.req.user._id.toString()) {
          throw new Error('You do not have permission to delete this review');
        }
          existingReview.title = title;
          existingReview.content = content;
          existingReview.rating = rating;
        await existingReview.save();
        return existingReview;
      } catch (error) {
        throw new Error('Error updating the review: ' + error.message);
      }
    },
    deleteReview: async (parent, { reviewId }, context) => {
      if (context.req.user) {
        try {
          const review = await Review.findOne({ _id: reviewId }).populate('user');
          if (!review) {
            throw new Error('Review not found');
          }
          if (review.user._id.toString() !== context.req.user._id.toString()) {
            throw new Error('You do not have permission to delete this review');
          }
    
          await Review.deleteOne({ _id: reviewId });
    
          await User.findOneAndUpdate(
            { _id: context.req.user._id },
            { $pull: { savedReviews: review._id } }
          );
    
          return review;
        } catch (error) {
          throw new Error('Error deleting the review: ' + error.message);
        }
      }
      throw new AuthenticationError ('You need to be logged in to delete a review');
    },
    deleteAccount: async (parent, { password }, context) => {
      if (context.req.user) {
        const user = await User.findOne({ _id: context.req.user._id });
  
        if (!user) {
          throw AuthenticationError;
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new Error('Incorrect password. Account not deleted.');
        }
  
        try {
          await Review.deleteMany({ user: context.req.user._id });
  
          await User.deleteOne({ _id: context.req.user._id });
  
          context.res.clearCookie('token'); // Clear the user's token
  
          return {
            success: true,
            message: 'Account deleted successfully!',
          };
        } catch (error) {
          throw new Error('Error deleting the account: ' + error.message);
        }
      }
  
      throw new AuthenticationError('You need to be logged in to delete your account.');
    },
  },
};

module.exports = resolvers;