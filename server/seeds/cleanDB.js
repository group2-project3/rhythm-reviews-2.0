const mongoose = require('mongoose');

module.exports = async (modelName, collectionName) => {
  try {
    if (mongoose.connection.models[modelName]) {
      await mongoose.connection.models[modelName].collection.drop();
    } else {
      const collections = await mongoose.connection.db.listCollections().toArray();
      const collectionExists = collections.some((collection) => collection.name === collectionName);

      if (collectionExists) {
        await mongoose.connection.db.dropCollection(collectionName);
      }
    }
  } catch (err) {
    throw err;
  }
};