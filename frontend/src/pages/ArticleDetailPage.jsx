import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../services/api";
import LoadingState from "../components/LoadingState";

function ArticleDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getArticleById(id)
      .then(setArticle)
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return <p className="error">Error: {error}</p>;
  }

  if (!article) {
    return <LoadingState />;
  }

  return (
    <section>
      <h2>{article.title}</h2>
      <p className="muted">Category: {article.category}</p>
      <p>{article.content}</p>
      <div className="tag-list">
        {article.tags.map((tag) => (
          <span key={tag} className="tag">
            #{tag}
          </span>
        ))}
      </div>
    </section>
  );
}

export default ArticleDetailPage;
