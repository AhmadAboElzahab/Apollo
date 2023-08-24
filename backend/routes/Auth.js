const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { login, register, logout } = require('../controllers/Auth.controller');

router.post('/login', login);

router.post('/register', register);

router.get('/logout', logout);

module.exports = router;

