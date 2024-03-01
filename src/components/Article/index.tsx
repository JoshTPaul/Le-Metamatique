import useGetRssFeed from "../../utils/useGetRssFeed";
import "./styles.scss";

function Article() {
  //   const res = useSearch({ strict: false });
  const { data, isSuccess } = useGetRssFeed();

  console.log(data, "data");

  const source = "BBC";
  const author = "Firstname Lastname";
  const publishedAt = "Oct 1, 2023 at 08:00 IST";

  if (isSuccess) {
    const { title, description, imgLink } = data[0];
    return (
      <article id="article">
        <h1>{title}</h1>
        <h6>
          {source} | {author} | {publishedAt}
        </h6>
        <img src={imgLink} alt="" />
        <p dangerouslySetInnerHTML={{ __html: description }} />
      </article>
    );
  } else return <>Error</>;
}

export default Article;
