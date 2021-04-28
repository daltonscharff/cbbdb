# CBBDb

This database contains data about guests and episodes of the *Comedy Bang! Bang!*  podcast that is scraped from the data sources listed below. Character data must be entered manually. 

This repository contains two separate projects: the client and the scraper. The client is a static Next.js site and the scraper is a Python program. Both are configured to be able to run via Github actions. All scraped data is stored in Contentful.

### Technologies
* Python 3
* JavaScript
* Next.js
* Contentful CMS
* Github Actions

## Installation
1. Create a new project in Contentful
2. Populate the following environment variable files 
     * client/.env.local.example (save as client/.env.local)
     * scraper/.env.example (save as scraper/.env)
3. Install project dependencies
```
cd scraper
pip install -r requirements.txt

cd ../client
npm install
```


## Usage
In order to scrape every past episode, run 
```
python scraper/bulk_episode_scraper.py
```

To scrape only the most recent episode (e.g., if you want to check for new episodes nightly), run
```
python scraper/newest_episode_scraper.py
```

For the client, run
```
npm start
```

To manually update for fix scraping mistakes, edit the data in Contentful.

## Data Sources
- [Earwolf](https://www.earwolf.com/show/comedy-bang-bang/)
- [Unofficial RSS Feed for Stitcher Premium](https://unofficialrss.com/feed/96916)

## License
[GNU General Public License v3.0](https://github.com/daltonscharff/cbbdb/blob/master/LICENSE)
