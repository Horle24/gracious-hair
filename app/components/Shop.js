'use client';
import { useState, useEffect, useRef } from 'react';
import { products as fallbackProducts } from '../data/products';
import { useCart } from '../components/CartContext';
import QuickViewModal from '../components/QuickViewModal';

const SHEET_API_URL = process.env.NEXT_PUBLIC_SHEET_API_URL || '';

// Hero/thumbnail image per product (used on cards only)
const PRODUCT_IMAGES = {
  1: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&h=600&q=80&fit=crop',
  2: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=600&q=80&fit=crop&crop=top',
  3: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&h=600&q=80&fit=crop&crop=top',
  4: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&h=600&q=80&fit=crop&crop=top',
  5: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=600&h=600&q=80&fit=crop&crop=top',
  6: 'https://images.unsplash.com/photo-1618375531912-867984bdfd87?w=600&h=600&q=80&fit=crop&crop=top',
  7: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&q=80&fit=crop',
  8: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=600&q=80&fit=crop&crop=top',
};

const FILTER_META = [
  { key: 'all',       label: 'All Products', icon: '✦' },
  { key: 'extension', label: 'Extensions',   icon: '🌀' },
  { key: 'wig',       label: 'Wigs',         icon: '👑' },
  { key: 'accessory', label: 'Accessories',  icon: '📿' },
];

