import Link from 'next/link';
import { cc } from "../../services/contentful"

export default function Guests({ guests, ...props }) {
  return (
    <div>
      {guests.map(guest => (
        <div key={guest.id}>
          <Link href={`/guests/${guest.id}`}>
            {guest.name}
          </Link>
        </div>
      ))}
    </div>
  )
}

export async function getStaticProps(context) {
  const guests = await cc.getGuests()
  return {
    props: {
      guests
    }
  }
}