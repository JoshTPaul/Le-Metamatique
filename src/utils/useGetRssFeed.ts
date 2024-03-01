import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Response = {
  contents: any; // yeah, sorry
};

function useGetRssFeed() {
  const rssUrl = "https://jalopnik.com/rss";

  const getRssFeed = async () => {
    const res = await axios.get<Response>(
      `https://api.allorigins.win/get?url=${rssUrl}`
    );
    console.log("rss", res);
    return res.data;
  };

  const sanitizeText = (text: string) => {
    return text.replace(/<(?!\/?a(?=>|\s.*>))\/?.*?>/g, "");
  };

  const transformResponse = (res: Response) => {
    const feed = new window.DOMParser().parseFromString(
      res.contents,
      "text/xml"
    );
    const items = [...feed.querySelectorAll("item")].map((obj) => {
      const title = sanitizeText(obj.querySelector("title")?.textContent || "");
      const description = sanitizeText(
        obj.querySelector("description")?.textContent || ""
      );
      const imgLink = obj
        .querySelector("thumbnail")
        ?.attributes?.getNamedItem("url")?.value;
      const guid = obj.querySelector("guid")?.textContent;

      return {
        title,
        description,
        imgLink,
        guid,
      };
    });

    console.log("wads", [...feed.querySelectorAll("item")]);
    return items;
  };

  return useQuery({
    queryKey: ["getRssFeed"],
    queryFn: getRssFeed,
    select: transformResponse,
  });
}

export default useGetRssFeed;
