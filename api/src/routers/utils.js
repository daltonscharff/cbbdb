const express = require('express');
const populate = require('../utils/populate');
const earwolf = require('../utils/earwolf');
const stitcher = require('../utils/stitcher');

const router = new express.Router();

router.get('/utils/populate', async (req, res) => {
    try {
        process.stdout.write('Fetching Earwolf data...');
        const earwolfData = await earwolf.getData();
        process.stdout.write('OK\n');
        process.stdout.write('Fetching Stitcher data...');
        const stitcherData = await stitcher.getData();
        process.stdout.write('OK\n');

        // const earwolfData = {
        //     "episodes": [
        //         {
        //             "number": "621",
        //             "title": "Untitled Wachs Project",
        //             "guests": [
        //                 "Test Testerson",
        //                 "Stephanie Wittels Wachs",
        //                 "Dan Lippert",
        //                 "Drew Tarver",
        //                 "Ryan Rosenberg"
        //             ],
        //             "bestOf": false
        //         },
        //         {
        //             "number": "620",
        //             "title": "Burbank is The Good Place",
        //             "guests": [
        //                 "Test Testerson",
        //                 "D'Arcy Carden",
        //                 "Anthony King",
        //                 "John Gemberling"
        //             ],
        //             "bestOf": false
        //         }
        //     ]
        // };
        // const stitcherData = {
        //     "episodes": [
        //         {
        //             "number": "621",
        //             "title": "621. Stephanie Wittels Wachs, Dan Lippert, Drew Tarver, Ryan Rosenberg",
        //             "description": "Author (and Harris Wittels’ sister) Stephanie Wittels Wachs joins Scott to talk about her new podcast Last Day, launching the podcast network Lemonada, and naming her new born baby. After taking some calls, aspiring athletes Shemp A. and Corey A. stop by to promote that they are trying to play basketball. Later, Tater drops by to talk about beach life after retirement.This episode is brought to you by State Farm ( www.neighborhoodofgood.com ), Capterra ( www.capterra.com/BANGBANG ), Thomas’ English Muffins, and Atoms Shoes ( www.atoms.com/BANGBANG ).",
        //             "releaseDate": "2019-09-30T00:00:00.000Z",
        //             "duration": "PT1H31M54S"
        //         },
        //         {
        //             "number": "620",
        //             "title": "620. D'Arcy Carden, Anthony King, John Gemberling",
        //             "description": "D’Arcy Carden of The Good Place joins Scott to talk about the fourth and final season of The Good Place, You’ve Got Mail, and the Janet costume. Then, the mayor of Burbank Phil Wiggins stops by to spread the word of all things Burbank. Plus, wiping expert Robert Whistler drops by to discuss various wiping techniques.This episode is brought to you by Squarespace ( www.squarespace.com/bangbang ), Thomas’ English Muffins, State Farm ( www.neighborhoodofgood.com ) and Hotel Tonight ( www.hoteltonight.com ).",
        //             "releaseDate": "2019-09-23T00:00:00.000Z",
        //             "duration": "PT1H43M3S"
        //         }
        //     ]
        // };

        process.stdout.write('Writing database...');
        res.send(await populate(earwolfData, stitcherData));
        process.stdout.write('OK\n');
    } catch (e) {
        res.status(500).send();
        console.error({ error: e, method: req.method, url: req.url });
    }
});

router.get('/utils/earwolf', async (req, res) => {
    try {
        res.send(await earwolf.getData());
    } catch (e) {
        res.status(500).send();
        console.error({ error: e, method: req.method, url: req.url });
    }
});

router.get('/utils/stitcher', async (req, res) => {
    try {
        res.send(await stitcher.getData());
    } catch (e) {
        res.status(500).send();
        console.error({ error: e, method: req.method, url: req.url });
    }
});


module.exports = router;