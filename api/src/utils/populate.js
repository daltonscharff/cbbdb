const Episode = require('../models/episode');
const Guest = require('../models/guest');

const populate = async (earwolfData, stitcherData) => {
    let mergedData = await mergeData(earwolfData, stitcherData);
    ({modifiedEpisodes, modifiedGuests} = await createDbObjects(mergedData));

    modifiedEpisodes.forEach((episode) => episode.save());
    modifiedGuests.forEach((guest) => guest.save());

    return {modifiedGuests, modifiedGuests};
};

const mergeData = async (earwolfData, stitcherData) => {
    return earwolfData.map((earwolfEpisode) => {
        const stitcherEpisode = stitcherData.find((episode) => episode.number === earwolfEpisode.number || episode.title === earwolfEpisode.title);

        delete stitcherEpisode.number
        delete stitcherEpisode.title

        return {
            ...earwolfEpisode,
            ...stitcherEpisode
        };
    });
};

const createDbObjects = async (mergedData) => {
    /**
     * if episode already in database: skip
     * else: make new episode with given attributes, making new guests as well
     */

    let modifiedEpisodes = [];
    let modifiedGuests = [];

    await Promise.all(mergedData.map(async (value) => {
        if (await Episode.findOne({ number: value.number })) return;

        const guests = await Promise.all(value.guests.map(async (guestName) => await Guest.findOne({ name: guestName }) || new Guest({ name: guestName })));

        delete value.guests;

        const episode = new Episode({
            ...value,
            guests: guests.map((guest) => guest._id)
        });

        guests.forEach((guest) => guest.episodes = new Set(guest.episodes.concat(episode._id)))

        modifiedEpisodes.push(episode);
        modifiedGuests = Array.from(new Set(modifiedGuests.concat(guests)));
    }));

    return { modifiedEpisodes,  modifiedGuests };
};

module.exports = populate;