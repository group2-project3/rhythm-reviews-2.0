const withAuth = (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    } else {
      next();
    }
  };
  
  module.exports = withAuth;
