from dotenv import load_dotenv
import os
import csv
import logging
from rss import RSS
from earwolf import Earwolf
import utils

load_dotenv()
logging.basicConfig(format='%(asctime)s - %(message)s',
                    datefmt='%d-%b-%y %H:%M:%S')


premium_rss = RSS(os.getenv("PREMIUM_RSS_FEED"))
earwolf = Earwolf("https://www.earwolf.com/alleps-ajax.php?show=9")

premium_rss.get_episodes()
earwolf.get_episodes()

episodes = utils.join_episodes(premium_rss.episodes, earwolf.episodes)

episodes = [{
    "number": e.number,
    "releaseDate": e.release_date,
    "title": e.title,
    "guests": e.guests,
    "bestOf": e.best_of,
    "live": e.live
} for e in episodes]

with open("episodes.csv", "w", newline="") as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=[
                            "number", "releaseDate", "title", "guests", "bestOf", "live"])
    writer.writeheader()
    writer.writerows(episodes)

guests = []
for e in episodes:
    for g in e["guests"]:
        match = [i for i, val in enumerate(guests) if val["name"] == g]
        if len(match) > 0:
            guests[match[0]]["count"] += 1
        else:
            guests.append({
                "name": g,
                "count": 1
            })

with open("guests.csv", "w", newline="") as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=["name", "count"])
    writer.writeheader()
    writer.writerows(guests)
