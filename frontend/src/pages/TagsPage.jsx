import { useEffect, useState } from "react";
import { getTags } from "../services/api";
import LoadingState from "../components/LoadingState";

function TagsPage() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getTags()
      .then(setTags)
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
      <h2>All Tags</h2>
      <div className="tag-list">
        {tags.map((tag) => (
          <span key={tag} className="tag">
            #{tag}
          </span>
        ))}
      </div>
    </section>
  );
}

export default TagsPage;
