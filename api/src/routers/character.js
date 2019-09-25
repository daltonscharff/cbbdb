const express = require('express');
const Character = require('../models/character');
const Episode = require('../models/episode');
const Guest = require('../models/guest');

const router = new express.Router();

router.get('/characters', (req, res) => {
    res.send('hello from /characters');
});

module.exports = router;