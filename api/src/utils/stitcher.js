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
    const episodes = (await parser.parseString(xml)).items;

    const numberPattern = /^(\d{1,3})\.?\s/

    return episodes.map((episode) => ({
        number: episode.title.match(numberPattern) ? episode.title.match(numberPattern)[1] : '',
        title: episode.title,
        description: episode.content,
        releaseDate: moment.utc(episode.isoDate).startOf('day').toISOString(),
        duration: moment.duration(episode.itunes.duration).toISOString()
    }));
};

module.exports = { getData };