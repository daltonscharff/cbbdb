const mongoose = require('mongoose');
const Guest = require('../../models/guest');

const getGuestIds = ({ guests = [], episodeIds, characterIds }) => {
    guests = guests.map(async (guest) => {
        /**
         * if instanceof objectId: return it
         * if guest in database, add episode id and return guest id,
         * else create guest then add episode id and return guest id
         */




        if (Guest.findById(guest)) return guest;

        const guest = Guest.findOne({ name: guest }) || new Guest({
            name: guest
        });

        if (episodeIds) guest.episodes.push(episodeIds);
        if (characterIds) guest.characters.push(characterIds);

        await guest.save();
        return guest._id;
    });
    return Promise.all(guests);
};

module.exports = { getGuestIds };