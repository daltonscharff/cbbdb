const express = require('express');
const populate = require('../utils/populate');
const earwolf = require('../utils/earwolf');
const stitcher = require('../utils/stitcher');

const router = new express.Router();

router.get('/utils/populate', async (req, res) => {
    try {
        const earwolfData = await earwolf.getData();
        const stitcherData = await stitcher.getData();

        res.send(await populate(earwolfData, stitcherData));
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

router.get('/utils/earwolf', async (req, res) => {
    try {
        res.send(await earwolf.getData());
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

router.get('/utils/stitcher', async (req, res) => {
    try {
        res.send(await stitcher.getData());
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});


module.exports = router;