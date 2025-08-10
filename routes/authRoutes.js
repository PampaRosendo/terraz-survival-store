/* backend/routes/authRoutes.js */
const express = require('express');

const express = require('express');
const { createOrGetSimpleUser, getUserEconomy } = require('../controllers/simpleUserController');
const router = express.Router();

router.post('/simple-user', createOrGetSimpleUser);
router.get('/simple-user/:id/economy', getUserEconomy);

module.exports = router;
