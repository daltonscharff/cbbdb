from dotenv import load_dotenv
import requests
import os
import contentful
import contentful_management

load_dotenv()

cc = contentful.Client(os.getenv("CONTENTFUL_SPACE_ID"), os.getenv(
    "CONTENTFUL_ACCESS_TOKEN"))

cm = contentful_management.Client(os.getenv("CONTENTFUL_PAT"))

management_url = f"https://api.contentful.com/spaces/{os.getenv('CONTENTFUL_SPACE_ID')}/environments/{os.getenv('CONTENTFUL_ENVIRONMENT')}/entries"

delivery_url = f"https://cdn.contentful.com/spaces/{os.getenv('CONTENTFUL_SPACE_ID')}/environments/{os.getenv('CONTENTFUL_ENVIRONMENT')}/entries"


def get_headers(content_type):
    return {
        "Authorization": f"Bearer {os.getenv('CONTENTFUL_PAT')}",
        "Content-Type": "application/vnd.contentful.management.v1+json",
        "X-Contentful-Content-Type": content_type
    }


def write_guest(name, description=None):
    res = requests.post(management_url, headers=get_headers("guest"), json={
        "fields": {
            "name": {
                "en-US": name
            },
            "description": {
                "en-US": description
            }
        }
    })

    if res.status_code >= 300:
        print(f"Could not write guest: {name}")
        print(res.json())

    return res.json()


def write_episode(title, number=None, releaseDate=None, description="", guest_ids=[], bestOf=False, live=False, earwolfUrl=""):
    guests = [{
        "sys": {
            "type": "Link",
            "linkType": "Entry",
            "id": id
        }
    } for id in guest_ids]

    json_data = {
        "fields": {
            "title": {
                "en-US": title
            },
            "number": {
                "en-US": number
            },
            "releaseDate": {
                "en-US": releaseDate
            },
            "description": {
                "en-US": description
            },
            "guests": {
                "en-US": guests
            },
            "bestOf": {
                "en-US": bestOf
            },
            "live": {
                "en-US": live
            },
            "earwolfUrl": {
                "en-US": earwolfUrl
            }
        }
    }

    res = requests.post(management_url, headers=get_headers(
        "episode"), json=json_data)

    if res.status_code >= 300:
        print(f"Could not write episode: {title}")
        print(res.json())

    return res.json()


def get_newest_episode():
    res = requests.get(delivery_url, headers=get_headers("episode"), params={
        "access_token": os.getenv("CONTENTFUL_ACCESS_TOKEN"),
        "content_type": "episode",
        "limit": 1,
        "order": "-fields.releaseDate"
    })
    res = res.json()

    episode = {}
    try:
        episode = res["items"][0]["fields"]
    except:
        print(f"Error getting newest episode")

    return episode


def get_guest(name):
    entries = cc.entries(
        {"limit": 1, "content_type": "guest", "fields.name": name})
    if len(entries) == 0:
        return None
    return entries[0]["sys"]["id"]


def publish(id):
    entry = cm.entries(os.getenv("CONTENTFUL_SPACE_ID"),
                       os.getenv("CONTENTFUL_ENVIRONMENT")).find(id)
    entry.publish()
