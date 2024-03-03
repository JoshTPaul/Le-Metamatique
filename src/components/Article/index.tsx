import { ArticleType } from "../../types";

type Props = Omit<ArticleType, "description"> & {
  source: string;
} & Pick<React.HTMLAttributes<HTMLElement>, "onClick" | "className">;

function Article({
  title,
  imgLink,
  contents,
  guid,
  publishedAt,
  source,
  author,
  ...rest
}: Props) {
  return (
    <article id={guid} {...rest}>
      <h1 className="articleTitle">{title}</h1>
      <h6 className="articleMeta">
        {source} | {author} | {publishedAt}
      </h6>
      <img className="heroImg" src={imgLink} alt="" />
      <div
        className="contents"
        dangerouslySetInnerHTML={{ __html: contents }}
      />
    </article>
  );
}

export default Article;
