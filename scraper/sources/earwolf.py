from bs4 import BeautifulSoup
import re
import requests
import json
import pandas as pd

best_of_regex = "^<li>Ep #BO(\d{4}(?:.\d)?)"
number_regex = "^<li>Ep #(\d+)"


def parse_number(s: str) -> float:
    best_of_parse = re.findall(best_of_regex, s)

    if len(best_of_parse) > 0:
        return float(f"{best_of_parse[0]}")
    else:
        try:
            return re.findall(number_regex, s)[0]
        except:
            print(f"Could not parse number for {s}")
            return None


def parse_best_of(s: str) -> bool:
    return re.search(best_of_regex, s) is not None


def scrape():
    print("STARTING EARWOLF")

    rawData = requests.get(
        "https://www.earwolf.com/alleps-ajax.php?show=9").text
    soup = BeautifulSoup(rawData, "html.parser")
    li = soup.find_all("li")

    episodes = [{
        "number": parse_number(str(i)),
        "bestOf": parse_best_of(str(i)),
        "title": i.a.string,
        "earwolfUrl": f"https://www.earwolf.com{i.a['href']}",
        "guests": json.dumps([str(span.string) for span in i.find_all("span")]),
        "live": False
    } for i in li]
    
    return pd.DataFrame(data=episodes)
    print("EARWOLF DONE")
