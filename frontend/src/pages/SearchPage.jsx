import { useState } from "react";
import { getArticles } from "../services/api";
import ArticleCard from "../components/ArticleCard";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSearch(event) {
    event.preventDefault();
    setError("");
    setHasSearched(true);

    try {
      const data = await getArticles(query);
      setResults(data);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section>
      <h2>Search Articles</h2>
      <form className="inline-form" onSubmit={handleSearch}>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by title"
        />
        <button type="submit">Search</button>
      </form>

      {error && <p className="error">Error: {error}</p>}
      {hasSearched && !error && results.length === 0 && <p>No matching articles found.</p>}

      <div className="card-grid">
        {results.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}

export default SearchPage;
