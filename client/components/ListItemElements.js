import Link from 'next/link';
import { List, Grid } from 'semantic-ui-react';

export function RelatedItems({ episodeList = [], guestList = [], characterList = [] }) {
  const episodeColumn = <Grid.Column>
    <List>
      <List.Item className="font-bold">Episodes</List.Item>
      {episodeList.map(episode => (
        <Link key={episode.id} href={`/${episode.id}`}>
          <List.Item as='a'>{episode.title}</List.Item>
        </Link>
      ))}
    </List>
  </Grid.Column>

  const guestColumn = <Grid.Column>
    <List>
      <List.Item className="font-bold">Guests</List.Item>
      {guestList.map(guest => (
        <Link key={guest.id} href={`/guests/${guest.id}`}>
          <List.Item as='a'>{guest.name}</List.Item>
        </Link>
      ))}
    </List>
  </Grid.Column>

  const characterColumn = <Grid.Column>
    <List>
      <List.Item className="font-bold">Characters</List.Item>
      {characterList.map(character => (
        <Link key={character.id} href={`/characters/${character.id}`}>
          <List.Item as='a'>{character.name}</List.Item>
        </Link>
      ))}
    </List>
  </Grid.Column>

  const numColumns = [episodeList, guestList, characterList].reduce((total, list) => {
    return list.length > 0 ? ++total : total;
  }, 0);

  return (
    <Grid columns={numColumns || 1} divided className="text-center">
      <Grid.Row>
        {episodeList.length ? episodeColumn : null}
        {guestList.length ? guestColumn : null}
        {characterList.length ? characterColumn : null}
      </Grid.Row >
    </Grid >
  );
}

