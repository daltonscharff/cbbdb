const fetch = require('node-fetch');
const parse5 = require('parse5');

/**
 * Fetches the episode data gathered from official Earwolf episode page
 * 
 * @returns {[Object]} An array of objects containing an episode's title, number,
 * guests, and whether or not the episode is a 'Best Of'
 */
const getData = async () => {
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

module.exports = { getData };