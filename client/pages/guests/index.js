import Link from 'next/link';
import { cc } from "../../services/contentful";
import ListLayout from '../../components/layouts/ListLayout';

export default function Guests({ guests }) {
  return (
    <ListLayout activePage="guests">
      {guests.map(guest => (
        <div key={guest.id}>
          <Link href={`/guests/${guest.id}`}>
            {guest.name}
          </Link>
        </div>
      ))}
    </ListLayout>
  )
}

export async function getStaticProps(context) {
  return {
    props: {
      guests: await cc.getGuests()
    }
  }
}