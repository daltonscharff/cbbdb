const express = require('express');
const Character = require('../models/character');
const Episode = require('../models/episode');
const Guest = require('../models/guest');

const router = new express.Router();

router.route('/episodes')
    .get(async (req, res) => {
        try {
            const episode = await Episode.find({});
            res.send(episode);
        } catch (e) {
            res.status(500).send(e);
            console.error({ error: e, method: req.method, url: req.url });
        }
    })
    .post(async (req, res) => {
        const episode = new Episode(req.body);

        try {
            await episode.save();
            res.status(201).send(episode);
        } catch (e) {
            res.status(400).send(e);
            console.error({ error: e, method: req.method, url: req.url });
        }
    });

router.route('/episodes/:id')
    .get(async (req, res) => {
        try {
            const episode = await Episode.findOne({ _id: req.params.id });

            if (!episode) return res.status(404).send();

            res.send(episode);
        } catch (e) {
            res.status(500).send(e);
            console.error({ error: e, method: req.method, url: req.url });
        }
    })
    .patch(async (req, res) => {
        const updates = Object.keys(req.body);

        try {
            const episode = await Episode.findOne({ _id: req.params.id });

            if (!episode) return res.status(404).send();

            updates.forEach((update) => episode.set(update, req.body[update]));

            episode.set('thisisatest', true);
            console.log(episode);

            await episode.save();
            res.send(episode);
        } catch (e) {
            res.status(500).send(e);
            console.error({ error: e, method: req.method, url: req.url });
        }
    })
    .delete(async (req, res) => {
        try {
            const episode = await Episode.findOneAndDelete({ _id: req.params.id });
    
            if (!episode) return res.status(404).send();
    
            res.send(episode);
        } catch (e) {
            res.status(500).send(e);
            console.error({ error: e, method: req.method, url: req.url });
        }
    });

module.exports = router;