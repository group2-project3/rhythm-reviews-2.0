const { User, Review } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

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
    },

Mutation: {
    addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
    },
        login: async (parent, { email, password }) => {
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
    },
    addReview: async (parent, { content }, context) => {
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
};

module.exports = resolvers;