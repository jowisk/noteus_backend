const express = require('express');
const authQueries = require('../controllers/auth');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', authQueries.register);
router.post('/login', authQueries.login);

router.use(authenticateToken);


module.exports = router;