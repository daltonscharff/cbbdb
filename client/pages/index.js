import Link from 'next/link';
import { cc } from "../services/contentful"

export default function Episodes({ episodes, ...props }) {
  return (
    <div>
      {episodes.map(episode => (
        <div
          className=""
          key={episode.id}
          id={episode.id}
        >
          <div className="flex flex-col w-auto mx-1 my-2 shadow rounded">
            <div className="flex flex-row p-3 bg-gray-100">
              <div className="text-left px-1 font-light">{episode.number}</div>
              <div className="w-full font-bold px-2">{episode.title}</div>
              <div className="w-48 text-right px-1">{episode.releaseDate}</div>
            </div>
            <div className="flex flex-col px-3 pb-3 border-t border-gray-200">
              <div className="py-3 text-sm">{episode.description}</div>
              <div className="flex flex-row">
                <div className="w-full pr-2">
                  <div className="border-b border-gray-100 font-light text-gray-800">Guests</div>
                  {episode.guests.map(guest => (
                    <Link key={guest.id} href={`/guests/${guest.id}`}>
                      <a className="flex-shrink-0">
                        {guest.name}
                        <br />
                      </a>
                    </Link>
                  ))}
                </div>
                <div className="w-full">
                  <div className="border-b border-gray-100 font-light text-gray-800">Characters</div>
                  {episode.characters.map(character => (
                    <Link key={character.id} href={`/characters/${character.id}`}>
                      <a className="flex-shrink-0">
                        {character.name}
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
    </div>
  )
}

export async function getStaticProps(context) {
  return {
    props: {
      episodes: await cc.getEpisodes()
    }
  }
}
