const { Schema } = require('mongoose');

const reviewSchema = new Schema({
    title: {
        type: String,
        required: 'You need to leave a title!',
        minLength: 1,
        maxLength: 50,
        trim: true
    },
    content: {
        type: String,
        required: 'You need to leave a review!',
        minLength: 1,
        maxLength: 280,
        trim: true
    },
    user_id: {
        type: String,
        trim: true
    },
    album_id: {
        type: Number,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    }
    });

    module.exports = reviewSchema;