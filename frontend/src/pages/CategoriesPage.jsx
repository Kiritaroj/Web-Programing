import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingState from "../components/LoadingState";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import { CATEGORY_GROUPS } from "../contentLibrary";
import { getArticles, getCategories } from "../services/api";

function CategoriesPage() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCategoriesPage() {
      try {
        const [categoriesData, articlesData] = await Promise.all([
          getCategories(),
          getArticles()
        ]);

        setCategories(categoriesData);
        setArticles(articlesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadCategoriesPage();
  }, []);

  if (loading) {
    return <LoadingState label="Loading categories" />;
  }

  if (error) {
    return <div className="banner error-banner">Error: {error}</div>;
  }

  const groupedCategories = CATEGORY_GROUPS.map((group) => ({
    ...group,
    categories: group.categories.filter((category) => categories.includes(category))
  })).filter((group) => group.categories.length > 0);

  const mappedCategories = groupedCategories.flatMap((group) => group.categories);
  const remainingCategories = categories.filter((category) => !mappedCategories.includes(category));

  return (
    <div className="page-stack">
      <PageHeader
        section="Categories"
        title="Categories"
        description="The categories view is organized like a help center index, with grouped sections, route metadata, and example content from each category."
        actions={
          <Link className="button button-secondary" to="/articles">
            View Article Grid
          </Link>
        }
      />

      <div className="metric-grid">
        <StatCard
          label="Category routes"
          value={categories.length}
          detail="Every category has a dedicated detail page."
        />
        <StatCard
          label="Grouped sections"
          value={groupedCategories.length}
          detail="Structured to feel like a modern knowledge-center overview."
        />
        <StatCard
          label="Mapped articles"
          value={articles.length}
          detail="Each category card points to real article entries."
        />
        <StatCard
          label="Unmapped groups"
          value={remainingCategories.length}
          detail="Additional categories not yet assigned to a predefined group."
        />
      </div>

      <div className="category-groups">
        {groupedCategories.map((group) => (
          <section className="category-group" key={group.title}>
            <div className="section-heading">
              <div className="section-heading-copy">
                <p className="section-heading-kicker">Grouped collection</p>
                <h2>{group.title}</h2>
                <p>{group.description}</p>
              </div>
            </div>

            <div className="category-group-grid">
              {group.categories.map((category) => {
                const categoryArticles = articles.filter((article) => article.category === category);
                const featuredArticle = categoryArticles[0];

                return (
                  <article className="category-card" key={category}>
                    <div className="category-card-header">
                      <div>
                        <h3>{category}</h3>
                        <p className="category-card-route">
                          /categories/{encodeURIComponent(category)}
                        </p>
                      </div>
                      <span className="count-pill">{categoryArticles.length} articles</span>
                    </div>

                    <p className="category-card-copy">
                      {featuredArticle
                        ? `Featured entry: ${featuredArticle.title}`
                        : "Open the route to create the first article for this category."}
                    </p>

                    <div className="tag-list">
                      {(featuredArticle?.tags ?? []).slice(0, 3).map((tag) => (
                        <span className="tag" key={tag}>
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="category-card-footer">
                      <Link className="button button-secondary" to={`/categories/${encodeURIComponent(category)}`}>
                        Open Category
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}

        {remainingCategories.length > 0 ? (
          <section className="category-group">
            <div className="section-heading">
              <div className="section-heading-copy">
                <p className="section-heading-kicker">Additional routes</p>
                <h2>More categories</h2>
                <p>These categories exist in the API but are not part of the grouped landing structure yet.</p>
              </div>
            </div>

            <div className="category-group-grid">
              {remainingCategories.map((category) => (
                <article className="category-card" key={category}>
                  <div className="category-card-header">
                    <div>
                      <h3>{category}</h3>
                      <p className="category-card-route">
                        /categories/{encodeURIComponent(category)}
                      </p>
                    </div>
                  </div>
                  <Link className="button button-secondary" to={`/categories/${encodeURIComponent(category)}`}>
                    Open Category
                  </Link>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}

export default CategoriesPage;
