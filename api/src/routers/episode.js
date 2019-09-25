const express = require('express');
const Character = require('../models/character');
const Episode = require('../models/episode');
const Guest = require('../models/guest');

const router = new express.Router();

router.get('/episodes', (req, res) => {
    res.send('hello from /episodes');
});

module.exports = router;