const express = require('express');
const Episode = require('../models/episode');
const { getEarwolfData, getStitcherData } = require('../utils/episodes/populate');

const router = new express.Router();

router.get('/utils/episodes/earwolf', async (req, res) => {
    const episodes = await getEarwolfData();
    res.send(episodes);
});

router.get('/utils/episodes/stitcher', async (req, res) => {
    const episodes = await getStitcherData();
    res.send(episodes);
});

module.exports = router;