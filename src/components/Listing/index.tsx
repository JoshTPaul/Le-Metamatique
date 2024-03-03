import { useNavigate } from "@tanstack/react-router";
import { Fragment } from "react";
import useGetRssFeed from "../../utils/useGetRssFeed";
import Article from "../Article";
import "./styles.scss";

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
    const oddArr = data.filter((_, i) => i % 2 !== 0);
    const evenArr = data.filter((_, i) => i % 2 === 0);

    return (
      <section id="listView">
        <div className="col">
          {evenArr.map((article, i) => {
            const renderBottomDivider = i % 3 === 0;
            const renderTopDivider = i !== 0 && renderBottomDivider;
            return (
              <Fragment key={`article-even-${i}`}>
                {renderTopDivider && <hr />}
                <Article
                  {...article}
                  className={i % 3 === 0 ? "largeLayout" : "smallLayout"}
                  contents={article.description}
                  onClick={() => onArticleClick(article.guid)}
                />

                {renderBottomDivider && <hr />}
              </Fragment>
            );
          })}
        </div>
        <div className="col">
          {oddArr.map((article, i) => {
            const renderBottomDivider = (i + 1) % 3 === 0;
            const renderTopDivider = i !== 0 && renderBottomDivider;
            return (
              <Fragment key={`article-odd-${i}`}>
                {renderTopDivider && <hr />}
                <Article
                  key={`article-odd-${i}`}
                  className={(i + 1) % 3 === 0 ? "largeLayout" : "smallLayout"}
                  {...article}
                  contents={article.description}
                  onClick={() => onArticleClick(article.guid)}
                />

                {renderBottomDivider && <hr />}
              </Fragment>
            );
          })}
        </div>
      </section>
    );
  } else return <>Error in Listing comp</>;
}

export default Listing;
