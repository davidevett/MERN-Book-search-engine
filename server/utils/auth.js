const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for GraphQL authenticated routes
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.query or headers
    let token = req.query.token || req.headers.authorization;

    // Check if the token is passed in the "Bearer" format
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      throw new GraphQLError('You have no token!', {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      });
    }

    // Verify token and attach user data to request
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data; // Attach user data to the request object
    } catch (error) {
      console.log('Invalid token:', error);
      throw new GraphQLError('Invalid or expired token!', {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      });
    }

    // Return the modified request (including user data)
    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
