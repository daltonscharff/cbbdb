const express = require('express');
const Episode = require('../models/episode');
const { getEarwolfData, getStitcherData } = require('../utils/episodes/populate');

const router = new express.Router();

router.get('/utils/episodes/earwolf', async (req, res) => {
    let pulledEpisodes = [];
    let updatedEpisodes = [];

    // try {
    //     pulledEpisodes = await getEarwolfData();
    // } catch (e) {
    //     console.error({ action: 'Fetching Earwolf data', error: e });
    //     return res.status(500).send();
    // }

    pulledEpisodes = [
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

    try {
        for (let earwolfEpisode of pulledEpisodes) {
            let databaseEpisode = await Episode.findOne({ number: earwolfEpisode.number }) || await Episode.findOne({ title: earwolfEpisode.title });
            
            delete earwolfEpisode.guests; //temp

            if (databaseEpisode) {
                const updates = Object.keys(earwolfEpisode);
                updates.forEach((update) => databaseEpisode.set(update, earwolfEpisode[update]));
            } else {
                databaseEpisode = new Episode({ ...earwolfEpisode });
            }
            await databaseEpisode.save();
            updatedEpisodes.push(databaseEpisode);
        }
    } catch (e) {
        console.error({ action: 'Writing Earwolf data to database', error: e });
        return res.status(500).send();
    }

    res.send(updatedEpisodes);
});

router.get('/utils/episodes/stitcher', async (req, res) => {
    // const episodes = await getStitcherData();
    const episodes = [
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
    ]

    res.send(episodes);
});

module.exports = router;