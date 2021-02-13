import Link from 'next/link';

export function RelatedItems({ episodeList = [], guestList = [], characterList = [] }) {
  const episodeColumn = <div className="m-auto text-center">
    <div className="font-bold">Episodes</div>
    {episodeList.map(episode => episode.id === null ? null : (
      <Link key={episode.id} href={`/#${episode.id}`}>
        <div as='a' className="cursor-pointer">{episode.title}</div>
      </Link>
    ))}
  </div>

  const guestColumn = <div className="m-auto text-center">
    <div className="font-bold">Guests</div>
    {guestList.map(guest => guest.id === null ? null : (
      <Link key={guest.id} href={`/guests#${guest.id}`}>
        <div as='a' className="cursor-pointer">{guest.name}</div>
      </Link>
    ))}
  </div>

  const characterColumn = <div className="m-auto text-center">
    <div className="font-bold">Characters</div>
    {characterList.map(character => character.id === null ? null : (
      <Link key={character.id} href={`/characters#${character.id}`}>
        <div as='a' className="cursor-pointer">{character.name}</div>
      </Link>
    ))}
  </div>

  return (
    <div className="flex flex-row">
      {episodeList.length ? episodeColumn : null}
      {guestList.length ? guestColumn : null}
      {characterList.length ? characterColumn : null}
    </div>
  );
}

