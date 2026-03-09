import { useEffect, useState } from "react";
import ArticleForm from "../components/ArticleForm";
import {
  createArticle,
  deleteArticle,
  getArticles,
  updateArticle
} from "../services/api";

function ManageArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [editingArticle, setEditingArticle] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadArticles() {
    try {
      const data = await getArticles();
      setArticles(data);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadArticles();
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

  return (
    <section>
      <h2>Article Management</h2>
      <p className="muted">Create, edit, and delete articles from this page.</p>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">Error: {error}</p>}

      <ArticleForm
        onSubmit={handleCreateOrUpdate}
        articleBeingEdited={editingArticle}
        onCancelEdit={() => setEditingArticle(null)}
      />

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id}>
                <td>{article.id}</td>
                <td>{article.title}</td>
                <td>{article.category}</td>
                <td className="actions">
                  <button
                    className="secondary"
                    onClick={() => setEditingArticle(article)}
                  >
                    Edit
                  </button>
                  <button
                    className="danger"
                    onClick={() => handleDelete(article.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ManageArticlesPage;
