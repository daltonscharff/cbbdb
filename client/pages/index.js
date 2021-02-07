import Link from 'next/link';
import { useState } from 'react';
import { cc } from "../services/contentful";
import Tabs from "../components/tabs"

export default function Episodes({ episodes, ...props }) {
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  return (
    <>
      <Tabs pages={[{
        title: "Episodes",
        link: "/"
      }, {
        title: "Guests",
        link: "/guests"
      }, {
        title: "Characters",
        link: "/characters"
      }]} activeIndex="0" />
      <div className="mx-auto px-2 max-w-4xl">
        {/* <div className="font-bold text-xl uppercase text-center my-6">Episodes</div> */}
        {episodes.map(episode => (
          <div
            className=""
            key={episode.id}
            id={episode.id}
          >
            <div className="flex flex-col w-auto mx-1 my-2 shadow rounded">
              <div className="flex flex-row p-3 bg-gray-100" onClick={() => selectedEpisode === episode.id ? setSelectedEpisode(null) : setSelectedEpisode(episode.id)}>
                <div className="text-left px-1 font-light">{episode.number}</div>
                <div className="w-full font-bold px-2">{episode.title}</div>
                <div className="w-48 text-right px-1">{episode.releaseDate}</div>
              </div>
              <div className={`flex flex-col px-3 pb-3 border-t border-gray-200 ${selectedEpisode === episode.id ? "" : "hidden"}`}>
                <div className="py-3 text-sm">{episode.description}</div>
                <div className="flex flex-col sm:flex-row">
                  <div className="w-full py-2 sm:pr-6">
                    <div className="font-light text-gray-800">Guests</div>
                    {episode.guests.map(guest => (
                      <Link key={guest.id} href={`/guests/${guest.id}`}>
                        <a className="flex-shrink-0">
                          {guest.name}
                          <br />
                        </a>
                      </Link>
                    ))}
                  </div>
                  <div className="w-full py-2">
                    <div className="font-light text-gray-800">Characters</div>
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
    </>
  )
}

export async function getStaticProps(context) {
  return {
    props: {
      episodes: await cc.getEpisodes()
    }
  }
}
