from dotenv import load_dotenv
import os
import asyncio
import logging
from rss import RSS
from earwolf import Earwolf
import process

load_dotenv()
logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S', filename=('scrape.log'))

async def main():
  premium_rss = RSS(os.getenv("PREMIUM_RSS_FEED"))
  earwolf = Earwolf("https://www.earwolf.com/alleps-ajax.php?show=9")

  await asyncio.gather(
    asyncio.create_task(premium_rss.get_episodes()),
    asyncio.create_task(earwolf.get_episodes())
  )

  episodes = process.join_episodes(premium_rss.episodes, earwolf.episodes)

  with open("scrape.sql", "w") as f:
    f.write(process.generate_sql(episodes))

asyncio.run(main())
