import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArticleForm from "../components/ArticleForm";
import LoadingState from "../components/LoadingState";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import { getArticleExcerpt } from "../contentLibrary";
import {
  createArticle,
  deleteArticle,
  getArticles,
  updateArticle
} from "../services/api";

function ManageArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [editingArticle, setEditingArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadArticles(showLoading = false) {
    if (showLoading) {
      setLoading(true);
    }

    try {
      const data = await getArticles();
      setArticles(data);
    } catch (err) {
      setError(err.message);
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    loadArticles(true);
  }, []);

  async function handleCreateOrUpdate(payload) {
    setError("");
    setMessage("");

    try {
      if (editingArticle) {
        await updateArticle(editingArticle.id, payload);
        setMessage("Article updated successfully.");
      } else {
        await createArticle(payload);
        setMessage("Article created successfully.");
      }

      setEditingArticle(null);
      await loadArticles();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm("Delete this article?");
    if (!confirmed) return;

    setError("");
    setMessage("");

    try {
      await deleteArticle(id);
      setMessage("Article deleted successfully.");
      if (editingArticle?.id === id) {
        setEditingArticle(null);
      }
      await loadArticles();
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) {
    return <LoadingState label="Loading article management" />;
  }

  const categories = [...new Set(articles.map((article) => article.category))];
  const tags = [...new Set(articles.flatMap((article) => article.tags))];

  return (
    <div className="page-stack">
      <PageHeader
        section="Manage"
        title="Article Management"
        description="The management route now reflects its actual purpose: a proper content form, taxonomy guidance, and a structured inventory table."
        actions={
          <>
            <Link className="button button-secondary" to="/articles">
              Open Article Library
            </Link>
            {editingArticle ? (
              <button
                className="button"
                onClick={() => setEditingArticle(null)}
                type="button"
              >
                Reset Form
              </button>
            ) : null}
          </>
        }
      />

      <div className="metric-grid">
        <StatCard
          label="Articles in system"
          value={articles.length}
          detail="Current records loaded from the in-memory API."
        />
        <StatCard
          label="Editorial categories"
          value={categories.length}
          detail="Reusable category values visible in the article list."
        />
        <StatCard
          label="Available tags"
          value={tags.length}
          detail="Label count created from comma-separated tag fields."
        />
        <StatCard
          label="Editing mode"
          value={editingArticle ? "Editing" : "Create"}
          detail="Switches automatically when an article is selected below."
        />
      </div>

      {message ? <div className="banner success-banner">{message}</div> : null}
      {error ? <div className="banner error-banner">Error: {error}</div> : null}

      <div className="manage-layout">
        <ArticleForm
          onSubmit={handleCreateOrUpdate}
          articleBeingEdited={editingArticle}
          onCancelEdit={() => setEditingArticle(null)}
        />

        <aside className="info-stack">
          <section className="surface-card section-block">
            <div className="section-heading-copy">
              <p className="section-heading-kicker">Publishing checklist</p>
              <h2>Before saving an article</h2>
            </div>
            <ul className="detail-list">
              <li>Write a clear title that matches how students will search for the topic.</li>
              <li>Keep the content field as the full article body returned by the API.</li>
              <li>Use a single category value so the article appears on the correct route page.</li>
              <li>Separate tags with commas to keep the tag cloud and filters consistent.</li>
            </ul>
          </section>

          <section className="surface-card section-block">
            <div className="section-heading-copy">
              <p className="section-heading-kicker">Current taxonomy</p>
              <h2>Categories and tags</h2>
            </div>

            <div className="tag-list">
              {categories.map((category) => (
                <span className="tag" key={category}>
                  {category}
                </span>
              ))}
            </div>

            <div className="tag-list">
              {tags.map((tag) => (
                <span className="tag" key={tag}>
                  #{tag}
                </span>
              ))}
            </div>
          </section>
        </aside>
      </div>

      <section className="section-block">
        <div className="section-heading">
          <div className="section-heading-copy">
            <p className="section-heading-kicker">Inventory</p>
            <h2>Current article records</h2>
            <p>Select an article to edit, or remove it from the list entirely.</p>
          </div>
        </div>

        <div className="table-shell">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Article</th>
                  <th>Category</th>
                  <th>Tags</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id}>
                    <td>#{article.id}</td>
                    <td>
                      <div className="table-title">{article.title}</div>
                      <div className="table-copy">{getArticleExcerpt(article.content, 96)}</div>
                    </td>
                    <td>{article.category}</td>
                    <td>
                      <div className="tag-list">
                        {article.tags.map((tag) => (
                          <span className="tag" key={tag}>
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="actions">
                      <button
                        className="button-secondary"
                        onClick={() => setEditingArticle(article)}
                        type="button"
                      >
                        Edit
                      </button>
                      <button
                        className="button-danger"
                        onClick={() => handleDelete(article.id)}
                        type="button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ManageArticlesPage;
