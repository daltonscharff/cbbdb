import Link from 'next/link';

export function RelatedItems({ episodeList = [], guestList = [], characterList = [] }) {
  const episodeColumn = <div className="min-w-1/2 text-center">
    <div className="font-bold w-max mx-auto">Episodes</div>
    {episodeList.map(episode => episode.id === null ? null : (
      <Link key={episode.id} href={`/#${episode.id}`}>
        <a className="block w-max mx-auto">{episode.title}</a>
      </Link>
    ))}
  </div>

  const guestColumn = <div className="min-w-1/2 text-center">
    <div className="font-bold w-max mx-auto">Guests</div>
    {guestList.map(guest => guest.id === null ? null : (
      <Link key={guest.id} href={`/guests#${guest.id}`}>
        <a className="block w-max mx-auto">{guest.name}</a>
      </Link>
    ))}
  </div>

  const characterColumn = <div className=" w-1/2 text-center">
    <div className="font-bold w-max mx-auto">Characters</div>
    {characterList.map(character => character.id === null ? null : (
      <Link key={character.id} href={`/characters#${character.id}`}>
        <a className="block w-max mx-auto">{character.name}</a>
      </Link>
    ))}
  </div>

  return (
    <div className="flex flex-row justify-center">
      {episodeList.length ? episodeColumn : null}
      {guestList.length ? guestColumn : null}
      {characterList.length ? characterColumn : null}
    </div>
  );
}

