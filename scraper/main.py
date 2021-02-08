from dotenv import load_dotenv
import logging
import pandas as pd
from sources import earwolf, rss

load_dotenv()
logging.basicConfig(format='%(asctime)s - %(message)s',
                    datefmt='%d-%b-%y %H:%M:%S')


# earwolf.scrape().to_csv("data/earwolf_episodes.csv", index=False)
# rss.scrape().to_csv("data/rss_episodes.csv", index=False)

earwolf_eps = pd.read_csv("data/earwolf_episodes.csv")
rss_eps = pd.read_csv("data/rss_episodes.csv")

episodes = pd.merge(earwolf_eps, rss_eps, on=[
                    "number", "bestOf", "live"], how="inner")
episodes.to_csv("data/merged_episodes.csv")
