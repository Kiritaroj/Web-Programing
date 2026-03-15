import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";

function AboutPage() {
  return (
    <div className="page-stack">
      <PageHeader
        section="About"
        title="About the Project"
        description="This route explains how the React frontend, Express API, and new white/red interface fit together."
        actions={
          <Link className="button button-secondary" to="/manage">
            Open Management
          </Link>
        }
      />

      <div className="metric-grid">
        <StatCard
          label="Primary routes"
          value="7"
          detail="Home, Articles, Categories, Search, Tags, Manage, and About."
        />
        <StatCard
          label="Detail views"
          value="2"
          detail="Dedicated pages for article and category detail routes."
        />
        <StatCard
          label="Core stack"
          value="3"
          detail="React, React Router, and Express power the project."
        />
        <StatCard
          label="CRUD actions"
          value="4"
          detail="Create, read, update, and delete are all exposed in the UI."
        />
      </div>

      <div className="about-grid">
        <section className="surface-card section-block">
          <div className="section-heading-copy">
            <p className="section-heading-kicker">Overview</p>
            <h2>What this project includes</h2>
          </div>

          <div className="feature-list">
            <article className="feature-item">
              <h3>Route-specific page design</h3>
              <p className="muted">
                Each page now matches its job: article grid, grouped categories, search workspace, tag browser, and management view.
              </p>
            </article>
            <article className="feature-item">
              <h3>Live API-driven content</h3>
              <p className="muted">
                The screens render real categories, tags, and article entries from the Express backend rather than placeholder text.
              </p>
            </article>
            <article className="feature-item">
              <h3>Modernized white/red UI system</h3>
              <p className="muted">
                The styling translates the approved HWR-inspired mockup direction into the running React application.
              </p>
            </article>
          </div>
        </section>

        <section className="surface-card section-block">
          <div className="section-heading-copy">
            <p className="section-heading-kicker">Route map</p>
            <h2>How the app is organized</h2>
          </div>

          <ul className="route-list">
            <li className="route-item">
              <strong>/</strong>
              <span>Home dashboard with featured collections and quick access.</span>
            </li>
            <li className="route-item">
              <strong>/articles</strong>
              <span>Searchable article index with card grid and sort controls.</span>
            </li>
            <li className="route-item">
              <strong>/categories</strong>
              <span>Grouped category collections that route into topic pages.</span>
            </li>
            <li className="route-item">
              <strong>/search</strong>
              <span>Search-first view with recent and popular search shortcuts.</span>
            </li>
            <li className="route-item">
              <strong>/tags</strong>
              <span>Filterable tag cloud and related content grid.</span>
            </li>
            <li className="route-item">
              <strong>/manage</strong>
              <span>Article creation, editing, deletion, and inventory table.</span>
            </li>
          </ul>
        </section>
      </div>

      <section className="surface-card section-block">
        <div className="section-heading-copy">
          <p className="section-heading-kicker">Implementation notes</p>
          <h2>Frontend and backend responsibilities</h2>
        </div>
        <ul className="detail-list">
          <li>The React frontend owns layout, filtering, route transitions, and local UI state such as the selected tag or recent searches.</li>
          <li>The Express backend serves seeded article data, category lists, tag lists, and CRUD endpoints under the shared <code>/api</code> base URL.</li>
          <li>The management page keeps the live API contract visible by editing title, content, category, and comma-separated tags in the same shape the backend expects.</li>
        </ul>
      </section>
    </div>
  );
}

export default AboutPage;
