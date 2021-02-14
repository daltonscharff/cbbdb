# %%
import pandas as pd
import json
import datetime
import sys
from sources import earwolf, rss
import contentful_helper as contentful


# %%
rss_eps = rss.scrape()
newest_saved_episode = contentful.get_newest_episode()


# %%
# Compare newest saved episode to newest from RSS

newest_episode_date = pd.to_datetime(rss_eps["releaseDate"]).max().date()
newest_saved_episode_date = newest_saved_episode.fields()[
    "release_date"].date()

if newest_episode_date <= newest_saved_episode_date:
    print("No new episodes")
    sys.exit(0)
else:
    print(f"New episode released on: {newest_episode_date}")

earwolf_eps = earwolf.scrape()


# %%
# Merge sources

episodes = pd.merge(earwolf_eps, rss_eps, on=[
                    "number", "bestOf", "live"], how="inner")
episodes.rename(columns={"guests_x": "guests"}, inplace=True)
del episodes['guests_y']


# %%
# Keep episodes newer than the newest saved episode

new_episodes = []
for i, row in episodes.iterrows():
    if datetime.date.fromisoformat(row["releaseDate"]) > newest_saved_episode_date:
        new_episodes.append(row.to_dict())

# %%
# For each guest, save only if they are new, and get id

for episode in new_episodes:
    guest_ids = []
    for guest in json.loads(episode["guests"]):
        g = contentful.get_guest(guest)
        if g == None:
            g = contentful.write_guest(guest)
            contentful.publish(g.id)
        guest_ids.append(g.id)
    episode["guest_ids"] = guest_ids
print(f"New episodes: {new_episodes}")


# %%
# Write new episodes

for episode in new_episodes:
    id = contentful.write_episode(title=episode["title"], number=episode["number"], releaseDate=episode["releaseDate"],guest_ids=episode["guest_ids"], bestOf=episode["bestOf"], earwolfUrl=episode["earwolfUrl"]).id
    contentful.publish(id)
