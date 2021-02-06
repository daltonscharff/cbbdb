import { createClient } from "contentful";

export default class ContentfulClient {
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
      ...guest.fields
    }));
  }
}