const db = require('../config/connection');
const { User, Review } = require('../models');
const cleanDB = require('./cleanDB');

const userData = require('./userData.json');

db.once('open', async () => {
  await cleanDB('User', 'users');
  await User.insertMany(userData);
  console.log('Users seeded!');
  await cleanDB('Review', 'reviews');
  await Review.insertMany(reviewData);
  console.log('Reviews seeded!');
  process.exit(0);
});
