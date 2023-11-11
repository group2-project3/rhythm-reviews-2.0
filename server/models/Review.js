const { Schema, model } = require('mongoose');
// const { default: Review } = require('../../client/src/pages/Review');

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
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    idAlbum: {
        type: Number,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    }
    });


    const Review = model('Review', reviewSchema);

    module.exports = {Review, reviewSchema};