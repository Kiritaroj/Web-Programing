import { Link } from "react-router-dom";

function ArticleCard({ article }) {
  return (
    <article className="card">
      <h3>
        <Link to={`/articles/${article.id}`}>{article.title}</Link>
      </h3>
      <p className="muted">Category: {article.category}</p>
      <p>{article.content.slice(0, 100)}...</p>
      <div className="tag-list">
        {article.tags.map((tag) => (
          <span key={tag} className="tag">
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}

export default ArticleCard;
