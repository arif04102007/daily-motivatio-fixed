import { useState, useEffect, useCallback } from "react";
import QuoteCard from "./components/Quotecard";
import LikedQuotes from "./components/LikedQuotes";
import "./App.css";

async function fetchQuote() {
  // Try ZenQuotes via free CORS proxy (no API key needed)
  try {
    const res = await fetch(
      "https://api.allorigins.win/get?url=" +
        encodeURIComponent("https://zenquotes.io/api/random")
    );
    const data = await res.json();
    const contents =
      typeof data.contents === "string"
        ? JSON.parse(data.contents)
        : data.contents;
    if (contents?.[0]?.q) {
      return { q: contents[0].q, a: contents[0].a };
    }
  } catch (_) {}

  // Fallback: Try quotable.io (also free, no key)
  try {
    const res = await fetch("https://api.quotable.io/random");
    const data = await res.json();
    if (data?.content) {
      return { q: data.content, a: data.author };
    }
  } catch (_) {}

  // Last resort: built-in quotes so app never breaks
  const fallback = [
    { q: "The only way to do great work is to love what you do.", a: "Steve Jobs" },
    { q: "In the middle of every difficulty lies opportunity.", a: "Albert Einstein" },
    { q: "It does not matter how slowly you go as long as you do not stop.", a: "Confucius" },
    { q: "Life is what happens when you're busy making other plans.", a: "John Lennon" },
    { q: "The future belongs to those who believe in the beauty of their dreams.", a: "Eleanor Roosevelt" },
    { q: "Spread love everywhere you go. Let no one ever come to you without leaving happier.", a: "Mother Teresa" },
    { q: "When you reach the end of your rope, tie a knot in it and hang on.", a: "Franklin D. Roosevelt" },
    { q: "Do not go where the path may lead, go instead where there is no path and leave a trail.", a: "Ralph Waldo Emerson" },
    { q: "You will face many defeats in life, but never let yourself be defeated.", a: "Maya Angelou" },
    { q: "The purpose of our lives is to be happy.", a: "Dalai Lama" },
  ];
  return fallback[Math.floor(Math.random() * fallback.length)];
}

function App() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCollection, setShowCollection] = useState(false);
  const [fadeKey, setFadeKey] = useState(0);

  const [likedQuotes, setLikedQuotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("motivation_likes") || "[]");
    } catch {
      return [];
    }
  });

  const loadQuote = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchQuote();
      setQuote(result);
      setFadeKey((k) => k + 1);
    } catch (err) {
      setError("Could not load quote. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadQuote();
  }, []);

  const isLiked = quote ? likedQuotes.some((l) => l.q === quote.q) : false;

  const toggleLike = () => {
    if (!quote) return;
    const updated = isLiked
      ? likedQuotes.filter((l) => l.q !== quote.q)
      : [...likedQuotes, quote];
    setLikedQuotes(updated);
    localStorage.setItem("motivation_likes", JSON.stringify(updated));
  };

  const removeLike = (q) => {
    const updated = likedQuotes.filter((l) => l.q !== q);
    setLikedQuotes(updated);
    localStorage.setItem("motivation_likes", JSON.stringify(updated));
  };

  return (
    <div className="page">
      <header className="header">
        <p className="eyebrow">✦ Mindful Moments</p>
        <h1 className="title">
          Daily <em>Motivation</em>
        </h1>
        <div className="divider" />
      </header>

      <main>
        <QuoteCard
          quote={quote}
          loading={loading}
          error={error}
          fadeKey={fadeKey}
          isLiked={isLiked}
          toggleLike={toggleLike}
        />

        <div className="btn-row">
          <button
            className="btn-primary"
            onClick={loadQuote}
            disabled={loading}
          >
            {loading ? "Loading..." : "New Quote"}
          </button>
          <button
            className="btn-ghost"
            onClick={() => setShowCollection((v) => !v)}
          >
            Collection
            {likedQuotes.length > 0 && (
              <em className="badge">{likedQuotes.length}</em>
            )}
          </button>
        </div>
      </main>

      {showCollection && (
        <LikedQuotes likedQuotes={likedQuotes} removeLike={removeLike} />
      )}

      <p className="footer-note">✦ Daily Motivation Dashboard ✦</p>
    </div>
  );
}

export default App;