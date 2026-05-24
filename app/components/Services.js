'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { services } from '../data/products';

const SERVICE_MEDIA = {
  'Fixing':               { photo: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=800&q=80&fit=crop&crop=top', video: '' },
  'Wigging':              { photo: 'https://i.pinimg.com/736x/5d/9e/d2/5d9ed29cf1e10e9e5263508a182037a5.jpg', video: '' },
  'Hair Coloring':        { photo: 'https://i.pinimg.com/1200x/7f/22/43/7f224394848b525f7ba8589ee5c9c6c0.jpg', video: '' },
  'Make-Up':              { photo: 'https://i.pinimg.com/736x/3e/a5/0e/3ea50e7222b5200ae4f7a6c8594531fa.jpg', video: '' },
  'Gele':                 { photo: 'https://i.pinimg.com/736x/a3/5f/80/a35f80ba36d3cbb270333a6fef922250.jpg', video: '' },
  'Hair Revamp':          { photo: 'https://i.pinimg.com/1200x/d9/c6/90/d9c69089f539c78d99159a850720422c.jpg', video: '' },
  'Braiding':             { photo: 'https://i.pinimg.com/736x/fd/07/b5/fd07b53aeb7de2bf1e8e0493aa93df6b.jpg', video: '' },
  'Ghana Weaving':        { photo: 'https://i.pinimg.com/736x/aa/10/bb/aa10bbb18dbefbba56303f170ab1ee80.jpg', video: '' },
  'Frontal Installation': { photo: 'https://i.pinimg.com/736x/88/d4/f8/88d4f832a5475f52fc90ec22b3fec3ba.jpg', video: '' },
};

export default function Services() {
  const [active, setActive]       = useState(0);
  const [dir, setDir]             = useState('next');
  const [animating, setAnimating] = useState(false);
  const videoRef  = useRef(null);
  const timerRef  = useRef(null);
  const total     = services.length;

  const goTo = useCallback((index, direction = 'next') => {
    if (animating) return;
    setDir(direction);
    setAnimating(true);
    setTimeout(() => {
      setActive(index);
      setAnimating(false);
    }, 480);
  }, [active, animating]);

  const next  = useCallback(() => goTo((active + 1) % total, 'next'),         [active, goTo, total]);
  const prev_ = useCallback(() => goTo((active - 1 + total) % total, 'prev'), [active, goTo, total]);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 5500);
  }, [next]);

  useEffect(() => {
    timerRef.current = setInterval(next, 5500);
    return () => clearInterval(timerRef.current);
  }, [next]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [active]);

  const current  = services[active];
  const media    = SERVICE_MEDIA[current.name] || {};
  const hasVideo = Boolean(media.video);

  return (
    <section id="services" className="services">
      <div className="services__noise" aria-hidden />

      <div className="services__inner">

        {/* ── Sidebar ── */}
        <div className="services__sidebar">
          <div className="services__label">✦ What We Offer</div>
          <h2 className="services__heading">Our<br /><em>Services</em></h2>
          <p className="services__tagline">Premium hair care crafted<br />for every occasion.</p>

          <div className="services__dots">
            {services.map((s, i) => (
              <button
                key={s.id}
                className={`dot${i === active ? ' dot--active' : ''}`}
                onClick={() => { goTo(i, i > active ? 'next' : 'prev'); resetTimer(); }}
                aria-label={s.name}
              >
                <span className="dot__pip" />
                <span className="dot__label">{s.name}</span>
              </button>
            ))}
          </div>

          <div className="services__arrows">
            <button className="arrow" onClick={() => { prev_(); resetTimer(); }} aria-label="Previous">←</button>
            <span className="services__counter">
              {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <button className="arrow" onClick={() => { next(); resetTimer(); }} aria-label="Next">→</button>
          </div>
        </div>

        {/* ── Stage ── */}
        <div className="services__stage">

          {/* Progress bar */}
          <div className="services__progress" key={active}>
            <div className="services__progress-fill" />
          </div>

          {/* Main slide */}
          <div className={`slide slide--${dir}${animating ? ' slide--out' : ' slide--in'}`}>

            {/* ── SQUARE MEDIA BOX ── */}
            <div className="slide__media">
              {hasVideo ? (
                <video
                  ref={videoRef}
                  src={media.video}
                  autoPlay muted loop playsInline
                  className="slide__visual"
                />
              ) : (
                <img
                  src={media.photo}
                  alt={current.name}
                  className="slide__visual"
                />
              )}
              <div className="slide__vignette" />
              <div className="slide__num">{String(active + 1).padStart(2, '0')}</div>
              {hasVideo && <span className="slide__vid-badge">▶ Live Preview</span>}
            </div>

            {/* Content panel */}
            <div className="slide__content">
              <span className="slide__icon">{current.icon}</span>
              <div className="slide__text">
                <h3 className="slide__name">{current.name}</h3>
                <p className="slide__desc">{current.desc}</p>
              </div>
              <a
                href={`https://wa.me/2349025317070?text=Hello!%20I'd%20like%20to%20book%20a%20${encodeURIComponent(current.wa)}%20appointment.`}
                className="slide__cta"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Now <span className="slide__cta-arrow">→</span>
              </a>
            </div>
          </div>

          {/* ── THUMBNAIL STRIP ── */}
          <div className="services__thumbs">
            {services.map((s, i) => {
              const m = SERVICE_MEDIA[s.name] || {};
              return (
                <button
                  key={s.id}
                  className={`thumb${i === active ? ' thumb--active' : ''}`}
                  onClick={() => { goTo(i, i > active ? 'next' : 'prev'); resetTimer(); }}
                  aria-label={s.name}
                  title={s.name}
                >
                  {/* Square thumb image — equal width & height, no cropping */}
                  <div className="thumb__frame">
                    <img
                      src={m.photo}
                      alt={s.name}
                      className="thumb__img"
                      loading="lazy"
                    />
                    <div className="thumb__overlay" />
                    {i === active && <div className="thumb__active-bar" />}
                  </div>
                  <span className="thumb__name">{s.name}</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      <style jsx>{`
        /* ── Section ── */
        .services {
          background: #0d0912;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: stretch;
        }
        .services__noise {
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.3; pointer-events: none; z-index: 0;
        }
        .services__inner {
          position: relative; z-index: 1;
          display: grid;
          grid-template-columns: 260px 1fr;
          width: 100%;
        }

        /* ── Sidebar ── */
        .services__sidebar {
          padding: 3rem 1.8rem 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-right: 1px solid rgba(201,168,76,0.15);
          background: rgba(201,168,76,0.02);
        }
        .services__label {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--gold, #c9a84c);
          margin-bottom: 1rem;
        }
        .services__heading {
          font-family: var(--font-display, 'Georgia', serif);
          font-size: clamp(2rem, 3vw, 2.8rem);
          font-weight: 700;
          line-height: 1.05;
          color: #f5f0eb;
          margin-bottom: 0.75rem;
          letter-spacing: -1px;
        }
        .services__heading em { font-style: italic; color: var(--gold, #c9a84c); }
        .services__tagline {
          font-size: 0.75rem;
          color: rgba(245,240,235,0.4);
          line-height: 1.8;
          margin-bottom: 1.6rem;
        }

        /* Dots */
        .services__dots {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
          margin-bottom: 1.8rem;
        }
        .dot {
          display: flex; align-items: center; gap: 10px;
          background: none; border: none; cursor: pointer;
          padding: 4px 0; text-align: left;
          opacity: 0.35; transition: opacity 0.25s;
        }
        .dot:hover { opacity: 0.75; }
        .dot--active { opacity: 1; }
        .dot__pip {
          flex-shrink: 0;
          width: 6px; height: 6px; border-radius: 3px;
          background: rgba(245,240,235,0.35);
          transition: width 0.3s, background 0.3s;
        }
        .dot--active .dot__pip { width: 20px; background: var(--gold, #c9a84c); }
        .dot__label { font-size: 0.68rem; color: #f5f0eb; font-weight: 500; white-space: nowrap; }
        .dot--active .dot__label { color: var(--gold, #c9a84c); font-weight: 700; }

        /* Arrows */
        .services__arrows { display: flex; align-items: center; gap: 0.8rem; }
        .arrow {
          width: 38px; height: 38px; border-radius: 50%;
          background: none; border: 1px solid rgba(201,168,76,0.3);
          color: var(--gold, #c9a84c); font-size: 1rem; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, border-color 0.2s;
        }
        .arrow:hover { background: rgba(201,168,76,0.1); border-color: var(--gold, #c9a84c); }
        .services__counter {
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 2px; color: rgba(245,240,235,0.35);
        }

        /* ── Stage ── */
        .services__stage {
          display: flex; flex-direction: column;
          position: relative; overflow: hidden;
        }

        /* Progress */
        .services__progress {
          position: absolute; top: 0; left: 0; right: 0;
          height: 3px; background: rgba(201,168,76,0.1); z-index: 10;
        }
        .services__progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--purple, #6a2fa0), var(--gold, #c9a84c));
          animation: fillBar 5.5s linear forwards;
        }
        @keyframes fillBar { from { width: 0% } to { width: 100% } }

        /* ── Slide ── */
        .slide {
          flex: 1; display: flex; flex-direction: column;
          position: relative; overflow: hidden; min-height: 0;
        }
        .slide--in.slide--next  { animation: inRight  0.48s cubic-bezier(.4,0,.2,1) both; }
        .slide--in.slide--prev  { animation: inLeft   0.48s cubic-bezier(.4,0,.2,1) both; }
        .slide--out.slide--next { animation: outLeft  0.48s cubic-bezier(.4,0,.2,1) both; }
        .slide--out.slide--prev { animation: outRight 0.48s cubic-bezier(.4,0,.2,1) both; }
        @keyframes inRight  { from { transform:translateX(50px);  opacity:0; } to { transform:none; opacity:1; } }
        @keyframes inLeft   { from { transform:translateX(-50px); opacity:0; } to { transform:none; opacity:1; } }
        @keyframes outLeft  { from { transform:none; opacity:1; } to { transform:translateX(-50px);  opacity:0; } }
        @keyframes outRight { from { transform:none; opacity:1; } to { transform:translateX(50px);   opacity:0; } }

        /* ─────────────────────────────────────────
           MAIN IMAGE — 1:1 square, fully visible
        ───────────────────────────────────────── */
        .slide__media {
          position: relative;
          width: 100%;
          /* 1:1 perfect square — width = height always */
          aspect-ratio: 1 / 1;
          max-height: 520px;          /* cap so it's not giant on ultrawide */
          background: #0d0912;
          flex-shrink: 0;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .slide__visual {
          width: 100%;
          height: 100%;
          /* contain = full image shown, no cropping ever */
          object-fit: contain;
          object-position: center center;
          display: block;
          animation: kenBurns 6s ease forwards;
        }
        @keyframes kenBurns {
          from { transform: scale(1.03); }
          to   { transform: scale(1.0);  }
        }
        .slide__vignette {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, transparent 55%, rgba(13,9,18,0.8) 100%);
          pointer-events: none;
        }
        .slide__num {
          position: absolute; top: 1rem; right: 1.2rem;
          font-size: 3.5rem; font-weight: 900;
          color: rgba(245,240,235,0.04); line-height: 1;
          font-family: var(--font-display,'Georgia',serif);
          letter-spacing: -4px; pointer-events: none; user-select: none;
        }
        .slide__vid-badge {
          position: absolute; top: 0.85rem; left: 0.85rem;
          background: rgba(201,168,76,0.92); color: #1a0f00;
          font-size: 0.54rem; font-weight: 800;
          letter-spacing: 1.5px; text-transform: uppercase;
          padding: 3px 9px; border-radius: 20px;
        }

        /* Content panel */
        .slide__content {
          padding: 1.2rem 1.8rem;
          background: rgba(13,9,18,0.9);
          backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
          border-top: 1px solid rgba(201,168,76,0.12);
          display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;
          flex-shrink: 0;
        }
        .slide__icon {
          font-size: 1.8rem; flex-shrink: 0;
          filter: drop-shadow(0 2px 10px rgba(201,168,76,0.45));
        }
        .slide__text { flex: 1; min-width: 140px; }
        .slide__name {
          font-family: var(--font-display,'Georgia',serif);
          font-size: clamp(1.1rem, 1.8vw, 1.4rem); font-weight: 700;
          color: #f5f0eb; margin: 0 0 0.25rem;
          letter-spacing: -0.3px; line-height: 1.1;
        }
        .slide__desc {
          font-size: 0.73rem; color: rgba(245,240,235,0.5);
          line-height: 1.65; margin: 0;
        }
        .slide__cta {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, var(--purple,#6a2fa0), #9b4fc8);
          color: #f5f0eb; font-size: 0.64rem; font-weight: 800;
          letter-spacing: 1.5px; text-transform: uppercase;
          padding: 10px 18px; border-radius: 3px; text-decoration: none;
          white-space: nowrap; flex-shrink: 0;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 6px 20px rgba(106,47,160,0.38);
        }
        .slide__cta:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(106,47,160,0.52); }
        .slide__cta-arrow { transition: transform 0.2s; }
        .slide__cta:hover .slide__cta-arrow { transform: translateX(4px); }

        /* ─────────────────────────────────────────
           THUMBNAILS
           • 9 equal columns
           • Each thumb is a perfect SQUARE (1:1)
           • object-fit: contain → full image shown
           • No cropping, no cutting
        ───────────────────────────────────────── */
        .services__thumbs {
          display: grid;
          grid-template-columns: repeat(9, 1fr);
          border-top: 2px solid rgba(201,168,76,0.15);
          background: #060410;
          flex-shrink: 0;
        }

        .thumb {
          /* aspect-ratio 1:1 makes every thumb a perfect square
             regardless of screen width */
          aspect-ratio: 1 / 1;
          position: relative;
          border: none;
          cursor: pointer;
          overflow: hidden;
          background: #0d0912;
          border-right: 1px solid rgba(201,168,76,0.08);
          padding: 0;
          display: flex;
          flex-direction: column;
          transition: background 0.25s;
        }
        .thumb:last-child { border-right: none; }
        .thumb--active { background: rgba(201,168,76,0.05); }

        .thumb__frame {
          /* fills the entire square */
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .thumb__img {
          width: 100%;
          height: 100%;
          /* contain = show full picture, never cut */
          object-fit: contain;
          object-position: center center;
          display: block;
          transition: transform 0.4s ease;
          /* subtle dark bg so transparent/portrait imgs look clean */
          background: #0d0912;
        }
        .thumb:hover .thumb__img { transform: scale(1.06); }

        .thumb__overlay {
          position: absolute; inset: 0;
          background: rgba(13,9,18,0.42);
          transition: background 0.3s;
        }
        .thumb--active .thumb__overlay { background: rgba(13,9,18,0.05); }

        /* Gold bottom bar on active thumb */
        .thumb__active-bar {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          background: var(--gold, #c9a84c);
        }

        .thumb__name {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          font-size: 0.42rem;
          font-weight: 700;
          letter-spacing: 0.4px;
          text-transform: uppercase;
          color: rgba(245,240,235,0.7);
          text-align: center;
          padding: 3px 2px 4px;
          background: rgba(13,9,18,0.82);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.2;
        }
        .thumb--active .thumb__name { color: var(--gold, #c9a84c); }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .services__inner { grid-template-columns: 1fr; }
          .services__sidebar {
            padding: 2rem 1.5rem 1.5rem;
            border-right: none;
            border-bottom: 1px solid rgba(201,168,76,0.15);
          }
          .services__dots { display: none; }
          .services__heading { font-size: 2rem; }
          .slide__media { max-height: 380px; }
          .slide__content { padding: 1rem 1.2rem; gap: 0.75rem; }
        }

        @media (max-width: 540px) {
          .services__thumbs { grid-template-columns: repeat(5, 1fr); }
          .slide__media { max-height: 300px; }
          .slide__content { flex-direction: column; align-items: flex-start; }
          .slide__cta { width: 100%; justify-content: center; }
          .thumb__name { font-size: 0.38rem; }
        }
      `}</style>
    </section>
  );
}