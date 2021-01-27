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
  earwolf_url: str

  def __init__(self, release_date=None, number=None, best_of=None, title=None, earwolf_url=None, guests=None, live=None) -> None:
    self.number = number
    self.release_date = release_date
    self.title = title
    self.guests = guests
    self.best_of = best_of
    self.live = live
    self.earwolf_url = earwolf_url

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
    try:
      b_index = b.index(ep)
    except:
      logging.warning(f"Could not join on episode: {vars(ep)}")
      continue

    b_ep = b[b_index]
    episodes.append(Episode(
      number = ep.number,
      release_date = ep.release_date,
      title = b_ep.title,
      guests = ep.guests if not ep.guests or len(ep.guests) >= len(b_ep.guests) else b_ep.guests,
      best_of = ep.best_of,
      live = ep.live,
      earwolf_url = b_ep.earwolf_url,
    ))
  
  return episodes

def generate_sql(episodes: List[Episode]) -> str:
  sql_stmt = "-- EPISODES\n"
  guest_names = set()
  bool_to_string = lambda x: str(x).lower()

  for ep in episodes:
    sql_stmt += f"INSERT INTO episodes (release_date, number, title, best_of, live) VALUES ('{ep.release_date}', {ep.number}, '{ep.title}', {bool_to_string(ep.best_of)}, {bool_to_string(ep.live)});\n"
    for guest in ep.guests:
      guest_names.add(guest)

  sql_stmt += "\n-- GUESTS\n"

  for name in guest_names:
    sql_stmt += f"INSERT INTO guests (name) VALUES ('{name}');\n"
  
  sql_stmt += "\n-- EPISODES GUESTS\n"

  for ep in episodes:
    for guest in ep.guests:
      sql_stmt += f"INSERT INTO episodes_guests_2 (guests_id, episodes_id) VALUES ((SELECT id FROM episodes WHERE number = {ep.number} AND best_of = {bool_to_string(ep.best_of)} AND live = {bool_to_string(ep.live)}), (SELECT id FROM guests WHERE name = '{guest}'));\n"

  return sql_stmt