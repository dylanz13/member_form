const express = require('express');
const router = express.Router();
const fs = require('fs-extra');

router.get('/', function (req, res, next) {
    const obj = fs.readJsonSync('./public/JSON/default.json');
    return res.send(obj);
});

module.exports = router;