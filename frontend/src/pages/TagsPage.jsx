import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import LoadingState from "../components/LoadingState";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import { getArticles, getTags } from "../services/api";

function TagsPage() {
  const [activeTag, setActiveTag] = useState("");
  const [articles, setArticles] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTagsPage() {
      try {
        const [tagsData, articlesData] = await Promise.all([getTags(), getArticles()]);
        setTags(tagsData);
        setArticles(articlesData);
        setActiveTag(tagsData[0] ?? "");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadTagsPage();
  }, []);

  if (loading) {
    return <LoadingState label="Loading tags" />;
  }

  if (error) {
    return <div className="banner error-banner">Error: {error}</div>;
  }

  const tagCounts = tags.reduce((counts, tag) => {
    counts[tag] = articles.filter((article) => article.tags.includes(tag)).length;
    return counts;
  }, {});

  const sortedTags = [...tags].sort(
    (left, right) => (tagCounts[right] ?? 0) - (tagCounts[left] ?? 0) || left.localeCompare(right)
  );

  const activeArticles = activeTag
    ? articles.filter((article) => article.tags.includes(activeTag))
    : [];

  return (
    <div className="page-stack">
      <PageHeader
        section="Tags"
        title="Tags"
        description="The tag screen now behaves like a topic cloud, with article matches below instead of a single row of static labels."
        actions={
          <Link className="button button-secondary" to="/search">
            Open Search
          </Link>
        }
      />

      <div className="metric-grid">
        <StatCard
          label="Indexed tags"
          value={tags.length}
          detail="Unique labels aggregated from the article content."
        />
        <StatCard
          label="Active selection"
          value={activeTag ? `#${activeTag}` : "-"}
          detail="The current tag used to filter the article grid."
        />
        <StatCard
          label="Matching articles"
          value={activeArticles.length}
          detail="Articles connected to the selected tag."
        />
        <StatCard
          label="Most used tag"
          value={sortedTags[0] ? `#${sortedTags[0]}` : "-"}
          detail="The tag with the broadest coverage in the current dataset."
        />
      </div>

      <section className="surface-card section-block">
        <div className="section-heading">
          <div className="section-heading-copy">
            <p className="section-heading-kicker">Topic cloud</p>
            <h2>Select a tag to filter related articles</h2>
            <p>The cloud uses the live tag list and highlights the current selection.</p>
          </div>
        </div>

        <div className="tag-cloud">
          {sortedTags.map((tag) => (
            <button
              className={activeTag === tag ? "chip-button active" : "chip-button"}
              key={tag}
              onClick={() => setActiveTag(tag)}
              type="button"
            >
              #{tag} <span className="count-pill">{tagCounts[tag]}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div className="section-heading-copy">
            <p className="section-heading-kicker">Related content</p>
            <h2>
              {activeTag ? `Articles tagged with #${activeTag}` : "Select a tag to begin"}
            </h2>
            <p>Each card below is sourced from the same live article list as the main library page.</p>
          </div>
        </div>

        {activeArticles.length === 0 ? (
          <div className="empty-state">
            <h2>No articles are currently linked to this tag.</h2>
            <p>Choose another tag or create new content from the management page.</p>
          </div>
        ) : (
          <div className="article-grid">
            {activeArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default TagsPage;
