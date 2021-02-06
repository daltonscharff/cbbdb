import { createClient } from "contentful";

class ContentfulClient {
  constructor() {
    this.client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID || '',
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
      environment: process.env.CONTENTFUL_ENVIRONMENT || ''
    })
  }

  async getGuests() {
    const guests = await this.client.getEntries({
      content_type: "guest"
    })

    return guests.items.map(guest => ({
      id: guest.sys.id,
      name: guest.fields.name
    }));
  }

  async getGuest(id) {
    const guest = await this.client.getEntry(id);
    let characters = [];
    let episodes = [];

    try {
      characters = guest.fields.characters.map(character => ({
        id: character.sys.id,
        name: character.fields.name
      }))
    } catch (e) { }

    try {
      episodes = (await this.client.getEntries({
        content_type: "episode",
        "fields.guests.sys.id": id
      })).items.map(episode => ({
        id: episode.sys.id,
        title: episode.fields.title
      }))
    } catch (e) { }

    return {
      id,
      ...guest.fields,
      characters,
      episodes
    }
  }

}

export const cc = new ContentfulClient();