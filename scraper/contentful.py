import requests
import os

url = f"https://api.contentful.com/spaces/{os.getenv('CONTENTFUL_SPACE_ID')}/environments/{os.getenv('CONTENTFUL_ENVIRONMENT')}/entries"


def getHeaders(content_type):
    return {
        "Authorization": f"Bearer {os.getenv('CONTENTFUL_PAT')}",
        "Content-Type": "application/vnd.contentful.management.v1+json",
        "X-Contentful-Content-Type": content_type
    }


def writeGuest(name, description=None):
    res = requests.post(url, headers=getHeaders("guest"), json={
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


def writeEpisode(title, number=None, releaseDate=None, description="", guest_ids=[], bestOf=False, live=False, earwolfUrl=""):
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

    res = requests.post(url, headers=getHeaders("episode"), json=json_data)

    if res.status_code >= 300:
        print(f"Could not write episode: {title}")
        print(res.json())

    return res.json()
