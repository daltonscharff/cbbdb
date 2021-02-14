from dotenv import load_dotenv
import os
import contentful
import contentful_management

load_dotenv()

cc = contentful.Client(os.getenv("CONTENTFUL_SPACE_ID"), os.getenv(
    "CONTENTFUL_ACCESS_TOKEN"))
cm = contentful_management.Client(os.getenv("CONTENTFUL_PAT"))


def write_guest(name, description=None):
    entry = cm.entries(os.getenv("CONTENTFUL_SPACE_ID"), os.getenv("CONTENTFUL_ENVIRONMENT")).create(None, {
        "content_type_id": "guest",
        "fields": {
            "name": {
                "en-US": name
            },
            "description": {
                "en-US": description
            }
        }
    })
    return entry


def write_episode(title, number=None, releaseDate=None, description="", guest_ids=[], bestOf=False, live=False, earwolfUrl=""):
    guests = [{
        "sys": {
            "type": "Link",
            "linkType": "Entry",
            "id": id
        }
    } for id in guest_ids]

    json_data = {
        "content_type_id": "episode",
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

    entry = cm.entries(os.getenv("CONTENTFUL_SPACE_ID"), os.getenv(
        "CONTENTFUL_ENVIRONMENT")).create(None, json_data)
    return entry


def get_newest_episode():
    entries = cc.entries(
        {"limit": 1, "content_type": "episode", "order": "-fields.releaseDate"})
    if len(entries) == 0:
        return None
    return entries[0]


def get_guest(name):
    entries = cc.entries(
        {"limit": 1, "content_type": "guest", "fields.name": name})
    if len(entries) == 0:
        return None
    return entries[0]


def publish(id):
    entry = cm.entries(os.getenv("CONTENTFUL_SPACE_ID"),
                       os.getenv("CONTENTFUL_ENVIRONMENT")).find(id)
    entry.publish()
