from dotenv import load_dotenv
load_dotenv()
import process

rss = process.RSS()

print([vars(e) for e in rss.episodes])
