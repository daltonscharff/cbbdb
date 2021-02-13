import { useRouter } from 'next/router'
import { Menu } from 'semantic-ui-react';

export default function ListLayout({ activePage, children }) {
  const router = useRouter();
  return (
    <div className="mx-auto px-2 py-4 max-w-4xl">
      <div className="flex flex-row items-start mb-4 items-center">
        <h1 className="text-4xl w-full font-sans">
          <span className="font-bold">
            CBB
          </span>
          <span className="font-thin">
            Db
          </span>
        </h1>
        <Menu secondary className="mt-0">
          <Menu.Item
            name="episodes"
            active={activePage === "episodes"}
            onClick={() => router.push("/")}
          >
            Episodes
          </Menu.Item>
          <Menu.Item
            name="guests"
            active={activePage === "guests"}
            onClick={() => router.push("/guests")}
          >
            Guests
          </Menu.Item>
          <Menu.Item
            name="characters"
            active={activePage === "characters"}
            onClick={() => router.push("/characters")}
          >
            Characters
          </Menu.Item>
        </Menu>
      </div>
      {children}
    </div>
  );
}