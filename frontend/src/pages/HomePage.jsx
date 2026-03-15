import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import LoadingState from "../components/LoadingState";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import { COLLECTIONS } from "../contentLibrary";
import { getArticles, getCategories, getStats, getTags } from "../services/api";

function HomePage() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState(null);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadHomePage() {
      try {
        const [statsData, articlesData, categoriesData, tagsData] = await Promise.all([
          getStats(),
          getArticles(),
          getCategories(),
          getTags()
        ]);

        setStats(statsData);
        setArticles(articlesData);
        setCategories(categoriesData);
        setTags(tagsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadHomePage();
  }, []);

  if (loading) {
    return <LoadingState label="Loading home page" />;
  }

  if (error) {
    return <div className="banner error-banner">Error: {error}</div>;
  }

  return (
    <div className="page-stack">
      <PageHeader
        section="Home"
        title="Student Knowledge Base"
        description="The landing page highlights the live article library, category routes, and quick access paths instead of showing generic dashboard placeholders."
        actions={
          <>
            <Link className="button button-secondary" to="/articles">
              Explore Articles
            </Link>
            <Link className="button" to="/manage">
              Create Article
            </Link>
          </>
        }
      />

      <div className="metric-grid">
        <StatCard
          label="Indexed articles"
          value={stats?.articleCount ?? 0}
          detail="Seeded help content available in the API."
        />
        <StatCard
          label="Active categories"
          value={stats?.categoryCount ?? 0}
          detail="Topic routes currently available to browse."
        />
        <StatCard
          label="Search tags"
          value={tags.length}
          detail="Reusable labels that connect articles across sections."
        />
        <StatCard
          label="Featured collections"
          value={COLLECTIONS.length}
          detail="Visual shortcuts adapted from the approved mockup."
        />
      </div>

      <div className="home-layout">
        <section className="surface-card section-block">
          <div className="section-heading">
            <div className="section-heading-copy">
              <p className="section-heading-kicker">Featured collections</p>
              <h2>Start from the section that matches the task.</h2>
              <p>
                Each collection points to a real category route and uses the same asset-backed treatment as the mockup.
              </p>
            </div>
          </div>

          <div className="collection-grid">
            {COLLECTIONS.map((collection) => (
              <Link
                key={collection.title}
                className="collection-card"
                to={collection.href}
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(17, 24, 39, 0.08), rgba(17, 24, 39, 0.78)), url(${collection.image})`
                }}
              >
                <div className="collection-card-body">
                  <p className="collection-stat">Collection</p>
                  <h3>{collection.title}</h3>
                  <p>{collection.description}</p>
                  <span className="collection-link">Open route -&gt;</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <aside className="quick-links">
          <section className="surface-card section-block">
            <div className="section-heading-copy">
              <p className="section-heading-kicker">Browse by topic</p>
              <h2>Category routes</h2>
              <p>
                The categories page now behaves like a help-center index, so the home screen links into those sections directly.
              </p>
            </div>

            {categories.map((category) => {
              const matchingArticles = articles.filter((article) => article.category === category);

              return (
                <Link
                  key={category}
                  className="link-tile"
                  to={`/categories/${encodeURIComponent(category)}`}
                >
                  <div className="link-tile-row">
                    <strong>{category}</strong>
                    <span className="count-pill">{matchingArticles.length} articles</span>
                  </div>
                  <p>
                    {matchingArticles[0]?.title ?? "Open the category detail page to browse entries."}
                  </p>
                </Link>
              );
            })}
          </section>

          <section className="surface-card section-block">
            <div className="section-heading-copy">
              <p className="section-heading-kicker">Common tags</p>
              <h2>Popular labels</h2>
              <p>Jump into the dedicated tags view or start a focused search from the top bar.</p>
            </div>
            <div className="tag-list">
              {tags.map((tag) => (
                <Link className="tag" key={tag} to="/tags">
                  #{tag}
                </Link>
              ))}
            </div>
            <Link className="button button-secondary" to="/search">
              Open Search Workspace
            </Link>
          </section>
        </aside>
      </div>

      <section className="section-block">
        <div className="section-heading">
          <div className="section-heading-copy">
            <p className="section-heading-kicker">Latest content</p>
            <h2>Popular articles</h2>
            <p>The live article cards now carry the same visual system as the mockups.</p>
          </div>
          <Link className="button button-secondary" to="/articles">
            View all articles
          </Link>
        </div>

        <div className="article-grid">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard article={article} key={article.id} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
