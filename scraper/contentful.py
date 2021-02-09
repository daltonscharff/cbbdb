import requests
import os

# from dotenv import load_dotenv
# load_dotenv()

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
    return res.json()


def writeEpisode(title, number=None, releaseDate=None, description=None, guest_ids=[], bestOf=False, live=False):
    guests = [{
        "sys": {
            "type": "Link",
            "linkType": "Entry",
            "id": id
        }
    } for id in guest_ids]
    res = requests.post(url, headers=getHeaders("episode"), json={
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
            }
        }
    })
    return res.json()


# writeEpisode("Test Episode", 123.45, "2021-01-02",
#              "This is a description", ["4ahH7S9IUx6wz0re09BsYY"], False, True)

# writeGuest("Test Guest", "Test guest desc.")
