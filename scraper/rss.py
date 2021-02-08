from bs4 import BeautifulSoup
from typing import List
import re
import datetime
import logging
import utils


class RSS:
    feed: str
    live: bool
    episodes: List[utils.Episode]

    best_of_regex = "Best of (\d{4}) Pa?r?t.?\s?(\d)"
    number_regex = "^(\d+)"
    guests_regex = "^\d+.\s?(?:.+w\/)?(.+)"

    def __init__(self, feed, live=False):
        self.feed = feed
        self.live = live

    def get_episodes(self):
        logging.debug("STARTING RSS")
        raw = utils.fetch(self.feed)
        soup = BeautifulSoup(raw, "xml")
        items = soup.find_all("item")

        self.episodes = [utils.Episode(
            release_date=self.parse_release_date(i.pubDate.string),
            number=self.parse_number(i.title.string),
            guests=self.parse_guests(i.title.string),
            best_of=self.parse_best_of(i.title.string),
            live=self.live
        ) for i in items]

        logging.debug("RSS DONE")

    def parse_release_date(self, s: str) -> str:
        dt = datetime.datetime.strptime(s, "%a, %d %b %Y %H:%M:%S %Z")
        actual_date = dt + datetime.timedelta(days=1)
        return str(actual_date.date())

    def parse_number(self, s: str) -> float:
        best_of_parse = re.findall(self.best_of_regex, s)

        if len(best_of_parse) > 0:
            return float(f"{best_of_parse[0][0]}.{best_of_parse[0][1]}")
        else:
            try:
                return re.findall(self.number_regex, s)[0]
            except:
                logging.warning(f"Could not parse number for {s}")
                return None

    def parse_guests(self, s: str) -> List[str]:
        guests_parse = re.findall(self.guests_regex, s)

        if len(guests_parse) > 0:
            return [g.strip() for g in guests_parse[0].split(',')]
        else:
            return []

    def parse_best_of(self, s: str) -> bool:
        return re.search(self.best_of_regex, s) is not None
