import { useRouter } from 'next/router'
import { Divider, Menu } from 'semantic-ui-react';

export default function ListLayout({ activePage, children }) {
  const router = useRouter();
  return (
    <div className="mx-auto px-2 py-2 max-w-4xl">
      <Menu borderless fluid widths={3}>
        <Menu.Item
          name="episodes"
          active={activePage === "episodes"}
          link
          onClick={() => router.push("/")}
        >
          Episodes
        </Menu.Item>
        <Menu.Item
          name="guests"
          active={activePage === "guests"}
          link
          onClick={() => router.push("/guests")}
        >
          Guests
        </Menu.Item>
        <Menu.Item
          name="characters"
          active={activePage === "characters"}
          link
          onClick={() => router.push("/characters")}
        >
          Characters
        </Menu.Item>
      </Menu>
      <Divider />
      {children}
    </div>
  );
}