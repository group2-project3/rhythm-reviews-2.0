const db = require('../config/connection');
const { Review } = require('../models/Review');
const { User } = require('../models');
const cleanDB = require('./cleanDB');
const userData = require('./userData.json');
const reviewData = require('./reviewData.json');

const seedDatabase = async () => {
  try {
    await cleanDB('User', 'users');
    const users = await User.insertMany(userData);
    console.log('Users seeded!');

    await cleanDB('Review', 'reviews');
    const userObjectIds = users.map((user) => user._id.toString());
    const reviewsWithUserIds = reviewData.map((review, index) => ({
      ...review,
      user_id: userObjectIds[index % userObjectIds.length], 
    }));

    await Review.insertMany(reviewsWithUserIds);
    console.log('Reviews seeded!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
   
    
    db.close();
  }
};

seedDatabase();
