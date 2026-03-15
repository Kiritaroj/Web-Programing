function LoadingState({ label = "Loading content" }) {
  return (
    <div className="loading-card" role="status" aria-live="polite">
      <span className="loading-dot" />
      <p className="muted">{label}...</p>
    </div>
  );
}

export default LoadingState;
