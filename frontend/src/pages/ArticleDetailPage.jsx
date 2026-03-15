import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import LoadingState from "../components/LoadingState";
import PageHeader from "../components/PageHeader";
import { getArticleImage } from "../contentLibrary";
import { getArticleById, getArticlesByCategory } from "../services/api";

function ArticleDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    async function loadArticlePage() {
      try {
        const articleData = await getArticleById(id);
        if (!isActive) {
          return;
        }

        setArticle(articleData);

        const related = await getArticlesByCategory(articleData.category);
        if (!isActive) {
          return;
        }

        setRelatedArticles(related.filter((item) => item.id !== articleData.id));
      } catch (err) {
        if (isActive) {
          setError(err.message);
        }
      }
    }

    loadArticlePage();

    return () => {
      isActive = false;
    };
  }, [id]);

  if (error) {
    return <div className="banner error-banner">Error: {error}</div>;
  }

  if (!article) {
    return <LoadingState label="Loading article" />;
  }

  return (
    <div className="page-stack">
      <PageHeader
        section={`Articles / ${article.category}`}
        title={article.title}
        description="Detailed article view with category context, metadata, and related content from the same topic."
        actions={
          <>
            <Link
              className="button button-secondary"
              to={`/categories/${encodeURIComponent(article.category)}`}
            >
              Open Category
            </Link>
            <Link className="button" to="/manage">
              Manage Articles
            </Link>
          </>
        }
      />

      <div className="detail-hero">
        <div
          className="detail-media"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(17, 24, 39, 0.06), rgba(17, 24, 39, 0.58)), url(${getArticleImage(article)})`
          }}
        />

        <aside className="detail-panel">
          <div>
            <p className="section-heading-kicker">Knowledge article</p>
            <h2>{article.category}</h2>
            <p className="muted">
              Article #{article.id} in the live knowledge base dataset.
            </p>
          </div>

          <div className="meta-list">
            <div className="meta-item">
              <span className="meta-label">Route</span>
              <strong>/articles/{article.id}</strong>
            </div>
            <div className="meta-item">
              <span className="meta-label">Category</span>
              <strong>{article.category}</strong>
            </div>
            <div className="meta-item">
              <span className="meta-label">Tags</span>
              <strong>{article.tags.length}</strong>
            </div>
          </div>

          <div className="tag-list">
            {article.tags.map((tag) => (
              <span key={tag} className="tag">
                #{tag}
              </span>
            ))}
          </div>
        </aside>
      </div>

      <section className="surface-card section-block">
        <div className="section-heading-copy">
          <p className="section-heading-kicker">Article content</p>
          <h2>Full entry</h2>
          <p>The API stores article content as plain text, so this screen presents it cleanly instead of stretching it across the page.</p>
        </div>
        <p className="rich-copy">{article.content}</p>
      </section>

      {relatedArticles.length > 0 ? (
        <section className="section-block">
          <div className="section-heading">
            <div className="section-heading-copy">
              <p className="section-heading-kicker">Related articles</p>
              <h2>More from {article.category}</h2>
              <p>Articles that share the same category route are shown below.</p>
            </div>
          </div>

          <div className="article-grid">
            {relatedArticles.map((relatedArticle) => (
              <ArticleCard article={relatedArticle} key={relatedArticle.id} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default ArticleDetailPage;
