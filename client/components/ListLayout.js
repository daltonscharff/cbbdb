import { useRouter } from 'next/router'
import { Menu } from 'semantic-ui-react';

const header = (activePage) => {
  const router = useRouter();
  return (
    <div className="flex flex-col sm:flex-row items-start mb-4 items-center">
      <h1 className="text-4xl w-full font-sans text-center pb-4 px-2 sm:text-left sm:pb-0">
        <span className="font-bold">CBB</span>
        <span className="font-thin">Db</span>
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
  )
}

const footer = (
  <div className="pt-4 text-gray-400 text-center">
    <div className="text-xs">
      <span>Created by </span>
      <a href="https://github.com/daltonscharff/cbbdb" target="_blank">
        Dalton Scharff
      </a>
    </div>
  </div>
);

export default function ListLayout({ activePage, children }) {
  return (
    <div className="mx-auto px-2 py-4 max-w-4xl flex flex-col min-h-screen">
      {header(activePage)}
      <div className="flex-grow">
        {children}
      </div>
      {footer}
    </div>
  );
}