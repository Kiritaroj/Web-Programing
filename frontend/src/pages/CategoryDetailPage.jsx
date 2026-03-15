import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import LoadingState from "../components/LoadingState";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import { getArticlesByCategory } from "../services/api";

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
    return <LoadingState label="Loading category" />;
  }

  if (error) {
    return <div className="banner error-banner">Error: {error}</div>;
  }

  const tags = [...new Set(articles.flatMap((article) => article.tags))];
  const featuredArticle = articles[0];

  return (
    <div className="page-stack">
      <PageHeader
        section={`Categories / ${decodedCategory}`}
        title={decodedCategory}
        description="Category pages now behave like focused content collections, with a quick overview and an article grid for the selected route."
        actions={
          <>
            <Link className="button button-secondary" to="/categories">
              All Categories
            </Link>
            <Link className="button" to="/articles">
              Article Library
            </Link>
          </>
        }
      />

      <div className="metric-grid">
        <StatCard
          label="Articles"
          value={articles.length}
          detail="Entries currently assigned to this category."
        />
        <StatCard
          label="Tag labels"
          value={tags.length}
          detail="Distinct tags appearing in the selected category."
        />
        <StatCard
          label="Primary tag"
          value={tags[0] ? `#${tags[0]}` : "-"}
          detail="First available tag in the current category set."
        />
        <StatCard
          label="Route"
          value="Live"
          detail={`/categories/${encodeURIComponent(decodedCategory)}`}
        />
      </div>

      {featuredArticle ? (
        <section className="surface-card section-block">
          <div className="section-heading-copy">
            <p className="section-heading-kicker">Category spotlight</p>
            <h2>{featuredArticle.title}</h2>
            <p>{featuredArticle.content}</p>
          </div>
          <div className="tag-list">
            {featuredArticle.tags.map((tag) => (
              <span className="tag" key={tag}>
                #{tag}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {articles.length === 0 ? (
        <section className="empty-state">
          <h2>No articles are assigned to this category yet.</h2>
          <p>Create a new article from the management page to populate this route.</p>
        </section>
      ) : (
        <section className="section-block">
          <div className="section-heading">
            <div className="section-heading-copy">
              <p className="section-heading-kicker">Category articles</p>
              <h2>Available entries</h2>
              <p>All articles linked to the selected category are displayed below.</p>
            </div>
          </div>

          <div className="article-grid">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default CategoryDetailPage;
