from bs4 import BeautifulSoup
from typing import List
import re
import datetime
import asyncio
import process

class Episode(process.Episode):
  title: str
  earwolf_url: str
  guests: List[str]

  def __init__(self, number=None, best_of=None, title=None, earwolf_url=None, guests=None, live=None) -> None:
    self.number = number
    self.best_of = best_of
    self.title = title
    self.earwolf_url = earwolf_url
    self.guests = guests
    self.live = live

class Earwolf():
  url: str
  live: bool
  episodes: List[Episode]

  best_of_regex = "^<li>Ep #BO(\d{4}.\d)"
  number_regex = "^<li>Ep #(\d+)"
  
  def __init__(self, url, live=False):
    self.url = url
    self.live = live

  async def get_episodes(self):
    print("STARTING EARWOLF")
    raw = process.fetch(self.url)
    soup = BeautifulSoup(raw, "html.parser")
    li = soup.find_all("li")

    self.episodes = [Episode(
      number=self.parse_number(str(l)),
      best_of=self.parse_best_of(str(l)),
      title=l.a.string,
      earwolf_url=f"https://www.earwolf.com{l.a['href']}",
      guests=[i.string for i in l.find_all("span")],
      live=self.live
    ) for l in li]
    print("EARWOLF DONE")

  def parse_number(self, s: str) -> float:
    best_of_parse = re.findall(self.best_of_regex, s)
    
    if len(best_of_parse) > 0:
      return float(f"{best_of_parse[0]}")
    else:
      try:
        return re.findall(self.number_regex, s)[0]
      except:
        # print(f"Could not parse number for {s}")
        return None

  def parse_best_of(self, s: str) -> bool:
    return re.search(self.best_of_regex, s) is not None

  