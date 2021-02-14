# %%
from dotenv import load_dotenv
import pandas as pd
import json
import importlib
from sources import earwolf, rss
import contentful

load_dotenv()


# %%
# Scrape data from sources and write to file

earwolf_eps = earwolf.scrape()
earwolf_eps.to_csv("data/episodes/episodes_earwolf.csv", index=False)

rss_eps = rss.scrape()
rss_eps.to_csv("data/episodes/episodes_rss.csv", index=False)


# %%
# Read separate episode sources and merge

earwolf_eps = pd.read_csv("data/episodes/episodes_earwolf.csv")
rss_eps = pd.read_csv("data/episodes/episodes_rss.csv")

episodes = pd.merge(earwolf_eps, rss_eps, on=[
                    "number", "bestOf", "live"], how="inner")

episodes.rename(columns={"guests_x": "guests"}, inplace=True)
del episodes['guests_y']

episodes.to_csv("data/episodes/episodes_merged.csv", index=False)

# %% [markdown]
# ### Remove duplicates and fix misspellings

# %%
# Count number of appearances per guest

episodes = pd.read_csv("data/episodes/episodes_merged_final.csv")

all_guests = []
for guest_list in episodes["guests"]:
    for guest in json.loads(guest_list):
        all_guests.append(guest)

guest_appearances = pd.Series(
    name="numberOfAppearances", data=all_guests).value_counts()
guest_appearances.to_csv("data/guests/guests.csv")


# %%
importlib.reload(contentful)

# Write all guests to contentful and track IDs

guests = pd.read_csv("data/guests/guests.csv", index_col=0)

for i, row in guests.iterrows():
    print(f"Writing: {i}")
    res = contentful.write_guest(i)
    guests.at[i, "contentfulId"] = res["sys"]["id"]

guests.to_csv("data/guests/guests_ids.csv")


# %%
importlib.reload(contentful)

# Write all episodes to contentful

guests = pd.read_csv("data/guests/guests_ids.csv", index_col=0)
episodes = pd.read_csv("data/episodes/episodes_merged_final.csv")

for i, row in episodes.iterrows():
    print(f"Writing: {row['number']} {row['title']}")
    guest_ids = [guests.loc[guest_name]["contentfulId"]
                 for guest_name in json.loads(row["guests"])]
    res = contentful.write_episode(title=row["title"], number=row["number"], releaseDate=row["releaseDate"],
                                   guest_ids=guest_ids, bestOf=row["bestOf"], earwolfUrl=row["earwolfUrl"])
    episodes.at[i, "contentfulId"] = res["sys"]["id"]

episodes.to_csv("data/episodes/episodes_ids.csv")


# %%
