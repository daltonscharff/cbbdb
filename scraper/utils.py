import requests
import logging
from typing import List


class Episode:
    number: float
    release_date: str
    title: str
    guests: List[str]
    best_of: bool
    live: bool
    earwolfUrl: str

    def __init__(self, release_date=None, number=None, best_of=None, title=None, earwolf_url=None, guests=[], live=None) -> None:
        self.number = number
        self.release_date = release_date
        self.title = title
        self.guests = guests
        self.best_of = best_of
        self.live = live
        self.earwolfUrl = earwolf_url

    def __eq__(self, other):
        return self.number == other.number and self.best_of == other.best_of and self.live == other.live


def fetch(url, is_json=False):
    res = requests.get(url)

    if res:
        if is_json:
            return res.json()
        else:
            return res.text
    else:
        print(f"Error: could not fetch from {url}")
        exit()


def join_episodes(a, b) -> List[Episode]:
    episodes = []

    for ep in a:
        if not ep.number:
            logging.info(f"Episode has no number: {vars(ep)}")
            continue

        try:
            b_index = b.index(ep)
        except:
            logging.warning(f"Could not join on episode: {vars(ep)}")
            continue

        b_ep = b[b_index]
        if not b_ep.title:
            logging.info(f"Episode has no title: {vars(ep)}")
            continue

        episodes.append(Episode(
            number=ep.number,
            release_date=ep.release_date,
            title=b_ep.title,
            guests=ep.guests if len(ep.guests) >= len(b_ep.guests) else [],
            best_of=ep.best_of,
            live=ep.live,
            earwolf_url=b_ep.earwolfUrl,
        ))

    return episodes


def generate_sql(episodes: List[Episode]) -> str:
    sql_stmt = "-- EPISODES\n"
    guest_names = set()
    def bool_to_string(x): return str(x).lower()
    def escape_string(x): return x.replace('\'', '\'\'')

    for ep in episodes:
        sql_stmt += f"INSERT INTO episodes (release_date, number, title, best_of, live) VALUES ('{ep.release_date}', {ep.number or -1}, '{escape_string(ep.title)}', {bool_to_string(ep.best_of)}, {bool_to_string(ep.live)});\n"
        for guest in ep.guests:
            guest_names.add(guest)

    sql_stmt += "\n-- GUESTS\n"

    for name in guest_names:
        sql_stmt += f"INSERT INTO guests (name) VALUES ('{escape_string(name)}');\n"

    sql_stmt += "\n-- EPISODES GUESTS\n"

    for ep in episodes:
        for guest in ep.guests:
            sql_stmt += f"INSERT INTO episodes_guests_2 (guests_id, episodes_id) VALUES ((SELECT id FROM episodes WHERE number = {ep.number} AND best_of = {bool_to_string(ep.best_of)} AND live = {bool_to_string(ep.live)}), (SELECT id FROM guests WHERE name = '{escape_string(guest)}'));\n"

    return sql_stmt
