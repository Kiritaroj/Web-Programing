import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../services/api";
import LoadingState from "../components/LoadingState";

function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getCategories()
      .then(setCategories)
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
      <h2>Categories</h2>
      <ul className="list">
        {categories.map((category) => (
          <li key={category}>
            <Link to={`/categories/${encodeURIComponent(category)}`}>{category}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CategoriesPage;
