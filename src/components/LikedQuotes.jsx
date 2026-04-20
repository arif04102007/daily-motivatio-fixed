function LikedQuotes({ likedQuotes, removeLike }) {
  return (
    <section className="collection">
      <div className="collection-header">
        <h2 className="collection-title">Your Collection</h2>
        <span className="collection-count">
          {likedQuotes.length} {likedQuotes.length === 1 ? "quote" : "quotes"}
        </span>
      </div>

      {likedQuotes.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">✦</span>
          <p>No saved quotes yet. Save a quote to begin your collection.</p>
        </div>
      ) : (
        <div className="collection-list">
          {likedQuotes.map((item, i) => (
            <div className="collection-item" key={i}>
              <div>
                <p className="col-quote">"{item.q}"</p>
                <p className="col-author">— {item.a || "Unknown"}</p>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeLike(item.q)}
                title="Remove"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default LikedQuotes;