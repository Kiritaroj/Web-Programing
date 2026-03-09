import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticlesByCategory } from "../services/api";
import ArticleCard from "../components/ArticleCard";
import LoadingState from "../components/LoadingState";

function CategoryDetailPage() {
  const { categoryName } = useParams();
  const decodedCategory = decodeURIComponent(categoryName);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getArticlesByCategory(decodedCategory)
      .then(setArticles)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [decodedCategory]);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <p className="error">Error: {error}</p>;
  }

  return (
    <section>
      <h2>Category: {decodedCategory}</h2>
      {articles.length === 0 ? (
        <p>No articles in this category.</p>
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

export default CategoryDetailPage;
