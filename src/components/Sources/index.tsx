import { useState } from "react";
import Tick from "../../assets/Tick";
import "./styles.scss";

const SOURCES = ["BBC", "Jalopnik", "Sky Sports", "Reuters", "CNN", "IGN"];

function Sources() {
  const getRss = async () => {
    const rssUrl = "https://jalopnik.com/rss";

    const res = await fetch(`https://api.allorigins.win/get?url=${rssUrl}`);

    const { contents } = await res.json();
    const feed = new window.DOMParser().parseFromString(contents, "text/xml");
    const items = feed.querySelectorAll("item");
    const feedItems = [...items];

    console.log(feedItems, "feed");
  };

  getRss();

  return (
    <section id="sources">
      <aside>
        <h1>
          Welcome to <em>your</em> newspaper
        </h1>
        <p>
          <strong>Le Metamatique</strong>
          is your one stop destination for the news you want to see. Choose from
          a variety of news sources to create your very own newspaper front
          page:
        </p>
        <div>Search</div>
        {SOURCES.map((source) => (
          <Source name={source} />
        ))}
      </aside>
    </section>
  );
}

type Props = {
  name: string;
};

function Source({ name }: Props) {
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <article
      className={selected ? "selected" : ""}
      onClick={() => setSelected((prev) => !prev)}
    >
      {selected && <Tick />}
      <img src="" alt={name} />
      {name}
    </article>
  );
}

export default Sources;
