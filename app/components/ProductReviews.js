'use client';
import { useState, useEffect } from 'react';

const SHEET_API_URL = process.env.NEXT_PUBLIC_SHEET_API_URL || '';

const STARS = [1, 2, 3, 4, 5];

function StarRating({ value, onChange, readOnly = false, size = 'md' }) {
  const [hover, setHover] = useState(0);
  return (
    <span className={`stars stars--${size}${readOnly ? ' stars--ro' : ''}`}>
      {STARS.map(n => (
        <span
          key={n}
          className={`star${(hover || value) >= n ? ' star--on' : ''}`}
          onClick={() => !readOnly && onChange?.(n)}
          onMouseEnter={() => !readOnly && setHover(n)}
          onMouseLeave={() => !readOnly && setHover(0)}
          role={readOnly ? undefined : 'button'}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
        >★</span>
      ))}
      <style jsx>{`
        .stars { display: inline-flex; gap: 2px; }
        .stars--sm .star { font-size: 0.75rem; }
        .stars--md .star { font-size: 1.1rem; }
        .stars--lg .star { font-size: 1.4rem; }
        .star { color: rgba(201,168,76,0.2); transition: color 0.15s; cursor: default; }
        .stars:not(.stars--ro) .star { cursor: pointer; }
        .star--on { color: #E8C96A; }
      `}</style>
    </span>
  );
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-NG', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

function avgRating(reviews) {
  if (!reviews.length) return 0;
  return reviews.reduce((s, r) => s + Number(r.rating), 0) / reviews.length;
}

export default function ProductReviews({ productId }) {
  const [reviews, setReviews]     = useState([]);
  const [likes, setLikes]         = useState(0);
  const [liked, setLiked]         = useState(false);
  const [loading, setLoading]     = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [error, setError]         = useState(null);
  const [success, setSuccess]     = useState(false);

  // Form state
  const [name, setName]       = useState('');
  const [rating, setRating]   = useState(0);
  const [body, setBody]       = useState('');
  const [formError, setFormError] = useState('');

  // Load reviews + likes
  useEffect(() => {
    if (!SHEET_API_URL) { setLoading(false); return; }
    setLoading(true);
    fetch(`${SHEET_API_URL}?action=getReviews&productId=${productId}`)
      .then(r => r.json())
      .then(d => {
        setReviews(d?.reviews ?? []);
        setLikes(Number(d?.likes ?? 0));
        // Persist like state in localStorage per product
        const likedKey = `liked_${productId}`;
        setLiked(localStorage.getItem(likedKey) === '1');
      })
      .catch(() => setError('Could not load reviews.'))
      .finally(() => setLoading(false));
  }, [productId]);

  async function handleLike() {
    if (liked || likeLoading || !SHEET_API_URL) return;
    setLikeLoading(true);
    try {
      await fetch(`${SHEET_API_URL}?action=likeProduct&productId=${productId}`, { method: 'POST' });
      setLikes(l => l + 1);
      setLiked(true);
      localStorage.setItem(`liked_${productId}`, '1');
    } catch {
      // silent fail — optimistic UI already set
    } finally {
      setLikeLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError('');
    if (!name.trim()) return setFormError('Please enter your name.');
    if (!rating)      return setFormError('Please choose a star rating.');
    if (body.trim().length < 10) return setFormError('Review must be at least 10 characters.');
    if (!SHEET_API_URL) return setFormError('API not configured.');

    setSubmitting(true);
    try {
      const payload = {
        action:    'submitReview',
        productId: String(productId),
        name:      name.trim(),
        rating:    String(rating),
        body:      body.trim(),
        date:      new Date().toISOString(),
      };
      const res = await fetch(SHEET_API_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });
      const data = await res.json();
      if (data?.success === false) throw new Error(data.message);

      // Optimistically prepend
      setReviews(prev => [
        { name: name.trim(), rating, body: body.trim(), date: new Date().toISOString() },
        ...prev,
      ]);
      setSuccess(true);
      setName(''); setRating(0); setBody('');
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      setFormError(err.message || 'Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const avg = avgRating(reviews);
  const dist = STARS.slice().reverse().map(s => ({
    star: s,
    count: reviews.filter(r => Number(r.rating) === s).length,
    pct: reviews.length ? Math.round((reviews.filter(r => Number(r.rating) === s).length / reviews.length) * 100) : 0,
  }));

  return (
    <div className="rv">
      {/* ── Like button ── */}
      <div className="rv__like-row">
        <button
          className={`rv__like-btn${liked ? ' rv__like-btn--active' : ''}`}
          onClick={handleLike}
          disabled={liked || likeLoading}
          aria-label="Like this product"
        >
          <span className="rv__like-heart">{liked ? '♥' : '♡'}</span>
          <span>{likes} {likes === 1 ? 'like' : 'likes'}</span>
        </button>
      </div>

      {/* ── Rating summary ── */}
      {reviews.length > 0 && (
        <div className="rv__summary">
          <div className="rv__big-score">
            <span className="rv__score-num">{avg.toFixed(1)}</span>
            <StarRating value={Math.round(avg)} readOnly size="md" />
            <span className="rv__count">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="rv__dist">
            {dist.map(d => (
              <div key={d.star} className="rv__dist-row">
                <span className="rv__dist-label">{d.star}★</span>
                <div className="rv__dist-bar">
                  <div className="rv__dist-fill" style={{ width: `${d.pct}%` }} />
                </div>
                <span className="rv__dist-pct">{d.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Review list ── */}
      {loading ? (
        <p className="rv__loading">Loading reviews…</p>
      ) : error ? (
        <p className="rv__error">⚠ {error}</p>
      ) : reviews.length === 0 ? (
        <p className="rv__empty">No reviews yet — be the first!</p>
      ) : (
        <div className="rv__list">
          {reviews.map((r, i) => (
            <div key={i} className="rv__item">
              <div className="rv__item-header">
                <span className="rv__avatar">{r.name?.[0]?.toUpperCase() ?? '?'}</span>
                <div>
                  <span className="rv__item-name">{r.name}</span>
                  <StarRating value={Number(r.rating)} readOnly size="sm" />
                </div>
                <span className="rv__item-date">{r.date ? formatDate(r.date) : ''}</span>
              </div>
              <p className="rv__item-body">{r.body}</p>
            </div>
          ))}
        </div>
      )}

      {/* ── Submit form ── */}
      <div className="rv__form-wrap">
        <h4 className="rv__form-title">Leave a Review</h4>

        {success && <p className="rv__form-success">✓ Thank you! Your review has been submitted.</p>}

        <div className="rv__form">
          <div className="rv__field">
            <label className="rv__label">Your name</label>
            <input
              className="rv__input"
              type="text"
              placeholder="e.g. Adaeze O."
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={60}
            />
          </div>

          <div className="rv__field">
            <label className="rv__label">Rating</label>
            <StarRating value={rating} onChange={setRating} size="lg" />
          </div>

          <div className="rv__field">
            <label className="rv__label">Your review</label>
            <textarea
              className="rv__textarea"
              placeholder="Share what you love about this product…"
              value={body}
              onChange={e => setBody(e.target.value)}
              rows={3}
              maxLength={500}
            />
            <span className="rv__char">{body.length}/500</span>
          </div>

          {formError && <p className="rv__form-error">⚠ {formError}</p>}

          <button
            className="rv__submit"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? 'Submitting…' : 'Submit Review'}
          </button>
        </div>
      </div>

      <style jsx>{`
        .rv { display: flex; flex-direction: column; gap: 1.4rem; }

        /* Like */
        .rv__like-row { display: flex; align-items: center; }
        .rv__like-btn {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(232,99,122,0.08);
          border: 1px solid rgba(232,99,122,0.25);
          border-radius: 30px;
          padding: 8px 18px;
          color: rgba(232,99,122,0.7);
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.5px;
          cursor: pointer; transition: all 0.2s;
        }
        .rv__like-btn:hover:not(:disabled) {
          background: rgba(232,99,122,0.18);
          border-color: rgba(232,99,122,0.5);
          color: #e8637a;
        }
        .rv__like-btn--active {
          background: rgba(232,99,122,0.18) !important;
          border-color: rgba(232,99,122,0.5) !important;
          color: #e8637a !important;
          cursor: default;
        }
        .rv__like-heart { font-size: 1rem; }

        /* Summary */
        .rv__summary {
          display: flex; gap: 1.5rem; align-items: flex-start;
          padding: 1rem 1.2rem;
          background: rgba(201,168,76,0.04);
          border: 1px solid rgba(201,168,76,0.12);
          border-radius: 10px;
        }
        .rv__big-score {
          display: flex; flex-direction: column;
          align-items: center; gap: 4px; min-width: 70px;
        }
        .rv__score-num {
          font-family: Georgia, serif;
          font-size: 2.4rem; font-weight: 700;
          color: #E8C96A; line-height: 1;
        }
        .rv__count {
          font-size: 0.6rem; color: rgba(245,240,235,0.4);
          text-align: center; margin-top: 2px;
        }
        .rv__dist { flex: 1; display: flex; flex-direction: column; gap: 5px; }
        .rv__dist-row { display: flex; align-items: center; gap: 8px; }
        .rv__dist-label { font-size: 0.62rem; color: rgba(245,240,235,0.5); width: 18px; text-align: right; }
        .rv__dist-bar {
          flex: 1; height: 5px; background: rgba(201,168,76,0.1); border-radius: 3px; overflow: hidden;
        }
        .rv__dist-fill { height: 100%; background: #C9A84C; border-radius: 3px; transition: width 0.5s ease; }
        .rv__dist-pct { font-size: 0.6rem; color: rgba(245,240,235,0.35); width: 14px; }

        /* List */
        .rv__list { display: flex; flex-direction: column; gap: 1rem; }
        .rv__item {
          padding: 1rem 1.2rem;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(201,168,76,0.08);
          border-radius: 8px;
          display: flex; flex-direction: column; gap: 0.5rem;
        }
        .rv__item-header {
          display: flex; align-items: center; gap: 10px;
        }
        .rv__avatar {
          width: 32px; height: 32px; border-radius: 50%;
          background: linear-gradient(135deg, #3E0F6B, #C9A84C);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem; font-weight: 700; color: #fff;
          flex-shrink: 0;
        }
        .rv__item-name {
          display: block;
          font-size: 0.75rem; font-weight: 700; color: #f5f0eb;
        }
        .rv__item-date {
          margin-left: auto;
          font-size: 0.6rem; color: rgba(245,240,235,0.3);
        }
        .rv__item-body {
          font-size: 0.78rem; color: rgba(245,240,235,0.6); line-height: 1.7;
        }

        /* States */
        .rv__loading, .rv__empty {
          font-size: 0.78rem; color: rgba(245,240,235,0.35);
          text-align: center; padding: 1.5rem 0;
        }
        .rv__error { font-size: 0.78rem; color: #d4823a; }

        /* Form */
        .rv__form-wrap {
          border-top: 1px solid rgba(201,168,76,0.1);
          padding-top: 1.4rem;
          display: flex; flex-direction: column; gap: 0.85rem;
        }
        .rv__form-title {
          font-family: Georgia, serif;
          font-size: 0.95rem; font-weight: 700;
          color: #f5f0eb;
        }
        .rv__form { display: flex; flex-direction: column; gap: 0.85rem; }
        .rv__field { display: flex; flex-direction: column; gap: 5px; }
        .rv__label {
          font-size: 0.62rem; font-weight: 700;
          letter-spacing: 1.5px; text-transform: uppercase;
          color: rgba(201,168,76,0.7);
        }
        .rv__input, .rv__textarea {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(201,168,76,0.15);
          border-radius: 6px;
          padding: 9px 12px;
          color: #f5f0eb;
          font-size: 0.8rem;
          font-family: inherit;
          transition: border-color 0.2s;
          resize: vertical;
        }
        .rv__input:focus, .rv__textarea:focus {
          outline: none;
          border-color: rgba(201,168,76,0.45);
          background: rgba(255,255,255,0.06);
        }
        .rv__input::placeholder, .rv__textarea::placeholder {
          color: rgba(245,240,235,0.2);
        }
        .rv__char {
          font-size: 0.58rem; color: rgba(245,240,235,0.25);
          text-align: right;
        }
        .rv__form-error { font-size: 0.72rem; color: #d4823a; }
        .rv__form-success {
          font-size: 0.72rem; color: #7eeaaa;
          background: rgba(30,122,72,0.15);
          border: 1px solid rgba(30,122,72,0.3);
          border-radius: 6px; padding: 8px 12px;
        }
        .rv__submit {
          align-self: flex-start;
          background: linear-gradient(135deg, #3E0F6B, #6B2FA0);
          border: 1px solid rgba(201,168,76,0.25);
          border-radius: 6px;
          padding: 10px 22px;
          color: #E8C96A;
          font-size: 0.68rem; font-weight: 800;
          letter-spacing: 1.5px; text-transform: uppercase;
          cursor: pointer; transition: all 0.25s;
        }
        .rv__submit:hover:not(:disabled) {
          background: linear-gradient(135deg, #5C1F96, #9B4FC8);
          box-shadow: 0 6px 20px rgba(62,15,107,0.4);
        }
        .rv__submit:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>
    </div>
  );
}