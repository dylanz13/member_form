const express = require('express');
const router = express.Router();
const fs = require('fs-extra');

router.get('/', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

module.exports = router;