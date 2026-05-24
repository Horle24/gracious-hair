'use client';
import { useState, useRef } from 'react';
import { PRODUCT_MEDIA, FALLBACK_IMAGE } from '../data/productMedia';

export default function ProductGallery({ productId, productName, compact = false }) {
  const media     = PRODUCT_MEDIA[productId];
  const images    = media?.images ?? [FALLBACK_IMAGE];
  const video     = media?.video  ?? null;
  const labels    = media?.labels ?? images.map((_, i) => `View ${i + 1}`);

  // Build slides: images first, then video last (if present)
  const slides = [
    ...images.map((src, i) => ({ type: 'image', src, label: labels[i] ?? `View ${i + 1}` })),
    ...(video ? [{ type: 'video', src: video, label: 'Video' }] : []),
  ];

  const [active, setActive] = useState(0);
  const videoRef = useRef(null);

  function goTo(idx) {
    setActive(idx);
    if (videoRef.current) videoRef.current.pause();
  }

  const current = slides[active];

  return (
    <div className={`pg${compact ? ' pg--compact' : ''}`}>
      {/* ── Main viewer ── */}
      <div className="pg__main">
        {current.type === 'image' ? (
          <img
            key={current.src}
            src={current.src}
            alt={`${productName} — ${current.label}`}
            className="pg__main-img"
          />
        ) : (
          <video
            ref={videoRef}
            src={current.src}
            controls
            playsInline
            className="pg__main-video"
          />
        )}

        {/* Slide counter */}
        <span className="pg__counter">{active + 1} / {slides.length}</span>

        {/* Prev / Next arrows */}
        {slides.length > 1 && (
          <>
            <button
              className="pg__arrow pg__arrow--prev"
              onClick={() => goTo((active - 1 + slides.length) % slides.length)}
              aria-label="Previous"
            >‹</button>
            <button
              className="pg__arrow pg__arrow--next"
              onClick={() => goTo((active + 1) % slides.length)}
              aria-label="Next"
            >›</button>
          </>
        )}
      </div>

      {/* ── Thumbnail strip ── */}
      {slides.length > 1 && (
        <div className="pg__thumbs">
          {slides.map((slide, i) => (
            <button
              key={i}
              className={`pg__thumb${i === active ? ' pg__thumb--active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={slide.label}
            >
              {slide.type === 'image' ? (
                <>
                  <img src={slide.src} alt={slide.label} className="pg__thumb-img" />
                  <span className="pg__thumb-label">{slide.label}</span>
                </>
              ) : (
                <span className="pg__thumb-video-icon">
                  ▶
                  <span className="pg__thumb-label">Video</span>
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      <style jsx>{`
        .pg { display: flex; flex-direction: column; gap: 0; }

        /* ── Main viewer ── */
        .pg__main {
          position: relative;
          background: #1a0f2a;
          overflow: hidden;
        }
        .pg--compact .pg__main { border-radius: 0; }

        .pg__main-img,
        .pg__main-video {
          width: 100%;
          display: block;
          object-fit: cover;
          object-position: center top;
          aspect-ratio: 1 / 1;
          transition: opacity 0.25s ease;
        }
        .pg__main-video {
          object-fit: contain;
          background: #0a0612;
          max-height: 460px;
        }

        /* Counter pill */
        .pg__counter {
          position: absolute;
          bottom: 10px; right: 12px;
          font-size: 0.55rem; font-weight: 700;
          letter-spacing: 1px;
          padding: 3px 9px; border-radius: 20px;
          background: rgba(10,6,18,0.7);
          color: rgba(232,201,106,0.8);
          backdrop-filter: blur(6px);
          pointer-events: none;
        }

        /* Arrows */
        .pg__arrow {
          position: absolute;
          top: 50%; transform: translateY(-50%);
          width: 34px; height: 34px;
          background: rgba(10,6,18,0.65);
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 50%;
          color: #E8C96A;
          font-size: 1.3rem; line-height: 1;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
          backdrop-filter: blur(6px);
        }
        .pg__arrow--prev { left: 10px; }
        .pg__arrow--next { right: 10px; }
        .pg__arrow:hover {
          background: rgba(201,168,76,0.25);
          border-color: rgba(201,168,76,0.5);
          transform: translateY(-50%) scale(1.08);
        }

        /* ── Thumbnails ── */
        .pg__thumbs {
          display: flex;
          gap: 6px;
          padding: 8px;
          background: #100920;
          border-top: 1px solid rgba(201,168,76,0.1);
          overflow-x: auto;
          scrollbar-width: none;
        }
        .pg__thumbs::-webkit-scrollbar { display: none; }

        .pg__thumb {
          flex-shrink: 0;
          width: 62px;
          aspect-ratio: 1 / 1;
          border-radius: 6px;
          border: 2px solid rgba(201,168,76,0.1);
          background: #1a0f2a;
          overflow: hidden;
          cursor: pointer;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 3px;
          padding: 0;
          transition: border-color 0.2s, transform 0.2s;
          position: relative;
        }
        .pg__thumb:hover { border-color: rgba(201,168,76,0.4); transform: scale(1.05); }
        .pg__thumb--active {
          border-color: #C9A84C;
          box-shadow: 0 0 0 1px rgba(201,168,76,0.3);
        }

        .pg__thumb-img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center top;
          display: block;
        }

        .pg__thumb-label {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          background: rgba(10,6,18,0.75);
          font-size: 0.42rem; font-weight: 700;
          letter-spacing: 0.8px; text-transform: uppercase;
          color: rgba(232,201,106,0.85);
          text-align: center;
          padding: 2px 0;
        }

        .pg__thumb-video-icon {
          font-size: 1.2rem;
          color: #E8C96A;
          display: flex; flex-direction: column;
          align-items: center; gap: 2px;
        }

        /* Compact (quick-view) adjustments */
        .pg--compact .pg__main-img,
        .pg--compact .pg__main-video { aspect-ratio: 1 / 1; }
        .pg--compact .pg__thumb { width: 52px; }
      `}</style>
    </div>
  );
}