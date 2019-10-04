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

    const numberPattern1 = /^(\d{1,3}(\.\d)?)(?:\.|.*,)/;
    const numberPattern2 = /^best\sof\s(\d{4})(?:\spt.?\s(\d+))?/i;

    let episodes = [];
    let incompletes = [];
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
                if (groups[2]) episode.number += `.${groups[2]}`;
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
    for (let i in episodes) {
        if (episodes[i].number) continue;
        if (i - 1 > 0 && !episodes[i - 1].number) continue;

        const prevIndexWithNumber = ((j) => {
            for (j; j > 0; j--) {
                if (!episodes[j].number) continue;
                if (episodes[j].number.match(/bo.*/i)) continue;
                return j;
            }
        })(i);

        const nextIndexWithNumber = ((j) => {
            for (j; j < episodes.length; j++) {
                if (!episodes[j].number) continue;
                if (episodes[j].number.match(/bo.*/i)) continue;
                return j;
            }
        })(i);

        const stepsBetween = ((prev, next) => {
            let count = 0;
            while (prev < next) {
                if (!episodes[prev].number || (episodes[prev].number && !episodes[prev].number.match(/bo.*/i))) {
                    count++;
                }
                prev++;
            }
            return count;
        })(prevIndexWithNumber, nextIndexWithNumber);

        const diffBetween = Math.floor(episodes[prevIndexWithNumber].number) - Math.floor(episodes[nextIndexWithNumber].number);

        if (stepsBetween === diffBetween) {
            episodes[i].number = (Math.floor(episodes[prevIndexWithNumber].number) - 1).toString(10);
        }

        if (!episodes[i].number) incompletes.push(episodes[i]);
    }

    return { episodes, incompletes, errors };
};

module.exports = { getData };