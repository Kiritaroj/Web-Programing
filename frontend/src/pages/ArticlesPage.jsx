import { useEffect, useState } from "react";
import { getArticles } from "../services/api";
import ArticleCard from "../components/ArticleCard";
import LoadingState from "../components/LoadingState";

function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getArticles()
      .then(setArticles)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <p className="error">Error: {error}</p>;
  }

  return (
    <section>
      <h2>All Articles</h2>
      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <div className="card-grid">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ArticlesPage;
