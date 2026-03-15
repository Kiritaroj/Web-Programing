function PageHeader({ section, title, description, actions }) {
  return (
    <header className="page-header">
      <p className="page-breadcrumb">
        HWR Berlin Knowledge Base <span>/</span> {section}
      </p>
      <div className="page-header-row">
        <div className="page-header-copy">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        {actions ? <div className="page-header-actions">{actions}</div> : null}
      </div>
    </header>
  );
}

export default PageHeader;
