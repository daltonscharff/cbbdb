const express = require('express');
const Character = require('../models/character');
const Episode = require('../models/episode');
const Guest = require('../models/guest');

const router = new express.Router();

router.route('/characters')
    .get(async (req, res) => {
        try {
            const characters = await Character.find({});
            res.send(characters);
        } catch (e) {
            res.status(500).send();
            console.error({ error: e, method: req.method, url: req.url });
        }
    })
    .post(async (req, res) => {
        const character = new Character(req.body);

        try {
            await character.save();
            res.status(201).send(character);
        } catch (e) {
            res.status(400).send();
            console.error({ error: e, method: req.method, url: req.url });
        }
    });

router.route('/characters/:id')
    .get(async (req, res) => {
        try {
            const character = await Character.findOne({ _id: req.params.id });

            if (!character) return res.status(404).send();

            res.send(character);
        } catch (e) {
            res.status(500).send();
            console.error({ error: e, method: req.method, url: req.url });
        }
    })
    .patch(async (req, res) => {
        const updates = Object.keys(req.body);

        try {
            const character = await Character.findOne({ _id: req.params.id });

            if (!character) return res.status(404).send();

            updates.forEach((update) => character[update] = req.body[update]);

            await character.save();
            res.send(character);
        } catch (e) {
            res.status(500).send();
            console.error({ error: e, method: req.method, url: req.url });
        }
    })
    .delete(async (req, res) => {
        try {
            const character = await Character.findOneAndDelete({ _id: req.params.id });
    
            if (!character) return res.status(404).send();
    
            res.send(character);
        } catch (e) {
            res.status(500).send();
            console.error({ error: e, method: req.method, url: req.url });
        }
    });

module.exports = router;