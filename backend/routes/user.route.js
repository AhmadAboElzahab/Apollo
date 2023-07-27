const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const hi = 'Hello, world!';
    res.json({ hi });
});

module.exports = router;
