function QuoteCard({ quote, loading, error, fadeKey, isLiked, toggleLike }) {
  return (
    <div className="card-wrap">
      <div className="card-shadow" />
      <div className="card">

        {/* Loading */}
        {loading && (
          <div className="loading-state">
            <div className="loading-dots">
              <span />
              <span />
              <span />
            </div>
            <p className="loading-label">Claude is thinking...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="error-state">
            <p className="error-icon">✦</p>
            <p className="error-msg">{error}</p>
          </div>
        )}

        {/* Quote */}
        {!loading && !error && quote && (
          <div className="card-content" key={fadeKey}>
            <span className="quote-mark">"</span>
            <p className="quote-text">{quote.q}</p>
            <div className="author-row">
              <div className="author-line" />
              <span className="author">{quote.a || "Unknown"}</span>
              <div className="author-line" />
            </div>
            <div className="card-actions">
              <button
                className={`like-btn ${isLiked ? "liked" : ""}`}
                onClick={toggleLike}
              >
                <span className="heart">{isLiked ? "♥" : "♡"}</span>
                {isLiked ? "Saved" : "Save"}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default QuoteCard;