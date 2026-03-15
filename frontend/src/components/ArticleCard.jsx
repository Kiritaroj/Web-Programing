import { Link } from "react-router-dom";
import { getArticleExcerpt, getArticleImage } from "../contentLibrary";

function ArticleCard({ article }) {
  return (
    <article className="article-card">
      <Link
        className="article-card-media"
        to={`/articles/${article.id}`}
        style={{ backgroundImage: `linear-gradient(180deg, rgba(17, 24, 39, 0.08), rgba(17, 24, 39, 0.2)), url(${getArticleImage(article)})` }}
        aria-label={article.title}
      />
      <div className="article-card-body">
        <p className="article-card-category">Category: {article.category}</p>
        <h3 className="article-card-title">
          <Link to={`/articles/${article.id}`}>{article.title}</Link>
        </h3>
        <p className="article-card-copy">{getArticleExcerpt(article.content)}</p>
        <div className="tag-list">
          {article.tags.map((tag) => (
            <span key={tag} className="tag">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default ArticleCard;
