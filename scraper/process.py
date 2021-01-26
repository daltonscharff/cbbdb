import requests

class Episode:
  number: float
  best_of: bool
  live: bool

  def __eq__(self, other):
    return self.number == other.number and self.best_of == other.best_of and self.live == other.live


def fetch(url, is_json=False):
  res = requests.get(url)

  if res:
    if is_json:
      return res.json()
    else:
      return res.text
  else:
    print(f"Error: could not fetch from {url}")
    exit()

# def join_episodes(a, b):
#   for a_ep in a:
    