from bs4 import BeautifulSoup
from typing import List
import re
import datetime
import os
import requests
import json
import pandas as pd

best_of_regex = "Best of (\d{4})(?:\sPa?r?t.?\s?(\d))?"
number_regex = "^(\d+)"
guests_regex = "^\d+.\s?(?:.+w\/)?(.+)"


def parse_release_date(s: str) -> str:
    dt = datetime.datetime.strptime(s, "%a, %d %b %Y %H:%M:%S %Z")
    actual_date = dt + datetime.timedelta(days=1)
    return str(actual_date.date())


def parse_number(s: str) -> float:
    best_of_parse = re.findall(best_of_regex, s)

    if len(best_of_parse) > 0:
        if len(best_of_parse[0]) == 1:
            return float(f"{best_of_parse[0][0]}")
        else:
            return float(f"{best_of_parse[0][0]}.{best_of_parse[0][1]}")
    else:
        try:
            return re.findall(number_regex, s)[0]
        except:
            print(f"Could not parse number for {s}")
            return None


def parse_guests(s: str) -> List[str]:
    guests_parse = re.findall(guests_regex, s)

    if len(guests_parse) > 0:
        return json.dumps([g.strip() for g in guests_parse[0].split(',')])
    else:
        return []


def parse_best_of(s: str) -> bool:
    return re.search(best_of_regex, s) is not None


def scrape():
    print("STARTING RSS")
    rawData = requests.get(os.getenv("PREMIUM_RSS_FEED")).text

    soup = BeautifulSoup(rawData, "xml")
    items = soup.find_all("item")

    episodes = [{
        "releaseDate": parse_release_date(i.pubDate.string),
        "number": parse_number(i.title.string),
        "guests": parse_guests(i.title.string),
        "bestOf": parse_best_of(i.title.string),
        "live": False
    } for i in items]

    print("RSS DONE")
    return pd.DataFrame(data=episodes)
