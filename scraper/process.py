import requests

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
