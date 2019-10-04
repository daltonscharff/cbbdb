const fetch = require('node-fetch');
const moment = require('moment');
const RSSParser = require('rss-parser');

/**
 * Fetches the episode data gathered from the Unofficial RSS Feeds for Stitcher 
 * Premium
 * 
 * @returns {[Object]} An array of objects containing an episodes name, number,
 * description, release date, and duration
 */
const getData = async () => {
    const url = process.env.RSS_URL;
    const xml = await (await fetch(url)).text();
    const parser = new RSSParser;
    let items = (await parser.parseString(xml)).items;

    const numberPattern1 = /^(\d{1,3})(?:\.|.*,)/;
    const numberPattern2 = /^(?:best\sof)\s(\d{4})\s(?:pt.?\s(\d+))?/i;

    let episodes = [];
    let errors = [];

    // initial pass
    for (let item of items) {
        let episode = {};

        try {
            if (item.title.match(numberPattern1)) {
                episode.number = item.title.match(numberPattern1)[1];
            } else if (item.title.match(numberPattern2)) {
                const groups = item.title.match(numberPattern2);
                episode.number = `BO${groups[1]}`;
                if (groups.length > 2) episode.number += `.${groups[2]}`;
            }
            episode.title = item.title;
            episode.description = item.content;
            episode.releaseDate = moment.utc(item.isoDate).startOf('day').toISOString();
            episode.duration = moment.duration(item.itunes.duration).toISOString();
        } catch (e) {
            errors.push(item);
            continue;
        }

        episodes.push(episode);
    }

    // fill in missing episode numbers if possible
    let fixes = [];
    for (let i in episodes) {
        if (episodes[i].number) continue;
        if (i - 1 > 0 && !episodes[i - 1].number) continue;


        let countFromI = 0;
        let differenceBetweenNumberedEpisodes = 0;
        for (j = i; j < episodes.length; j++) {
            if (episodes[j].number) {
                if (episodes[j].number.match(/bo.*/i)) {
                    continue;
                } else {
                    differenceBetweenNumberedEpisodes = episodes[i - 1].number - episodes[j].number;
                    break;
                }
            }
            countFromI++;
        }

        if (countFromI + 1 === differenceBetweenNumberedEpisodes) {
            episodes[i].number = episodes[i - 1].number - 1;
            fixes.push(episodes[i]);
        }


        if (!episodes[i].number) errors.push(episodes[i]);
    }
    console.log(fixes);

    return { episodes, errors };
};

module.exports = { getData };