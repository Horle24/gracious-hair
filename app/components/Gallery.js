'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

const GALLERY_ITEMS = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=85&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80&fit=crop',
    caption: 'Frontal Installation',
    tag: 'Signature Look',
    size: 'hero', // spans 2 cols + 2 rows
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=900&q=85&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=500&q=80&fit=crop',
    caption: 'Wig Styling',
    tag: 'Premium Wig',
    size: 'tall', // 1 col, 2 rows
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=900&q=85&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=500&q=80&fit=crop',
    caption: 'Hair Coloring',
    tag: 'Color Magic',
    size: 'normal',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?w=900&q=85&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?w=500&q=80&fit=crop',
    caption: 'Braiding',
    tag: 'Protective Style',
    size: 'normal',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=1200&q=85&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=600&q=80&fit=crop',
    caption: 'Ghana Weaving',
    tag: 'Flawless Edges',
    size: 'wide', // 2 cols, 1 row
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1619387388832-f2e3b1bde6a9?w=900&q=85&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1619387388832-f2e3b1bde6a9?w=500&q=80&fit=crop',
    caption: 'Make-Up & Gele',
    tag: 'Full Glam',
    size: 'normal',
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1596356941014-91c1c71c0a2d?w=900&q=85&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1596356941014-91c1c71c0a2d?w=500&q=80&fit=crop',
    caption: 'Deep Wave Bundle',
    tag: 'Bundle Deal',
    size: 'normal',
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1618375531912-867984bdfd87?w=900&q=85&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1618375531912-867984bdfd87?w=500&q=80&fit=crop',
    caption: 'Straight Bone',
    tag: 'Sleek & Silky',
    size: 'normal',
  },
];

