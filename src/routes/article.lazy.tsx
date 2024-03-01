import { createLazyFileRoute } from "@tanstack/react-router";
import Article from "../components/Article";

export const Route = createLazyFileRoute("/article")({
  component: Article,
});
