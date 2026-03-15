import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import LoadingState from "../components/LoadingState";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import { getArticles } from "../services/api";

function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getArticles()
      .then(setArticles)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingState label="Loading article library" />;
  }

  if (error) {
    return <div className="banner error-banner">Error: {error}</div>;
  }

  const categories = [...new Set(articles.map((article) => article.category))];
  const tagCount = new Set(articles.flatMap((article) => article.tags)).size;
  const normalizedQuery = query.trim().toLowerCase();

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      activeCategory === "All" || article.category === activeCategory;
    const matchesQuery =
      !normalizedQuery ||
      article.title.toLowerCase().includes(normalizedQuery) ||
      article.content.toLowerCase().includes(normalizedQuery) ||
      article.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

    return matchesCategory && matchesQuery;
  });

  filteredArticles.sort((left, right) => {
    if (sortBy === "title") {
      return left.title.localeCompare(right.title);
    }

    if (sortBy === "category") {
      return left.category.localeCompare(right.category) || left.title.localeCompare(right.title);
    }

    return right.id - left.id;
  });

  return (
    <div className="page-stack">
      <PageHeader
        section="Articles"
        title="Articles"
        description="This screen now behaves like a real content library: searchable cards, category filters, sorting, and article previews built from the API data."
        actions={
          <>
            <Link className="button button-secondary" to="/search">
              Search Articles
            </Link>
            <Link className="button" to="/manage">
              Manage Content
            </Link>
          </>
        }
      />

      <div className="metric-grid">
        <StatCard
          label="Indexed articles"
          value={articles.length}
          detail="All entries currently returned by /api/articles."
        />
        <StatCard
          label="Visible results"
          value={filteredArticles.length}
          detail="Changes immediately as filters and sort order update."
        />
        <StatCard
          label="Category filters"
          value={categories.length}
          detail="Topic views available in the article browser."
        />
        <StatCard
          label="Connected tags"
          value={tagCount}
          detail="Unique labels attached to the current article set."
        />
      </div>

      <section className="surface-card section-block">
        <div className="section-heading">
          <div className="section-heading-copy">
            <p className="section-heading-kicker">Filter articles</p>
            <h2>Refine the content grid</h2>
            <p>Use the title filter, sort order, or category chips to narrow the article library.</p>
          </div>
        </div>

        <div className="controls-panel">
          <label className="search-field">
            <input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Filter by title, tag, or keyword"
              value={query}
            />
          </label>

          <label className="select-field">
            <select onChange={(event) => setSortBy(event.target.value)} value={sortBy}>
              <option value="latest">Latest first</option>
              <option value="title">Title A-Z</option>
              <option value="category">Category</option>
            </select>
          </label>
        </div>

        <div className="filter-row">
          <button
            className={activeCategory === "All" ? "chip-button active" : "chip-button"}
            onClick={() => setActiveCategory("All")}
            type="button"
          >
            All categories
          </button>
          {categories.map((category) => (
            <button
              className={activeCategory === category ? "chip-button active" : "chip-button"}
              key={category}
              onClick={() => setActiveCategory(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {filteredArticles.length === 0 ? (
        <section className="empty-state">
          <h2>No articles match the current filters.</h2>
          <p>Try clearing the category chips or using a shorter search term.</p>
        </section>
      ) : (
        <section className="section-block">
          <div className="section-heading">
            <div className="section-heading-copy">
              <p className="section-heading-kicker">Article grid</p>
              <h2>Available articles</h2>
              <p>The cards below use the same imagery and hierarchy introduced in the mockup set.</p>
            </div>
          </div>

          <div className="article-grid">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ArticlesPage;
