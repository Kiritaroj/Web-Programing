import { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ArticlesPage from "./pages/ArticlesPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryDetailPage from "./pages/CategoryDetailPage";
import SearchPage from "./pages/SearchPage";
import TagsPage from "./pages/TagsPage";
import ManageArticlesPage from "./pages/ManageArticlesPage";
import AboutPage from "./pages/AboutPage";

const primaryNav = [
  { to: "/", label: "Home", end: true },
  { to: "/articles", label: "Articles" },
  { to: "/categories", label: "Categories" },
  { to: "/search", label: "Search" },
  { to: "/tags", label: "Tags" },
  { to: "/manage", label: "Manage" }
];

function App() {
  const [isSidebarMenuOpen, setSidebarMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSidebarMenuOpen(false);
  }, [location.pathname]);

  function toggleSidebarMenu() {
    setSidebarMenuOpen((current) => !current);
  }

  function openSidebarMenu() {
    setSidebarMenuOpen(true);
  }

  function closeSidebarMenu() {
    setSidebarMenuOpen(false);
  }

  function handleBrandKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleSidebarMenu();
    }

    if (event.key === "Escape") {
      closeSidebarMenu();
    }
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div
          className={isSidebarMenuOpen ? "sidebar-head menu-open" : "sidebar-head"}
          onMouseLeave={closeSidebarMenu}
        >
          <div
            aria-controls="sidebar-menu"
            aria-expanded={isSidebarMenuOpen}
            className="brand-block"
            onClick={toggleSidebarMenu}
            onFocus={openSidebarMenu}
            onKeyDown={handleBrandKeyDown}
            onMouseEnter={openSidebarMenu}
            role="button"
            tabIndex={0}
          >
            <div className="brand-mark">U</div>
            <div>
              <p className="brand-kicker">HWR BERLIN</p>
              <h1>Student Knowledge Base</h1>
            </div>
          </div>

          <div className="sidebar-menu" id="sidebar-menu">
            <nav className="sidebar-nav" aria-label="Primary">
              {primaryNav.map((item) => (
                <NavLink
                  key={item.to}
                  className="nav-link"
                  end={item.end}
                  onClick={closeSidebarMenu}
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="sidebar-footer">
              <p className="sidebar-note">
                Browse university guidance, filter by topic, and manage live article entries.
              </p>
              <NavLink
                className="nav-link nav-link-secondary"
                onClick={closeSidebarMenu}
                to="/about"
              >
                About
              </NavLink>
            </div>
          </div>
        </div>
      </aside>

      <div className="app-main">
        <header className="topbar">
          <Link className="topbar-search" to="/search">
            Search articles, tags, categories...
          </Link>
          <div className="topbar-actions">
            <Link className="button button-secondary" to="/articles">
              View Articles
            </Link>
            <Link className="button" to="/manage">
              New Article
            </Link>
          </div>
        </header>

        <main className="page-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/articles/:id" element={<ArticleDetailPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/:categoryName" element={<CategoryDetailPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/tags" element={<TagsPage />} />
            <Route path="/manage" element={<ManageArticlesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route
              path="*"
              element={
                <section className="surface-card">
                  <h2>Page not found</h2>
                  <p className="muted">
                    The requested route does not exist in this knowledge base.
                  </p>
                </section>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
