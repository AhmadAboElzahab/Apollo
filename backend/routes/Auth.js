const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userAuthorization=require('../middleware/userAuthorization.middleware')
const cookieParser = require('cookie-parser');
const { login, register, logout, changePassword } = require('../controllers/Auth.controller');

router.post('/login', login);

router.post('/register', register);

router.get('/logout', logout);

router.get('/changePassword',userAuthorization, changePassword);

module.exports = router;
