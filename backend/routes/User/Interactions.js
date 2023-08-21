const express = require('express');
const userAuthorization = require('../../middleware/userAuthorization.middleware');
const router = express.Router();
const { likePost, unlikePost } = require('../../controllers/User.controller');

router.use(userAuthorization);

router.put('/like', likePost);
router.put('/unlike', unlikePost);

module.exports = router;
