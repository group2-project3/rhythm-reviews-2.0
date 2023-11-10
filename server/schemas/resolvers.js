const { User, Review } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const fetch = require ('node-fetch');
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
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('reviews');
        },
        reviews: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Review.find(params).sort({ createdAt: -1 });
        },
        review: async (parent, { reviewId }) => {
            return Review.findOne({ _id: reviewId});
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user.id }).populate('reviews');
            }
            throw AuthenticationError;
        },
        getAlbumsByArtist: async (parent, {artistName}, context) => {
          try {

            const searchResult = await fetch(`${audioDbRootUrl}/searchalbum.php?s=${artistName}`, audioDbOptions);
            const albums = await searchResult.json();

            return albums.album;
          } catch (error) {
            console.error('Error fetching albums:', error);
            throw error;
          }
          
        },
    
        getAlbumById: async (parent, id, context) => {
           try {
        const response = await fetch(`${audioDbRootUrl}/album.php?m=${id}`, audioDbOptions);
        const album = await response.json();
        return album;
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
              // Clear the JWT token on the client side
              context.res.clearCookie('token'); // If using cookies
      
              // Optionally, clear the user data from the context to indicate logout
              context.req.user = null;
      
              return true;
            } else {
              // If the user is not authenticated, return false (or handle as needed)
              return false;
            }
          },
        updatePassword: async (parent, { oldPassword, newPassword, confirmPassword }, context) => {
            if (!context.user) {
              throw new AuthenticationError('You need to be logged in to update your password.');
            }
            const user = await User.findById(context.user.id);
            if (!user) {
              throw new AuthenticationError('User not found.');
            }
            const correctPw = await user.isCorrectPassword(oldPassword);
            if (!correctPw) {
              throw new AuthenticationError('Incorrect old password.');
            }
            if (newPassword !== confirmPassword) {
              throw new AuthenticationError('New password and confirmation do not match.');
            }
            user.password = newPassword;
            await user.save();
            const token = signToken(user);
            return { token, user };
          },
    
    createReview: async (parent, { content }, context) => {
        if (context.user) {
            const review = await Review.create({
                content,
                reviewUser: context.user.username,
            });

            await User.findOneAndUpdate(
                { _id: context.user,_id },
                { $addToSet: { reviews: review._id} }
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