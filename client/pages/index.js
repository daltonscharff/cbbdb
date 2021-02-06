import Link from 'next/link';
import { cc } from "../services/contentful"

export default function Episodes({ episodes, ...props }) {
  return (
    <div className="">
      {episodes.map(episode => (
        <div
          className=""
          key={episode.id}
          id={episode.id}
        >
          <div className="">

            <div className="">{episode.title}</div>
            <div className="text-gray-500 text-md">Ep. 111</div>
            <div className="">
              <div className="py-2">Description here.</div>
              <div className="flex">
                <div className="">
                  <div className="">Characters</div>
                  {episode.characters.map(character => (
                    <Link key={character.id} href={`/characters/${character.id}`}>
                      <a className="">
                        {character.name}
                        <br />
                      </a>
                    </Link>
                  ))}
                </div>
                <div className="">
                  <div className="">Guests</div>
                  {episode.guests.map(guest => (
                    <Link key={guest.id} href={`/guests/${guest.id}`}>
                      <a className="">
                        {guest.name}
                        <br />
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))
      }
    </div >
  )
}

export async function getStaticProps(context) {
  return {
    props: {
      episodes: await cc.getEpisodes()
    }
  }
}
