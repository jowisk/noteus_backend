const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../middleware/authMiddleware');
const knex = require('knex')(require('../knexfile').development);

const register = async (req, res) => {
  console.log('hit register')
    const { username, password } = req.body;
  
    try {
      const existingUser = await knex('users').where({ username }).first();
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);

      const [userId] = await knex('users').returning('user_id').insert({
        username,
        password: hashedPassword,
      });
  
      const token = jwt.sign({ userId, username }, TOKEN_SECRET);
  
      res.status(201).json({
        token,
        userId,
        message: 'User registered successfully',
      });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Retrieve the user from the database
      const user = await knex('users').where({ username }).first();
  
      // Check if the user exists
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Compare the provided password with the stored hashed password
      const isValidPassword = await bcrypt.compare(password, user.password);
  
      // If the password is invalid, respond with an error
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Create a JWT token
      const token = jwt.sign({ userId: user.user_id, username: user.username }, TOKEN_SECRET, { expiresIn: '1h' });
  
      // Respond with the token
      res.json({
        token,
        userId: user.user_id, // Include the userId in the response
        message: 'Login successful',
      });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

module.exports = { register, login };
