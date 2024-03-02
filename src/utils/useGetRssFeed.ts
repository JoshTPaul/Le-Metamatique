import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ArticleType } from "../types";

type Response = {
  contents?: any; // yeah, sorry
};

type VoxResponse = string;

const sanitizeText = (text: string) => {
  // return text.replace(/<(?!\/?a(?=>|\s.*>))\/?.*?>/g, "");
  return text.replace(/<[^>]*>/g, "");
};

const voxParser: (res: VoxResponse) => ArticleType[] = (res) => {
  const feed = new window.DOMParser().parseFromString(res, "text/xml");

  const items = [...feed.querySelectorAll("entry")].map((obj) => {
    const title = sanitizeText(obj.querySelector("title")?.textContent || "");

    const contents = new window.DOMParser().parseFromString(
      obj.querySelector("content")?.textContent || "",
      "text/html"
    );

    const mainFigure = contents.body.children[0];

    const mainImg = mainFigure?.querySelector("img");

    const imgLink = mainImg?.attributes?.getNamedItem("src")?.value || "";

    const description = [...contents.querySelectorAll("p")]
      .filter((_, i) => i < 3)
      .map((val) => `<p>${val.textContent}</p>`)
      .join("");

    const guid = obj.querySelector("id")?.textContent || "";

    const contentWithoutMainFigure = [...contents.body.children]
      .slice(1)
      .map((ele) => `<${ele.nodeName}>${ele.innerHTML}</${ele.nodeName}>`)
      .join("");

    const date = obj.querySelector("published")?.textContent || "";

    const publishedAt = new Intl.DateTimeFormat("en-IN", {
      dateStyle: "long",
      timeStyle: "long",
    }).format(new Date(date));

    const author =
      obj?.querySelector("author")?.querySelector("name")?.textContent || "";

    return {
      title,
      description,
      imgLink,
      guid,
      contents: contentWithoutMainFigure,
      publishedAt,
      author,
      source: "Vox",
    };
  });

  return items;
};

function useGetRssFeed() {
  const rssUrl = "https://www.vox.com/rss/index.xml";

  const getRssFeed = async () => {
    const res = await axios.get<Response | string>(`${rssUrl}`);
    return res.data;
  };

  const transformResponse = (res: Response | string) => {
    // const feed = new window.DOMParser().parseFromString(
    //   res?.contents || res,
    //   "text/xml"
    // );
    // const items = [
    //   // ...feed.querySelectorAll("item"),
    //   ...feed.querySelectorAll("entry"),
    // ].map((obj) => {
    //   const title = sanitizeText(obj.querySelector("title")?.textContent || "");
    //   const description = sanitizeText(
    //     obj.querySelector("description")?.textContent ||
    //       obj.querySelector("content")?.textContent ||
    //       ""
    //   );
    //   const imgLink = obj
    //     .querySelector("thumbnail")
    //     ?.attributes?.getNamedItem("url")?.value;
    //   const guid = obj.querySelector("guid")?.textContent;

    //   return {
    //     title,
    //     description,
    //     // imgLink,
    //     // guid,
    //   };
    // });

    const items = voxParser(res as string);
    return items;
  };

  return useQuery({
    queryKey: ["getRssFeed"],
    queryFn: getRssFeed,
    select: transformResponse,
  });
}

export default useGetRssFeed;
