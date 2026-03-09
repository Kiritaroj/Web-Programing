import { NavLink, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ArticlesPage from "./pages/ArticlesPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryDetailPage from "./pages/CategoryDetailPage";
import SearchPage from "./pages/SearchPage";
import TagsPage from "./pages/TagsPage";
import ManageArticlesPage from "./pages/ManageArticlesPage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <div className="app-shell">
      <header className="header">
        <h1>University Knowledge Base</h1>
        <p>Simple FAQ and article management platform</p>
      </header>

      <nav className="nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/articles">Articles</NavLink>
        <NavLink to="/categories">Categories</NavLink>
        <NavLink to="/search">Search</NavLink>
        <NavLink to="/tags">Tags</NavLink>
        <NavLink to="/manage">Manage</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>

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
          <Route path="*" element={<p>Page not found.</p>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
