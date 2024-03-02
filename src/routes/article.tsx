import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import Article from "../components/Article";
import "../components/Article/styles.scss";
import useGetRssFeed from "../utils/useGetRssFeed";

type Search = {
  id: string;
  source: string;
};

export const Route = createFileRoute("/article")({
  component: ArticlePage,
  validateSearch: (search: Record<string, unknown>): Search => {
    // validate and parse the search params into a typed state
    return {
      id: (search?.id as string) || "",
      source: (search.filter as string) || "",
    };
  },
});

function ArticlePage() {
  const { data } = useGetRssFeed();
  const search = Route.useSearch();
  const articleData = data?.find(({ guid }) => search?.id === guid);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  if (!articleData) return <>Test</>;
  else {
    return (
      <section id="articleView">
        <Article {...articleData} />
      </section>
    );
  }
}
