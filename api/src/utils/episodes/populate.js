const fetch = require('node-fetch');
const fs = require('fs-extra');
const moment = require('moment');
const parse5 = require('parse5');
const RSSParser = require('rss-parser');

/**
 * Fetches the episode data gathered from official Earwolf episode page
 * 
 * @returns {Object[]} An array of objects containing an episode's title, number,
 * guests, and whether or not the episode is a 'Best Of'
 */
const getEarwolfData = async () => {
    const url = 'https://www.earwolf.com/alleps-ajax.php?show=9';
    const html = await (await fetch(url)).text();
    const liArray = parse5.parseFragment(html).childNodes.find((node) => node.tagName === 'ul').childNodes.filter((node) => node.tagName === 'li');

    const episodes = liArray.map((li) => {
        const pattern = /Ep\s#((?:B?O?)(\d+(?:\.\d)?))/;

        const findTextValue = (element) => {
            const el = element.childNodes.find((node) => node.nodeName === '#text');
            return el ? el.value : undefined;
        };

        let episode = {};
        try {
            episode = {
                number: findTextValue(li).match(pattern)[1],

                title: findTextValue(li.childNodes.find((node) => node.tagName === 'a')),

                guests: li.childNodes.filter((node) => node.tagName === 'span').map((node) => findTextValue(node)).filter((guest) => guest),

                bestOf: !!findTextValue(li).match(/BO\d+/)
            };
        } catch (e) {
            console.error(`ERROR: ${findTextValue(li)}`);
        }

        return episode.number ? episode : undefined;
    });

    return episodes.filter((episode) => episode);
};


/**
 * Fetches the episode data gathered from the Unofficial RSS Feeds for Stitcher 
 * Premium
 * 
 * @returns {Object[]} An array of objects containing an episodes name, number,
 * guests, and whether or not the episode is a 'Best Of'
 */
const getStitcherData = async () => {
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

module.exports = { getEarwolfData, getStitcherData };