from dotenv import load_dotenv
import os
import asyncio
from rss import RSS
from earwolf import Earwolf
import process

load_dotenv()

async def main():
  premium_rss = RSS(os.getenv("PREMIUM_RSS_FEED"))
  earwolf = Earwolf("https://www.earwolf.com/alleps-ajax.php?show=9")

  await asyncio.gather(
    asyncio.create_task(premium_rss.get_episodes()),
    asyncio.create_task(earwolf.get_episodes())
  )

  # print([vars(e) for e in premium_rss.episodes[:2]])
  # print([vars(e) for e in earwolf.episodes[:2]])

  episodes = process.join_episodes(premium_rss.episodes, earwolf.episodes)

  for e in episodes[:10]:
    print(vars(e))
    print("\n")

asyncio.run(main())
