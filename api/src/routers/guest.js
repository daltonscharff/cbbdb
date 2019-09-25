const express = require('express');
const Character = require('../models/character');
const Episode = require('../models/episode');
const Guest = require('../models/guest');

const router = new express.Router();

router.get('/guests', (req, res) => {
    res.send('hello from /guests');
});

module.exports = router;