const Episode = require('../models/episode');
const Guest = require('../models/guest');

const populate = async (earwolfData, stitcherData) => {
    let episodes = mergeEpisodes(earwolfData.episodes, stitcherData.episodes);

    ({ modifiedEpisodes, modifiedGuests } = await saveToDatabase(episodes.merged));

    return { 
        modifiedEpisodes,
        modifiedGuests, 
        unmergedEpisodes: episodes.unmerged };
};

/**
 * Combine data retrieved from Earwolf and Stitcher, returning merged and
 * unmerged episodes
 * 
 * @param {Object[]} earwolfEpisodes 
 * @param {Object[]} stitcherEpisodes 
 */
const mergeEpisodes = (earwolfEpisodes, stitcherEpisodes) => {
    process.stdout.write(`Merging episodes...`);

    let merged = [];

    for (let i = 0; i < earwolfEpisodes.length; i) {
        const j = stitcherEpisodes.findIndex((episode) => episode.number === earwolfEpisodes[i].number || episode.title === earwolfEpisodes[i].title);

        if (j < 0) {
            i++;
            continue;
        }

        earwolfEpisode = earwolfEpisodes.splice(i, 1)[0];
        stitcherEpisode = stitcherEpisodes.splice(j, 1)[0];

        delete stitcherEpisode.number;
        delete stitcherEpisode.title;

        merged.push({
            ...earwolfEpisode,
            ...stitcherEpisode
        });
    }

    process.stdout.write(`OK { merged: ${merged.length}, unmerged: ${earwolfEpisodes.length + stitcherEpisodes.length} }\n`);
    return {
        merged,
        unmerged: {
            earwolf: earwolfEpisodes,
            stitcher: stitcherEpisodes
        }
    };
};

/**
 * If an episode does not yet exist in database, 
 * then add the episode (and corresponding guests)
 * 
 * @param {Object[]} mergedEpisodes 
 */
const saveToDatabase = async (mergedEpisodes) => {
    process.stdout.write(`Writing episodes to database...`);

    let modifiedEpisodes = new Set([]);
    let modifiedGuests = new Set([]);

    for (let mergedEpisode of mergedEpisodes) {
        if (await Episode.findOne({ number: mergedEpisode.number })) continue;

        const episode = new Episode({
            ...mergedEpisode
        });

        episode.guests = await Promise.all(mergedEpisode.guests.map(async (guestName) => {
            let guest = await Guest.findOne({ name: guestName }) || new Guest({ name: guestName });
            guest.episodes.addToSet(episode._id);
            modifiedGuests.add(guest.id);
            guest.save();
            return guest._id;
        }));

        modifiedEpisodes.add(episode.id);
        episode.save();
    }

    process.stdout.write(`OK { modifiedEpisodes: ${modifiedEpisodes.size}, modifiedGuests: ${modifiedGuests.size} }\n`);
    return { modifiedEpisodes: Array.from(modifiedEpisodes), modifiedGuests: Array.from(modifiedGuests) };
};

module.exports = populate;