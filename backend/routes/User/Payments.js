const express = require('express');
const userAuthorization = require('../../middleware/userAuthorization.middleware');
const router = express.Router();


router.get('/', userAuthorization, async (req, res) => {
    const userId = req.userId;

    res.json({ message: userId })
})

module.exports = router;
