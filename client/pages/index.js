import dayjs from 'dayjs';
import { cc } from "../services/contentful";
import ListLayout from '../components/ListLayout';
import { RelatedItems } from '../components/RelatedItems';

export default function Episodes({ episodes, selected, toggleSelected }) {
  return (
    <ListLayout activePage="episodes">
      {episodes.map((episode, i) => (
        <div key={episode.id} id={episode.id} className={`px-2 ${i > 0 ? "border-t" : ""} ${selected === episode.id ? "shadow-inner bg-gray-50" : ""}`}>
          <div
            onClick={() => toggleSelected(episode.id)}
            className="cursor-pointer py-4"
          >
            <div className="flex flex-row items-center">
              <div className="text-left w-16">{episode.number}</div>
              <div className="w-full font-bold px-4">{episode.title}</div>
              <div className="w-48 text-right">{dayjs(episode.releaseDate).format("MMMM D, YYYY")}</div>
            </div>
          </div>
          <div className={`flex flex-col pb-4 ${selected === episode.id ? "" : "hidden"}`}>
            <div className="pb-5">{episode.description}</div>
            <RelatedItems
              guestList={episode.guests}
              characterList={episode.characters}
            />
          </div>
        </div>
      ))}
    </ListLayout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      episodes: await cc.getEpisodes()
    }
  }
}
