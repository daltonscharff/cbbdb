const express = require('express');
const populate = require('../utils/populate');
const earwolf = require('../utils/earwolf');
const stitcher = require('../utils/stitcher');

const router = new express.Router();

router.get('/utils/populate', async (req, res) => {
    try {
        // const earwolfData = await earwolf.getData();
        // const stitcherData = await stitcher.getData();

        const earwolfData = [
            {
                "number": "620",
                "title": "Burbank is The Good Place",
                "guests": [
                    "D'Arcy Carden",
                    "Anthony King",
                    "John Gemberling"
                ],
                "bestOf": false
            },
            {
                "number": "619",
                "title": "The Stars of Between Two Ferns: The Movie",
                "guests": [
                    "Zach Galifianakis",
                    "Lauren Lapkus",
                    "Ryan Gaul",
                    "Jiavani Linayao"
                ],
                "bestOf": false
            }
        ];
    
        const stitcherData = [
            {
                "number": "620",
                "title": "620. D'Arcy Carden, Anthony King, John Gemberling",
                "description": "D’Arcy Carden of The Good Place joins Scott to talk about the fourth and final season of The Good Place, You’ve Got Mail, and the Janet costume. Then, the mayor of Burbank Phil Wiggins stops by to spread the word of all things Burbank. Plus, wiping expert Robert Whistler drops by to discuss various wiping techniques.This episode is brought to you by Squarespace ( www.squarespace.com/bangbang ), Thomas’ English Muffins, State Farm ( www.neighborhoodofgood.com ) and Hotel Tonight ( www.hoteltonight.com ).",
                "releaseDate": "2019-09-23T00:00:00.000Z",
                "duration": "PT1H43M3S"
            },
            {
                "number": "619",
                "title": "619. Zach Galifianakis, Lauren Lapkus, Ryan Gaul, Jiavani Linayao",
                "description": "Zach Galifianakis, Lauren Lapkus, Ryan Gaul, Jiavani Linayao of Between Two Ferns: The Movie join Scott to talk about the numbers on the call sheet, improvised scenes that didn’t make the final cut, and the most fun/worst day working on the movie. Then, musician Clint Screams stops by to talk about some of his hits. Later, small business man Ichabod Gordy Bradbury drops by to spread the word of the lighthouse. Plus, educator The Artful Dodger stops by to talk about the origin of his name.This episode is brought to you by Roman ( www.getroman.com/bangbang ), Thomas’ English Muffins, The Jeselnik And Rosenthal Vanity Project Podcast, Stamps.com ( www.stamps.com  code: BANGBANG), and Hotel Tonight ( www.hoteltonight.com ).",
                "releaseDate": "2019-09-16T00:00:00.000Z",
                "duration": "PT1H24M41S"
            }
        ];

        res.send(await populate(earwolfData, stitcherData));
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/utils/earwolf', async (req, res) => {
    try {
        res.send(await earwolf.getData());
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/utils/stitcher', async (req, res) => {
    try {
        res.send(await stitcher.getData());
    } catch (e) {
        res.status(500).send(e);
    }
});


module.exports = router;