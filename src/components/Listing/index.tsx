import { useNavigate } from "@tanstack/react-router";
import useGetRssFeed from "../../utils/useGetRssFeed";
import Article from "../Article";

function Listing() {
  const { data, isSuccess } = useGetRssFeed();
  const navigate = useNavigate();

  const onArticleClick = (guid: string) => {
    navigate({
      to: "/article",
      search: {
        source: "vox",
        id: guid,
      },
    });
  };

  if (isSuccess) {
    return (
      <>
        <div className="col-1">
          {data.map((article) => (
            <Article
              {...article}
              contents={article.description}
              onClick={() => onArticleClick(article.guid)}
            />
          ))}
        </div>
        {/* <div className="col-1">
          {data.map((article) => (
            <Article
              {...article}
              onClick={() => onArticleClick(article.guid)}
            />
          ))}
        </div> */}
      </>
    );
  } else return <>Error in Listing comp</>;
}

export default Listing;
