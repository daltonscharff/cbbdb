const express = require('express');
const Character = require('../models/character');
const Episode = require('../models/episode');
const Guest = require('../models/guest');

const router = new express.Router();

router.route('/guests')
    .get(async (req, res) => {
        try {
            const guests = await Guest.find({});
            res.send(guests);
        } catch (e) {
            res.status(500).send();
            console.error({ error: e, method: req.method, url: req.url });
        }
    })
    .post(async (req, res) => {
        const guest = new Guest(req.body);

        try {
            await guest.save();
            res.status(201).send(guest);
        } catch (e) {
            res.status(400).send(e);
            console.error({ error: e, method: req.method, url: req.url });
        }
    });

router.route('/guests/:id')
    .get(async (req, res) => {
        try {
            const guest = await Guest.findOne({ _id: req.params.id });

            if (!guest) return res.status(404).send();

            res.send(guest);
        } catch (e) {
            res.status(500).send();
            console.error({ error: e, method: req.method, url: req.url });
        }
    })
    .patch(async (req, res) => {
        const updates = Object.keys(req.body);

        try {
            const guest = await Guest.findOne({ _id: req.params.id });

            if (!guest) return res.status(404).send();

            updates.forEach((update) => guest[update] = req.body[update]);

            await guest.save();
            res.send(guest);
        } catch (e) {
            res.status(500).send();
            console.error({ error: e, method: req.method, url: req.url });
        }
    })
    .delete(async (req, res) => {
        try {
            const guest = await Guest.findById(req.params.id);
    
            if (!guest) return res.status(404).send();
    
            res.send(await guest.remove());
        } catch (e) {
            res.status(500).send();
            console.error({ error: e, method: req.method, url: req.url });
        }
    });

module.exports = router;