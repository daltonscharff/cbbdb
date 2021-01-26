from dotenv import load_dotenv
import os
from rss import RSS

load_dotenv()
premium_rss = RSS(os.getenv("PREMIUM_RSS_FEED"))

print([vars(e) for e in premium_rss.episodes])