export default function Gallery() {
  const sectionRef  = useRef(null);
  const [lightbox, setLightbox]     = useState(null);
  const [lbIndex, setLbIndex]       = useState(0);
  const [lbVisible, setLbVisible]   = useState(false);
  const [hoveredId, setHoveredId]   = useState(null);

  /* ── Scroll reveal ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.05 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* ── Lightbox keyboard nav ── */
  const openLightbox = useCallback((item) => {
    const idx = GALLERY_ITEMS.findIndex(g => g.id === item.id);
    setLbIndex(idx);
    setLightbox(item);
    setTimeout(() => setLbVisible(true), 10);
  }, []);

  const closeLightbox = useCallback(() => {
    setLbVisible(false);
    setTimeout(() => setLightbox(null), 280);
  }, []);

  const lbNext = useCallback(() => {
    const next = (lbIndex + 1) % GALLERY_ITEMS.length;
    setLbIndex(next);
    setLightbox(GALLERY_ITEMS[next]);
  }, [lbIndex]);

  const lbPrev = useCallback(() => {
    const prev = (lbIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    setLbIndex(prev);
    setLightbox(GALLERY_ITEMS[prev]);
  }, [lbIndex]);

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape')      closeLightbox();
      if (e.key === 'ArrowRight')  lbNext();
      if (e.key === 'ArrowLeft')   lbPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeLightbox, lbNext, lbPrev]);

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  return (
    <section id="gallery" className="gallery" ref={sectionRef}>

      {/* ── Dark noise bg ── */}
      <div className="gallery__noise" aria-hidden />

      {/* ── Section Header ── */}
      <div className="gallery__header reveal">
        <div className="gallery__header-line" />
        <div className="gallery__header-text">
          <span className="gallery__eyebrow">✦ Our Work</span>
          <h2 className="gallery__title">
            Style<br /><em>Gallery</em>
          </h2>
        </div>
        <p className="gallery__subtitle reveal">
          Every look is a story — crafted with precision,<br />elevated with premium hair.
        </p>
      </div>

      {/* ── Masonry-style editorial grid ── */}
      <div className="gallery__grid reveal">
        {GALLERY_ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`gitem gitem--${item.size}`}
            style={{ animationDelay: `${i * 0.08}s` }}
            onClick={() => openLightbox(item)}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && openLightbox(item)}
            aria-label={`View ${item.caption}`}
          >
            {/* Image */}
            <img
              src={item.thumb}
              alt={item.caption}
              className="gitem__img"
              loading={i < 3 ? 'eager' : 'lazy'}
            />

            {/* Always-visible bottom gradient */}
            <div className="gitem__base-grad" />

            {/* Hover overlay */}
            <div className={`gitem__overlay${hoveredId === item.id ? ' gitem__overlay--active' : ''}`} />

            {/* Corner accent */}
            <div className="gitem__corner" />

            {/* Tag pill — top left */}
            <span className="gitem__tag">{item.tag}</span>

            {/* Zoom icon — top right */}
            <span className={`gitem__zoom${hoveredId === item.id ? ' gitem__zoom--active' : ''}`}>
              ⊕
            </span>

            {/* Caption — bottom */}
            <div className={`gitem__caption${hoveredId === item.id ? ' gitem__caption--active' : ''}`}>
              <span className="gitem__caption-num">0{i + 1}</span>
              <div className="gitem__caption-text">
                <span className="gitem__caption-title">{item.caption}</span>
                <span className="gitem__caption-cta">Tap to expand →</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Stats strip ── */}
      <div className="gallery__stats reveal">
        {[
          { num: '500+', label: 'Happy Clients' },
          { num: '9',    label: 'Services Offered' },
          { num: '5★',   label: 'Google Rating' },
          { num: '3+',   label: 'Years Experience' },
        ].map(s => (
          <div key={s.label} className="gallery__stat">
            <span className="gallery__stat-num">{s.num}</span>
            <span className="gallery__stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── CTA Banner ── */}
      <div className="gallery__cta reveal">
        <div className="gallery__cta-glow" />
        <div className="gallery__cta-content">
          <span className="gallery__cta-eyebrow">✦ Ready for your transformation?</span>
          <h3 className="gallery__cta-title">Love what you see?<br /><em>Book your appointment today.</em></h3>
          <div className="gallery__cta-btns">
            <a
              href="https://wa.me/2349025317070?text=Hello!%20I%20saw%20your%20gallery%20and%20I'd%20like%20to%20book%20an%20appointment."
              className="gallery__btn-primary"
              target="_blank" rel="noopener noreferrer"
            >
              💬 Book Appointment
            </a>
            <a
              href="https://instagram.com/gracious_hair_extension"
              className="gallery__btn-secondary"
              target="_blank" rel="noopener noreferrer"
            >
              📸 Follow on Instagram
            </a>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════
           LIGHTBOX
      ══════════════════════════════ */}
      {lightbox && (
        <div
          className={`lb-backdrop${lbVisible ? ' lb-backdrop--visible' : ''}`}
          onClick={closeLightbox}
        >
          <div
            className={`lb-modal${lbVisible ? ' lb-modal--visible' : ''}`}
            onClick={e => e.stopPropagation()}
          >
            {/* Close */}
            <button className="lb-close" onClick={closeLightbox} aria-label="Close">✕</button>

            {/* Prev */}
            <button className="lb-arrow lb-arrow--prev" onClick={lbPrev} aria-label="Previous">‹</button>

            {/* Image */}
            <div className="lb-img-wrap">
              <img
                src={lightbox.url}
                alt={lightbox.caption}
                className="lb-img"
                key={lightbox.id}
              />
              {/* Image counter */}
              <span className="lb-counter">
                {String(lbIndex + 1).padStart(2,'0')} / {String(GALLERY_ITEMS.length).padStart(2,'0')}
              </span>
            </div>

            {/* Next */}
            <button className="lb-arrow lb-arrow--next" onClick={lbNext} aria-label="Next">›</button>

            {/* Footer info */}
            <div className="lb-info">
              <div className="lb-info-left">
                <span className="lb-tag">{lightbox.tag}</span>
                <h3 className="lb-caption">{lightbox.caption}</h3>
              </div>
              <div className="lb-info-right">
                <a
                  href={`https://wa.me/2349025317070?text=Hello!%20I%20love%20your%20${encodeURIComponent(lightbox.caption)}%20style.%20I'd%20like%20to%20book%20this.`}
                  className="lb-book-btn"
                  target="_blank" rel="noopener noreferrer"
                  onClick={closeLightbox}
                >
                  Book This Style →
                </a>
              </div>
            </div>

            {/* Thumbnail strip */}
            <div className="lb-thumbs">
              {GALLERY_ITEMS.map((g, i) => (
                <button
                  key={g.id}
                  className={`lb-thumb${i === lbIndex ? ' lb-thumb--active' : ''}`}
                  onClick={() => { setLbIndex(i); setLightbox(g); }}
                  aria-label={g.caption}
                >
                  <img src={g.thumb} alt={g.caption} className="lb-thumb-img" loading="lazy" />
                  {i === lbIndex && <div className="lb-thumb-bar" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* ══ SECTION ══ */
        .gallery {
          background: #07040f;
          position: relative;
          overflow: hidden;
          padding: 0 0 5rem;
        }
        .gallery__noise {
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.35; pointer-events: none; z-index: 0;
        }

        /* ══ HEADER ══ */
        .gallery__header {
          position: relative; z-index: 1;
          display: grid;
          grid-template-columns: 4px 1fr;
          gap: 0 2rem;
          align-items: center;
          padding: 5rem 5% 3rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .gallery__header-line {
          grid-row: span 2;
          width: 4px;
          height: 100%;
          min-height: 90px;
          background: linear-gradient(180deg, #C9A84C, rgba(201,168,76,0.1));
          border-radius: 4px;
        }
        .gallery__eyebrow {
          font-size: 0.6rem; font-weight: 700;
          letter-spacing: 5px; text-transform: uppercase;
          color: #C9A84C; display: block; margin-bottom: 0.5rem;
        }
        .gallery__title {
          font-family: var(--font-display, Georgia, serif);
          font-size: clamp(2.8rem, 6vw, 5rem);
          font-weight: 900; color: #f5f0eb;
          line-height: 1.0; margin: 0;
        }
        .gallery__title em { color: #E8C96A; font-style: italic; }
        .gallery__subtitle {
          grid-column: 2;
          font-size: 0.88rem;
          color: rgba(245,240,235,0.4);
          line-height: 1.85;
          font-family: var(--font-accent, Georgia, serif);
          font-style: italic;
          margin-top: 1rem;
          padding-left: 0;
        }

        /* ══ EDITORIAL GRID ══ */
        .gallery__grid {
          position: relative; z-index: 1;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: 280px 280px 280px;
          gap: 6px;
          padding: 0 5%;
          max-width: 1200px;
          margin: 0 auto 4rem;
        }

        /* Grid placement by size */
        .gitem--hero   { grid-column: span 2; grid-row: span 2; }
        .gitem--tall   { grid-column: span 1; grid-row: span 2; }
        .gitem--wide   { grid-column: span 2; grid-row: span 1; }
        .gitem--normal { grid-column: span 1; grid-row: span 1; }

        /* ── Each item ── */
        .gitem {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          border-radius: 4px;
          background: #150e22;
        }
        .gitem::after {
          content: '';
          position: absolute; inset: 0;
          border: 1px solid rgba(201,168,76,0);
          border-radius: 4px;
          transition: border-color 0.35s;
          pointer-events: none;
          z-index: 5;
        }
        .gitem:hover::after { border-color: rgba(201,168,76,0.45); }

        .gitem__img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
          transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .gitem:hover .gitem__img { transform: scale(1.08); }

        /* Always-on bottom fade */
        .gitem__base-grad {
          position: absolute; inset: 0;
          background: linear-gradient(
            to top,
            rgba(7,4,15,0.85) 0%,
            rgba(7,4,15,0.3) 40%,
            transparent 70%
          );
          pointer-events: none; z-index: 2;
        }

        /* Hover overlay */
        .gitem__overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            135deg,
            rgba(62,15,107,0.55) 0%,
            rgba(7,4,15,0.4) 100%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 3;
        }
        .gitem__overlay--active { opacity: 1; }

        /* Gold corner accent */
        .gitem__corner {
          position: absolute; bottom: 0; left: 0;
          width: 40px; height: 40px;
          border-left: 2px solid rgba(201,168,76,0.5);
          border-bottom: 2px solid rgba(201,168,76,0.5);
          border-radius: 0 0 0 3px;
          z-index: 4;
          opacity: 0;
          transition: opacity 0.3s, width 0.3s, height 0.3s;
        }
        .gitem:hover .gitem__corner { opacity: 1; width: 50px; height: 50px; }

        /* Tag pill */
        .gitem__tag {
          position: absolute; top: 12px; left: 12px;
          font-size: 0.52rem; font-weight: 800;
          letter-spacing: 2px; text-transform: uppercase;
          color: #C9A84C;
          background: rgba(7,4,15,0.75);
          border: 1px solid rgba(201,168,76,0.3);
          padding: 4px 10px; border-radius: 20px;
          backdrop-filter: blur(6px);
          z-index: 6;
        }

        /* Zoom icon */
        .gitem__zoom {
          position: absolute; top: 12px; right: 12px;
          font-size: 1.1rem;
          color: rgba(255,255,255,0.3);
          z-index: 6;
          transition: color 0.3s, transform 0.3s;
          line-height: 1;
        }
        .gitem__zoom--active { color: #E8C96A; transform: scale(1.25) rotate(90deg); }

        /* Caption */
        .gitem__caption {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 1rem 1.1rem;
          z-index: 6;
          display: flex;
          align-items: flex-end;
          gap: 0.75rem;
          transform: translateY(6px);
          transition: transform 0.35s ease;
        }
        .gitem__caption--active { transform: translateY(0); }

        .gitem__caption-num {
          font-family: var(--font-display, Georgia, serif);
          font-size: 1.8rem; font-weight: 900;
          color: rgba(201,168,76,0.18);
          line-height: 1; flex-shrink: 0;
          letter-spacing: -2px;
        }
        .gitem--hero .gitem__caption-num,
        .gitem--wide .gitem__caption-num { font-size: 3rem; }

        .gitem__caption-text { flex: 1; }
        .gitem__caption-title {
          display: block;
          font-family: var(--font-display, Georgia, serif);
          font-size: 0.95rem; font-weight: 700;
          font-style: italic; color: #f5f0eb;
          line-height: 1.2;
        }
        .gitem--hero .gitem__caption-title,
        .gitem--wide .gitem__caption-title { font-size: 1.3rem; }

        .gitem__caption-cta {
          display: block;
          font-size: 0.55rem; font-weight: 700;
          letter-spacing: 1.5px; text-transform: uppercase;
          color: rgba(201,168,76,0.6);
          margin-top: 2px;
          opacity: 0;
          transition: opacity 0.3s 0.05s;
        }
        .gitem__caption--active .gitem__caption-cta { opacity: 1; }

        /* ══ STATS STRIP ══ */
        .gallery__stats {
          position: relative; z-index: 1;
          display: flex;
          justify-content: center;
          gap: 0;
          max-width: 900px;
          margin: 0 auto 4rem;
          padding: 0 5%;
        }
        .gallery__stat {
          flex: 1;
          text-align: center;
          padding: 2rem 1rem;
          border-right: 1px solid rgba(201,168,76,0.1);
          position: relative;
        }
        .gallery__stat:last-child { border-right: none; }
        .gallery__stat:first-child { border-left: 1px solid rgba(201,168,76,0.1); }
        .gallery__stat::before {
          content: '';
          position: absolute; top: 0; left: 50%; transform: translateX(-50%);
          width: 30px; height: 2px;
          background: linear-gradient(90deg, transparent, #C9A84C, transparent);
        }
        .gallery__stat-num {
          display: block;
          font-family: var(--font-display, Georgia, serif);
          font-size: 2.2rem; font-weight: 900;
          color: #E8C96A; line-height: 1;
          margin-bottom: 0.4rem;
        }
        .gallery__stat-label {
          display: block;
          font-size: 0.6rem; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase;
          color: rgba(245,240,235,0.35);
        }

        /* ══ CTA BANNER ══ */
        .gallery__cta {
          position: relative; z-index: 1;
          margin: 0 5%;
          max-width: 1100px;
          margin-left: auto; margin-right: auto;
          padding: 0 5%;
        }
        .gallery__cta-glow {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 500px; height: 300px;
          background: radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .gallery__cta-content {
          background: linear-gradient(135deg, #100920 0%, #1e0840 50%, #0d0618 100%);
          border: 1px solid rgba(201,168,76,0.18);
          border-radius: 16px;
          padding: 3rem 3.5rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .gallery__cta-content::before {
          content: '✦';
          position: absolute;
          font-size: 18rem;
          color: rgba(201,168,76,0.03);
          top: 50%; left: 50%;
          transform: translate(-50%,-50%);
          pointer-events: none;
        }
        .gallery__cta-eyebrow {
          display: block;
          font-size: 0.6rem; font-weight: 700;
          letter-spacing: 4px; text-transform: uppercase;
          color: #C9A84C; margin-bottom: 1rem;
        }
        .gallery__cta-title {
          font-family: var(--font-display, Georgia, serif);
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          font-weight: 700; color: #f5f0eb;
          line-height: 1.2; margin-bottom: 2rem;
        }
        .gallery__cta-title em { color: #E8C96A; font-style: italic; }
        .gallery__cta-btns {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .gallery__btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #E8C96A, #C9A84C);
          color: #0d0618;
          padding: 13px 28px; border-radius: 6px;
          font-family: var(--font-body, sans-serif);
          font-size: 0.72rem; font-weight: 800;
          letter-spacing: 1.5px; text-transform: uppercase;
          text-decoration: none; transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 6px 24px rgba(201,168,76,0.3);
        }
        .gallery__btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(201,168,76,0.45); }
        .gallery__btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent;
          color: rgba(245,240,235,0.7);
          padding: 13px 28px; border-radius: 6px;
          border: 1px solid rgba(245,240,235,0.18);
          font-family: var(--font-body, sans-serif);
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 1.5px; text-transform: uppercase;
          text-decoration: none; transition: all 0.25s;
        }
        .gallery__btn-secondary:hover {
          border-color: rgba(201,168,76,0.4);
          color: #E8C96A;
          background: rgba(201,168,76,0.06);
        }

        /* ══ LIGHTBOX ══ */
        .lb-backdrop {
          position: fixed; inset: 0; z-index: 3000;
          background: rgba(5,2,12,0.96);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          display: flex; align-items: center; justify-content: center;
          padding: 0;
          opacity: 0; transition: opacity 0.28s ease;
        }
        .lb-backdrop--visible { opacity: 1; }

        .lb-modal {
          width: 100%; max-width: 1000px;
          height: 100dvh;
          display: flex; flex-direction: column;
          background: #0d0918;
          position: relative;
          opacity: 0; transform: scale(0.95);
          transition: opacity 0.28s ease, transform 0.28s cubic-bezier(0.34,1.2,0.64,1);
        }
        .lb-modal--visible { opacity: 1; transform: scale(1); }

        .lb-close {
          position: absolute; top: 16px; right: 16px; z-index: 10;
          width: 40px; height: 40px; border-radius: 50%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,253,247,0.65); font-size: 1rem;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
        }
        .lb-close:hover { background: rgba(201,168,76,0.2); color: #E8C96A; border-color: rgba(201,168,76,0.4); }

        /* Prev/Next arrows */
        .lb-arrow {
          position: absolute; top: 50%; z-index: 10;
          transform: translateY(-50%);
          width: 48px; height: 48px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50%;
          color: rgba(255,253,247,0.7); font-size: 1.6rem;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: all 0.2s; line-height: 1;
        }
        .lb-arrow:hover { background: rgba(201,168,76,0.2); color: #E8C96A; border-color: rgba(201,168,76,0.4); }
        .lb-arrow--prev { left: 16px; }
        .lb-arrow--next { right: 16px; }

        /* Main image */
        .lb-img-wrap {
          flex: 1; position: relative; overflow: hidden; min-height: 0;
        }
        .lb-img {
          width: 100%; height: 100%;
          object-fit: contain;
          object-position: center center;
          display: block;
          animation: lbFadeIn 0.3s ease;
        }
        @keyframes lbFadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }

        .lb-counter {
          position: absolute; top: 16px; left: 50%; transform: translateX(-50%);
          font-size: 0.65rem; font-weight: 700; letter-spacing: 3px;
          color: rgba(245,240,235,0.35);
          background: rgba(5,2,12,0.6); padding: 4px 12px; border-radius: 20px;
        }

        /* Info bar */
        .lb-info {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1rem 1.5rem;
          border-top: 1px solid rgba(201,168,76,0.12);
          gap: 1rem; flex-wrap: wrap;
          background: rgba(13,9,24,0.95);
          flex-shrink: 0;
        }
        .lb-info-left { display: flex; align-items: center; gap: 0.75rem; }
        .lb-tag {
          font-size: 0.55rem; font-weight: 800;
          letter-spacing: 2px; text-transform: uppercase;
          color: #C9A84C; background: rgba(201,168,76,0.1);
          border: 1px solid rgba(201,168,76,0.25);
          padding: 3px 10px; border-radius: 20px;
        }
        .lb-caption {
          font-family: var(--font-display, Georgia, serif);
          font-size: 1rem; font-weight: 700;
          color: #f5f0eb; font-style: italic;
        }
        .lb-book-btn {
          display: inline-flex; align-items: center; gap: 6px;
          background: linear-gradient(135deg, #E8C96A, #C9A84C);
          color: #0d0618; padding: 9px 20px; border-radius: 5px;
          font-family: var(--font-body, sans-serif);
          font-size: 0.65rem; font-weight: 800;
          letter-spacing: 1px; text-transform: uppercase;
          text-decoration: none; white-space: nowrap;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .lb-book-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(201,168,76,0.4); }

        /* Thumbnail strip */
        .lb-thumbs {
          display: flex;
          height: 72px;
          border-top: 1px solid rgba(201,168,76,0.08);
          overflow-x: auto;
          scrollbar-width: none;
          background: #080510;
          flex-shrink: 0;
        }
        .lb-thumbs::-webkit-scrollbar { display: none; }
        .lb-thumb {
          flex-shrink: 0;
          width: 72px; height: 100%;
          border: none; padding: 0; cursor: pointer;
          position: relative; overflow: hidden;
          background: #0d0912;
          border-right: 1px solid rgba(201,168,76,0.06);
          transition: opacity 0.2s;
          opacity: 0.45;
        }
        .lb-thumb:hover { opacity: 0.75; }
        .lb-thumb--active { opacity: 1; }
        .lb-thumb-img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center top;
          display: block;
        }
        .lb-thumb-bar {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 3px; background: #C9A84C;
        }

        /* ══ RESPONSIVE ══ */
        @media (max-width: 900px) {
          .gallery__grid {
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: 220px 220px 220px 220px;
          }
          .gitem--hero { grid-column: span 2; grid-row: span 2; }
          .gitem--wide { grid-column: span 2; }
          .gitem--tall { grid-row: span 2; }
        }
        @media (max-width: 600px) {
          .gallery__grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(6, 180px);
            gap: 4px;
          }
          .gitem--hero { grid-column: span 2; grid-row: span 1; }
          .gitem--wide { grid-column: span 2; }
          .gitem--tall { grid-row: span 1; }
          .gallery__header { padding: 3rem 5% 2rem; }
          .gallery__title { font-size: 2.5rem; }
          .gallery__stats { flex-wrap: wrap; }
          .gallery__stat { flex-basis: 50%; border: none; }
          .gallery__cta-content { padding: 2rem 1.5rem; }
          .lb-arrow { width: 36px; height: 36px; font-size: 1.2rem; }
          .lb-arrow--prev { left: 6px; }
          .lb-arrow--next { right: 6px; }
        }
      `}</style>
    </section>
  );
}