export default function Shop() {
  const [filter, setFilter]       = useState('all');
  const [added, setAdded]         = useState({});
  const [wishlist, setWishlist]   = useState({});
  const [quickView, setQuickView] = useState(null);
  const [products, setProducts]   = useState(fallbackProducts);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState(null);
  const { addToCart, setOpen }    = useCart();
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!SHEET_API_URL) return;
    setLoading(true);
    fetch(`${SHEET_API_URL}?action=getProducts`)
      .then(r => r.json())
      .then(d => { if (d?.products?.length) setProducts(d.products); setLoading(false); })
      .catch(() => { setError('Showing sample products.'); setLoading(false); });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.06 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [products]);

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setQuickView(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = quickView ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [quickView]);

  const visible = filter === 'all' ? products : products.filter(p => p.category === filter);

  function handleAdd(product, e) {
    e?.stopPropagation();
    if (!product.available) return;
    addToCart(product);
    setAdded(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAdded(prev => ({ ...prev, [product.id]: false })), 1600);
    setOpen(true);
  }

  function toggleWish(id, e) {
    e?.stopPropagation();
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));
  }

  const counts = {
    all:       products.length,
    extension: products.filter(p => p.category === 'extension').length,
    wig:       products.filter(p => p.category === 'wig').length,
    accessory: products.filter(p => p.category === 'accessory').length,
  };

  return (
    <section id="shop" className="shop" ref={sectionRef}>

      {/* ── Hero header band ── */}
      <div className="shop__hero">
        <div className="shop__hero-grain" />
        <div className="shop__hero-content">
          <span className="shop__hero-eyebrow reveal">✦ Premium Collection</span>
          <h2 className="shop__hero-title reveal">
            Shop <em>Extensions</em><br />& Accessories
          </h2>
          <p className="shop__hero-sub reveal">
            Handpicked premium hair — quality you can feel, beauty you can see.
          </p>
        </div>
        <div className="shop__hero-ring shop__hero-ring--1" />
        <div className="shop__hero-ring shop__hero-ring--2" />
      </div>

      {/* ── Filter tabs ── */}
      <div className="shop__filters-wrap">
        <div className="shop__filters reveal">
          {FILTER_META.map(f => (
            <button
              key={f.key}
              className={`shop__tab${filter === f.key ? ' shop__tab--active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              <span className="shop__tab-icon">{f.icon}</span>
              <span className="shop__tab-label">{f.label}</span>
              <span className="shop__tab-count">{counts[f.key]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Status ── */}
      {loading && (
        <div className="shop__status">
          <span className="shop__spinner" />
          <span>Loading products…</span>
        </div>
      )}
      {error && <p className="shop__error">⚠ {error}</p>}

      {/* ── Product grid ── */}
      <div className="shop__grid-wrap">
        <div className="shop__grid">
          {visible.map((p, i) => (
            <article
              className="pcard reveal"
              key={p.id}
              style={{ transitionDelay: `${i * 0.06}s` }}
              onClick={() => setQuickView(p)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && setQuickView(p)}
            >
              {/* Image */}
              <div className="pcard__img-wrap">
                <img
                  src={PRODUCT_IMAGES[p.id] || `https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=600&q=80&fit=crop`}
                  alt={p.name}
                  className="pcard__img"
                  loading="lazy"
                  onError={e => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="pcard__img-overlay" />

                <span className={`pcard__badge${!p.available ? ' pcard__badge--out' : ''}`}>
                  {p.available ? '● In Stock' : '○ Sold Out'}
                </span>

                <button
                  className={`pcard__wish${wishlist[p.id] ? ' pcard__wish--active' : ''}`}
                  onClick={e => toggleWish(p.id, e)}
                  aria-label="Add to wishlist"
                >
                  {wishlist[p.id] ? '♥' : '♡'}
                </button>

                <div className="pcard__hover-cta">
                  <span>Quick View</span>
                </div>
              </div>

              {/* Body */}
              <div className="pcard__body">
                <span className="pcard__cat">{p.category}</span>
                <h3 className="pcard__name">{p.name}</h3>
                <p className="pcard__desc">{p.desc}</p>

                <div className="pcard__footer">
                  <div className="pcard__pricing">
                    <span className="pcard__price">₦{p.price.toLocaleString()}</span>
                    {p.available && (
                      <span className="pcard__walink">WhatsApp to order</span>
                    )}
                  </div>
                  <button
                    className={`pcard__add${added[p.id] ? ' pcard__add--done' : ''}${!p.available ? ' pcard__add--disabled' : ''}`}
                    disabled={!p.available}
                    onClick={e => handleAdd(p, e)}
                    aria-label={`Add ${p.name} to cart`}
                  >
                    {!p.available
                      ? <span>Sold Out</span>
                      : added[p.id]
                        ? <span>✓ Added</span>
                        : <span>+ Cart</span>
                    }
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ── CTA Banner ── */}
      <div className="shop__cta-band reveal">
        <div className="shop__cta-inner">
          <div>
            <h3 className="shop__cta-title">Can't find what you're looking for?</h3>
            <p className="shop__cta-sub">Message us directly — we source any hair type for you.</p>
          </div>
          <a
            href="https://wa.me/2349025317070?text=Hello!%20I'm%20looking%20for%20a%20specific%20hair%20product."
            className="shop__cta-btn"
            target="_blank" rel="noopener noreferrer"
          >
            💬 Chat with Us
          </a>
        </div>
      </div>

      {/* ══ QUICK VIEW MODAL (new tabbed version) ══ */}
      {quickView && (
        <QuickViewModal
          product={quickView}
          added={!!added[quickView.id]}
          onAdd={e => handleAdd(quickView, e)}
          onClose={() => setQuickView(null)}
        />
      )}

      <style jsx>{`
        /* ════════════════════════════
           SECTION WRAPPER
        ════════════════════════════ */
        .shop { background: #0a0612; position: relative; }

        /* ════════════════════════════
           HERO HEADER
        ════════════════════════════ */
        .shop__hero {
          position: relative;
          padding: 90px 5% 70px;
          background: linear-gradient(150deg, #1a0535 0%, #3E0F6B 50%, #250845 100%);
          overflow: hidden; text-align: center;
        }
        .shop__hero-grain {
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
          opacity: 0.4; pointer-events: none;
        }
        .shop__hero-ring {
          position: absolute; border-radius: 50%;
          border: 1px solid rgba(201,168,76,0.1);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .shop__hero-ring--1 { width: 600px; height: 600px; }
        .shop__hero-ring--2 {
          width: 400px; height: 400px;
          border-style: dashed; border-color: rgba(201,168,76,0.06);
          animation: spin 30s linear infinite;
        }
        @keyframes spin { to { transform: translate(-50%,-50%) rotate(360deg); } }

        .shop__hero-content { position: relative; z-index: 2; max-width: 640px; margin: 0 auto; }
        .shop__hero-eyebrow {
          display: block; font-size: 0.6rem; font-weight: 700;
          letter-spacing: 5px; text-transform: uppercase;
          color: #C9A84C; margin-bottom: 1rem;
        }
        .shop__hero-title {
          font-family: var(--font-display, Georgia, serif);
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 900; color: #FFFDF7;
          line-height: 1.08; margin-bottom: 1rem;
        }
        .shop__hero-title em { color: #E8C96A; font-style: italic; }
        .shop__hero-sub {
          font-size: 0.88rem; color: rgba(255,253,247,0.55);
          line-height: 1.8;
          font-family: var(--font-accent, Georgia, serif);
          font-style: italic;
        }

        /* ════════════════════════════
           FILTER TABS
        ════════════════════════════ */
        .shop__filters-wrap {
          background: #0d0918;
          border-bottom: 1px solid rgba(201,168,76,0.1);
          padding: 0 5%; position: sticky; top: 70px; z-index: 50;
        }
        .shop__filters {
          display: flex; gap: 0; overflow-x: auto; scrollbar-width: none;
          max-width: 900px; margin: 0 auto;
        }
        .shop__filters::-webkit-scrollbar { display: none; }
        .shop__tab {
          display: flex; align-items: center; gap: 7px;
          padding: 1rem 1.5rem; background: none; border: none;
          border-bottom: 2px solid transparent; cursor: pointer; white-space: nowrap;
          transition: all 0.25s; color: rgba(255,253,247,0.4);
          font-family: var(--font-body, sans-serif); font-size: 0.7rem; font-weight: 500;
          letter-spacing: 1.5px; text-transform: uppercase;
        }
        .shop__tab:hover { color: rgba(255,253,247,0.75); }
        .shop__tab--active { color: #E8C96A; border-bottom-color: #C9A84C; }
        .shop__tab-icon { font-size: 0.85rem; }
        .shop__tab-count {
          background: rgba(201,168,76,0.15); color: #C9A84C;
          font-size: 0.58rem; font-weight: 700;
          padding: 2px 7px; border-radius: 10px; line-height: 1.4;
        }
        .shop__tab--active .shop__tab-count { background: rgba(201,168,76,0.25); }

        /* ════════════════════════════
           STATUS / LOADING
        ════════════════════════════ */
        .shop__status {
          display: flex; align-items: center; gap: 10px;
          justify-content: center; padding: 2rem;
          color: rgba(255,253,247,0.5); font-size: 0.82rem;
        }
        .shop__spinner {
          display: inline-block; width: 16px; height: 16px;
          border: 2px solid rgba(201,168,76,0.2); border-top-color: #C9A84C;
          border-radius: 50%; animation: spinIt 0.7s linear infinite;
        }
        @keyframes spinIt { to { transform: rotate(360deg); } }
        .shop__error {
          text-align: center; color: #d4823a; font-size: 0.78rem;
          padding: 12px 20px;
          background: rgba(212,130,58,0.08); border: 1px solid rgba(212,130,58,0.2);
          margin: 1rem 5%; border-radius: 4px;
        }

        /* ════════════════════════════
           PRODUCT GRID
        ════════════════════════════ */
        .shop__grid-wrap { padding: 3rem 5% 0; max-width: 1200px; margin: 0 auto; }
        .shop__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.6rem;
        }

        /* ════════════════════════════
           PRODUCT CARD
        ════════════════════════════ */
        .pcard {
          background: #100920;
          border: 1px solid rgba(201,168,76,0.12);
          border-radius: 12px; overflow: hidden; cursor: pointer;
          transition: transform 0.35s cubic-bezier(.25,.46,.45,.94),
                      box-shadow 0.35s ease, border-color 0.35s ease;
          position: relative;
        }
        .pcard:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.3);
          border-color: rgba(201,168,76,0.35);
        }
        .pcard:hover .pcard__hover-cta { opacity: 1; }
        .pcard:hover .pcard__img { transform: scale(1.06); }

        .pcard__img-wrap {
          position: relative; aspect-ratio: 1 / 1;
          overflow: hidden; background: #1a0f2a;
        }
        .pcard__img {
          width: 100%; height: 100%; object-fit: cover;
          object-position: center top; display: block;
          transition: transform 0.6s ease;
        }
        .pcard__img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, transparent 45%, rgba(10,6,18,0.85) 100%);
        }
        .pcard__badge {
          position: absolute; top: 12px; left: 12px;
          font-size: 0.55rem; font-weight: 700;
          letter-spacing: 1px; text-transform: uppercase;
          padding: 4px 10px; border-radius: 20px;
          background: rgba(201,168,76,0.9); color: #1a0f00;
          backdrop-filter: blur(4px);
        }
        .pcard__badge--out {
          background: rgba(30,20,45,0.85); color: rgba(255,253,247,0.5);
          border: 1px solid rgba(255,255,255,0.1);
        }
        .pcard__wish {
          position: absolute; top: 12px; right: 12px;
          width: 32px; height: 32px;
          background: rgba(10,6,18,0.7); border: 1px solid rgba(201,168,76,0.2);
          border-radius: 50%; color: rgba(255,253,247,0.5); font-size: 0.95rem;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: all 0.25s; backdrop-filter: blur(6px); line-height: 1;
        }
        .pcard__wish:hover { border-color: #e8637a; color: #e8637a; }
        .pcard__wish--active { color: #e8637a; border-color: #e8637a; background: rgba(232,99,122,0.15); }

        .pcard__hover-cta {
          position: absolute; bottom: 12px; left: 50%;
          transform: translateX(-50%);
          background: rgba(201,168,76,0.92); color: #1a0f00;
          font-size: 0.6rem; font-weight: 800;
          letter-spacing: 1.5px; text-transform: uppercase;
          padding: 5px 14px; border-radius: 20px;
          white-space: nowrap; opacity: 0; transition: opacity 0.3s;
          pointer-events: none;
        }

        .pcard__body { padding: 1.1rem 1.2rem 1.3rem; }
        .pcard__cat {
          font-size: 0.55rem; font-weight: 700;
          letter-spacing: 2.5px; text-transform: uppercase;
          color: #C9A84C; display: block; margin-bottom: 5px;
        }
        .pcard__name {
          font-family: var(--font-display, Georgia, serif);
          font-size: 1rem; font-weight: 700; color: #f5f0eb;
          margin-bottom: 0.4rem; line-height: 1.25;
        }
        .pcard__desc {
          font-size: 0.72rem; color: rgba(245,240,235,0.45);
          line-height: 1.6; margin-bottom: 1rem;
        }
        .pcard__footer {
          display: flex; align-items: center;
          justify-content: space-between; gap: 0.75rem;
        }
        .pcard__pricing { display: flex; flex-direction: column; }
        .pcard__price {
          font-family: var(--font-display, Georgia, serif);
          font-size: 1.2rem; font-weight: 700; color: #E8C96A; line-height: 1;
        }
        .pcard__walink {
          font-size: 0.55rem; color: rgba(201,168,76,0.5);
          letter-spacing: 0.5px; margin-top: 2px;
        }
        .pcard__add {
          display: inline-flex; align-items: center; gap: 5px;
          background: linear-gradient(135deg, #3E0F6B, #6B2FA0);
          color: #E8C96A; border: 1px solid rgba(201,168,76,0.25);
          padding: 9px 16px; border-radius: 6px;
          font-family: var(--font-body, sans-serif);
          font-size: 0.65rem; font-weight: 700;
          letter-spacing: 1px; text-transform: uppercase;
          cursor: pointer; white-space: nowrap; flex-shrink: 0; transition: all 0.25s;
        }
        .pcard__add:hover:not(:disabled) {
          background: linear-gradient(135deg, #5C1F96, #9B4FC8);
          border-color: rgba(201,168,76,0.5); transform: scale(1.04);
          box-shadow: 0 6px 20px rgba(62,15,107,0.5);
        }
        .pcard__add--done {
          background: linear-gradient(135deg, #145230, #1e7a48) !important;
          border-color: rgba(30,122,72,0.4) !important; color: #7eeaaa !important;
        }
        .pcard__add--disabled {
          background: rgba(255,255,255,0.04) !important;
          border-color: rgba(255,255,255,0.08) !important;
          color: rgba(255,255,255,0.2) !important; cursor: not-allowed;
        }

        /* ════════════════════════════
           CTA BAND
        ════════════════════════════ */
        .shop__cta-band {
          margin: 3.5rem 5% 0; max-width: 1100px;
          margin-left: auto; margin-right: auto; padding: 0 5% 4rem;
        }
        .shop__cta-inner {
          background: linear-gradient(135deg, #1a0535 0%, #3E0F6B 50%, #2D0845 100%);
          border: 1px solid rgba(201,168,76,0.2); border-radius: 16px;
          padding: 2.2rem 2.5rem;
          display: flex; align-items: center;
          justify-content: space-between; gap: 2rem; flex-wrap: wrap;
          position: relative; overflow: hidden;
        }
        .shop__cta-inner::before {
          content: '✦'; position: absolute; right: -20px; top: 50%;
          transform: translateY(-50%); font-size: 12rem;
          color: rgba(201,168,76,0.04); pointer-events: none;
        }
        .shop__cta-title {
          font-family: var(--font-display, Georgia, serif);
          font-size: 1.3rem; font-weight: 700; color: #f5f0eb; margin-bottom: 0.4rem;
        }
        .shop__cta-sub { font-size: 0.8rem; color: rgba(245,240,235,0.5); line-height: 1.6; }
        .shop__cta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #E8C96A, #C9A84C); color: #1a0535;
          padding: 13px 26px; border-radius: 6px;
          font-family: var(--font-body, sans-serif);
          font-size: 0.72rem; font-weight: 800;
          letter-spacing: 1.5px; text-transform: uppercase;
          text-decoration: none; white-space: nowrap; flex-shrink: 0;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 6px 24px rgba(201,168,76,0.3);
        }
        .shop__cta-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(201,168,76,0.45); }

        /* ════════════════════════════
           RESPONSIVE
        ════════════════════════════ */
        @media (max-width: 760px) {
          .shop__grid { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; }
          .shop__hero-title { font-size: 2rem; }
          .shop__cta-inner { flex-direction: column; }
        }
        @media (max-width: 480px) {
          .shop__grid-wrap { padding: 2rem 4% 0; }
          .shop__grid { grid-template-columns: 1fr 1fr; gap: 0.85rem; }
          .pcard__body { padding: 0.85rem; }
          .pcard__name { font-size: 0.88rem; }
          .pcard__desc { display: none; }
          .pcard__price { font-size: 1rem; }
          .pcard__add { padding: 7px 11px; font-size: 0.6rem; }
        }
      `}</style>
    </section>
  );
}