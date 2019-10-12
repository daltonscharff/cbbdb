const fetch = require('node-fetch');
const parse5 = require('parse5');

/**
 * Fetches the episode data gathered from official Earwolf episode page
 * 
 * @returns {Object[]} An array of objects containing an episode's title, number,
 * guests, and whether or not the episode is a 'Best Of'
 */
const getData = async () => {
    process.stdout.write('Fetching Earwolf data...');

    const url = 'https://www.earwolf.com/alleps-ajax.php?show=9';
    const html = await (await fetch(url)).text();
    const liArray = parse5.parseFragment(html).childNodes.find((node) => node.tagName === 'ul').childNodes.filter((node) => node.tagName === 'li');

    let episodes = [];
    let errors = [];

    for (let li of liArray) {
        const pattern = /Ep\s#((?:B?O?)(\d+(?:\.\d)?))/;

        const findTextValue = (element) => {
            const el = element.childNodes.find((node) => node.nodeName === '#text');
            return el ? el.value : undefined;
        };

        let episode = {};

        try {
            episode.number = findTextValue(li).match(pattern)[1];
            episode.title = findTextValue(li.childNodes.find((node) => node.tagName === 'a'));
            episode.guests = li.childNodes.filter((node) => node.tagName === 'span').map((node) => findTextValue(node)).filter((guest) => guest);
            episode.bestOf = !!findTextValue(li).match(/BO\d+/);
        } catch (e) {
            errors.push(parse5.serialize(li));
            continue;
        }

        episodes.push(episode);
    }

    process.stdout.write(`OK { episodes: ${episodes.length}, errors: ${errors.length} }\n`);
    return { episodes, errors };
};

module.exports = { getData };