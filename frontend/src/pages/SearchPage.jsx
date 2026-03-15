import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import LoadingState from "../components/LoadingState";
import PageHeader from "../components/PageHeader";
import { INITIAL_RECENT_SEARCHES, POPULAR_SEARCHES } from "../contentLibrary";
import { getArticles } from "../services/api";

function SearchPage() {
  const [allArticles, setAllArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState(INITIAL_RECENT_SEARCHES);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    async function loadSearchPage() {
      try {
        const data = await getArticles();
        setAllArticles(data);
        setResults(data.slice(0, 3));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadSearchPage();
  }, []);

  async function runSearch(term) {
    const normalized = term.trim();

    if (!normalized) {
      setHasSearched(false);
      setResults(allArticles.slice(0, 3));
      return;
    }

    setError("");
    setHasSearched(true);
    setSearching(true);

    try {
      const data = await getArticles(normalized);
      setResults(data);
      setRecentSearches((previous) => [
        normalized,
        ...previous.filter((item) => item !== normalized)
      ].slice(0, 5));
    } catch (err) {
      setError(err.message);
    } finally {
      setSearching(false);
    }
  }

  function handleSearch(event) {
    event.preventDefault();
    runSearch(query);
  }

  function handleQuickSearch(term) {
    setQuery(term);
    runSearch(term);
  }

  if (loading) {
    return <LoadingState label="Loading search workspace" />;
  }

  const displayedArticles = hasSearched ? results : allArticles.slice(0, 3);

  return (
    <div className="page-stack">
      <PageHeader
        section="Search"
        title="Search Articles"
        description="The live search route now prioritizes the input field, recent terms, popular searches, and result previews instead of reusing the home page structure."
        actions={
          <Link className="button button-secondary" to="/articles">
            Browse All Articles
          </Link>
        }
      />

      <section className="search-hero">
        <p className="section-heading-kicker">Search workspace</p>
        <h2>Find an article by title.</h2>
        <p className="muted">
          This route calls the live title filter exposed by <code>/api/articles?title=...</code> and keeps recent searches close at hand.
        </p>

        <form className="hero-search-form" onSubmit={handleSearch}>
          <label className="hero-search-input">
            <input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by article title"
              value={query}
            />
          </label>
          <button type="submit">{searching ? "Searching..." : "Search"}</button>
        </form>
      </section>

      <div className="search-panels">
        <section className="surface-card section-block">
          <div className="section-heading-copy">
            <p className="section-heading-kicker">Recent terms</p>
            <h2>Continue a previous search</h2>
            <p>Searches entered on this page are tracked locally to mimic a real knowledge base workflow.</p>
          </div>

          <div className="panel-list">
            {recentSearches.map((term) => (
              <button
                className="search-shortcut"
                key={term}
                onClick={() => handleQuickSearch(term)}
                type="button"
              >
                <span>{term}</span>
                <span>Run search</span>
              </button>
            ))}
          </div>

          <div className="section-heading-copy">
            <p className="section-heading-kicker">Popular searches</p>
            <h2>Jump-start common tasks</h2>
          </div>
          <div className="chip-list">
            {POPULAR_SEARCHES.map((term) => (
              <button
                className="chip-button"
                key={term}
                onClick={() => handleQuickSearch(term)}
                type="button"
              >
                {term}
              </button>
            ))}
          </div>
        </section>

        <section className="surface-card section-block">
          <div className="section-heading">
            <div className="section-heading-copy">
              <p className="section-heading-kicker">
                {hasSearched ? "Search results" : "Popular starting points"}
              </p>
              <h2>
                {hasSearched ? `Results for "${query}"` : "Recommended articles"}
              </h2>
              <p>
                {hasSearched
                  ? "Matching articles returned by the API."
                  : "Before a search runs, the page highlights a small set of useful articles."}
              </p>
            </div>
          </div>

          {error ? <div className="banner error-banner">Error: {error}</div> : null}

          {hasSearched && !error && results.length === 0 ? (
            <div className="empty-state">
              <h2>No matching articles found.</h2>
              <p>Try a broader title fragment such as library, semester, or wifi.</p>
            </div>
          ) : (
            <div className="article-grid">
              {displayedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default SearchPage;
