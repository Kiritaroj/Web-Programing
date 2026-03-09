import { useEffect, useState } from "react";
import { getStats } from "../services/api";
import LoadingState from "../components/LoadingState";

function HomePage() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getStats()
      .then(setStats)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <p className="error">Error: {error}</p>;
  }

  if (!stats) {
    return <LoadingState />;
  }

  return (
    <section>
      <h2>Welcome</h2>
      <p>This SPA helps students find and manage common university knowledge.</p>
      <div className="stats-grid">
        <div className="card">
          <h3>{stats.articleCount}</h3>
          <p>Total Articles</p>
        </div>
        <div className="card">
          <h3>{stats.categoryCount}</h3>
          <p>Total Categories</p>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
