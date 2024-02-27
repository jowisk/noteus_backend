const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.TOKEN_SECRET

const authenticateToken = (req, res, next) => {
  console.log('token')
  console.log('Headers:', req.headers);
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden: Invalid token' });
    }
    req.user = user;
    next();
  });
};

module.exports = { 
  authenticateToken,
  TOKEN_SECRET};