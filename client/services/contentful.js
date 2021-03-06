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
    const entries = await this.client.getEntries({
      content_type: "guest",
      order: "fields.name",
      limit: 1000
    })

    const guests = [];
    for (let entry of entries.items) {
      guests.push(await this.getGuest(entry.sys.id))
    }
    return guests;
  }

  async getCharacters() {
    const entries = await this.client.getEntries({
      content_type: "character",
      order: "fields.name",
      limit: 1000
    })

    const characters = [];
    for (let entry of entries.items) {
      characters.push(await this.getCharacter(entry.sys.id))
    }
    return characters;
  }

  async getEpisodes() {
    const episodes = await this.client.getEntries({
      content_type: "episode",
      order: "-fields.releaseDate",
      limit: 1000
    })

    return episodes.items.map((episode) => (
      {
        id: episode.sys.id,
        ...episode.fields,
        guests: episode.fields.guests ? episode.fields.guests.map((guest) => {
          const guestEntry = episodes.includes.Entry.find(entry => entry.sys.id === guest.sys.id);
          return {
            id: guestEntry ? guestEntry.sys.id : null,
            name: guestEntry ? guestEntry.fields.name : null
          }
        }) : [],
        characters: episode.fields.characters ? episode.fields.characters.map((character) => {
          const characterEntry = episodes.includes.Entry.find(entry => entry.sys.id === character.sys.id);
          return {
            id: characterEntry ? characterEntry.sys.id : null,
            name: characterEntry ? characterEntry.fields.name : null
          }
        }) : []
      }
    ))
  }

  async getGuest(id) {
    const guest = await this.client.getEntry(id);
    let characters = [];
    let episodes = [];

    try {
      characters = guest.fields.characters ? guest.fields.characters.map(character => ({
        id: character.sys.id,
        name: character.fields.name
      })) : []
    } catch (e) { }

    try {
      episodes = (await this.client.getEntries({
        content_type: "episode",
        "fields.guests.sys.id": id,
        limit: 1000
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

  async getCharacter(id) {
    const character = await this.client.getEntry(id);
    let guests = [];
    let episodes = [];

    try {
      guests = (await this.client.getEntries({
        content_type: "guest",
        "fields.characters.sys.id": id
      })).items.map(guest => ({
        id: guest.sys.id,
        name: guest.fields.name
      }))
    } catch (e) { console.log("Could not get guests for character: ", id, e) }

    try {
      episodes = (await this.client.getEntries({
        content_type: "episode",
        "fields.characters.sys.id": id,
        limit: 1000
      })).items.map(episode => ({
        id: episode.sys.id,
        title: episode.fields.title
      }))
    } catch (e) { }

    return {
      id,
      ...character.fields,
      guests,
      episodes
    }
  }
}

export const cc = new ContentfulClient();