//Based on the auth from utils in activity 26 of MERN module

const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const secret = process.env.AUTH_SECRET;
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware: function ({ req, res }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
  
    if (!token) {
      // Set req.user to null or some other value indicating unauthenticated state
      // req.user = null;
      return req;
    }
  
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      console.log(data)
      req.user = data;
      console.log(req.user)
    } catch {
      console.log('Invalid token');
      // Set req.user to null or some other value indicating unauthenticated state
      // req.user = null;
    }
  
    return req;
  },
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};