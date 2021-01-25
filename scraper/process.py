import requests
import os
from bs4 import BeautifulSoup
from typing import List
import re
from models import Character, Episode, Guest


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

class RSS:
  episodes: List[Episode]
  best_of_regex = "Best of (\d{4}) Pa?r?t.? (\d)"
  number_regex = "^(\d+)"
  guests_regex = "^\d+.\s?(?:.+w\/)?(.+)"
  
  def __init__(self) -> None:
    raw = fetch(os.getenv("RSS_FEED"))
    soup = BeautifulSoup(raw, "xml")
    items = soup.find_all("item")
    
    self.episodes = [Episode(
      release_date=self.parse_release_date(i.pubDate.string),
      number=self.parse_number(i.title.string),
      guests=self.parse_guests(i.title.string),
      best_of=self.parse_best_of(i.title.string),
      live=False
      ) for i in items[0:8]]
    
  def parse_release_date(self, s: str) -> str:
    return None
  
  def parse_number(self, s: str) -> float:
    best_of_parse = re.findall(self.best_of_regex, s)
    
    if len(best_of_parse) > 0:
      return float(f"{best_of_parse[0][0]}.{best_of_parse[0][1]}")
    else:
      return re.findall(self.number_regex, s)[0]
  
  def parse_guests(self, s: str) -> List[str]:
    guests_parse = re.findall(self.guests_regex, s)
    
    # print(guests_parse)
    
    if len(guests_parse) > 0:
      return [g.strip() for g in guests_parse[0].split(',')]
    else:
      return None
  
  def parse_best_of(self, s: str) -> bool:
    return re.search(self.best_of_regex, s) is not None


class Earwolf():
  raw = fetch("https://www.earwolf.com/alleps-ajax.php?show=9")
  soup = BeautifulSoup(raw, "html.parser")