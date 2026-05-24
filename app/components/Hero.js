'use client';
import { useEffect, useState, useRef } from 'react';

const SLIDES = [
  {
    url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1600&q=90&fit=crop',
    label: 'Frontal Installation',
    caption: 'Flawless. Natural. You.',
    tag: '01',
  },
  {
    url: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=1600&q=90&fit=crop',
    label: 'Wig Styling',
    caption: 'Your Crown, Redefined.',
    tag: '02',
  },
  {
    url: 'https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?w=1600&q=90&fit=crop',
    label: 'Braiding & Weaving',
    caption: 'Art in Every Strand.',
    tag: '03',
  },
  {
    url: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=1600&q=90&fit=crop',
    label: 'Hair Coloring',
    caption: 'Bold. Vibrant. Iconic.',
    tag: '04',
  },
  {
    url: 'https://images.unsplash.com/photo-1618375531912-867984bdfd87?w=1600&q=90&fit=crop',
    label: 'Ghana Weaving',
    caption: 'Elegance, Perfected.',
    tag: '05',
  },
];

export default function Hero() {
  const [current, setCurrent]   = useState(0);
  const [prev, setPrev]         = useState(null);
  const [animating, setAnimating] = useState(false);
  const [loaded, setLoaded]     = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const timerRef = useRef(null);
  const heroRef  = useRef(null);

  function goTo(idx) {
    if (animating || idx === current) return;
    setAnimating(true);
    setPrev(current);
    setCurrent(idx);
    setTimeout(() => { setPrev(null); setAnimating(false); }, 1000);
  }

  function next() { goTo((current + 1) % SLIDES.length); }

  useEffect(() => {
    timerRef.current = setInterval(next, 5500);
    return () => clearInterval(timerRef.current);
  }, [current]);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  /* Subtle parallax on mouse move */
  useEffect(() => {
    const handleMouse = e => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 5500);
  };

  return (
    <section id="hero" className={`hero ${loaded ? 'hero--loaded' : ''}`} ref={heroRef}>

      {/* ── Background slides ── */}
      <div className="hero__bg">
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className={`
              hero__bg-slide
              ${i === current ? 'hero__bg-slide--active' : ''}
              ${i === prev    ? 'hero__bg-slide--exit'   : ''}
            `}
            style={{
              backgroundImage: `url('${s.url}')`,
              transform: `scale(1.08) translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)`,
            }}
          />
        ))}

        {/* Layered overlays */}
        <div className="hero__overlay hero__overlay--base" />
        <div className="hero__overlay hero__overlay--gradient" />
        <div className="hero__overlay hero__overlay--vignette" />
        {/* Grain texture */}
        <div className="hero__grain" />
      </div>

      {/* ── Decorative geometry ── */}
      <div className="hero__geo">
        <div className="hero__geo-ring hero__geo-ring--1" style={{ transform: `translate(-50%,-50%) rotate(${mousePos.x * 0.5}deg)` }} />
        <div className="hero__geo-ring hero__geo-ring--2" style={{ transform: `translate(-50%,-50%) rotate(${-mousePos.x * 0.3}deg)` }} />
        <div className="hero__geo-line hero__geo-line--left" />
        <div className="hero__geo-line hero__geo-line--right" />
      </div>

      {/* ── Slide counter — top right ── */}
      <div className="hero__counter">
        <span className="hero__counter-current">{SLIDES[current].tag}</span>
        <div className="hero__counter-track">
          {SLIDES.map((_, i) => (
            <div key={i} className={`hero__counter-pip ${i === current ? 'hero__counter-pip--active' : ''}`} />
          ))}
        </div>
        <span className="hero__counter-total">0{SLIDES.length}</span>
      </div>

      {/* ── Main content ── */}
      <div className="hero__content">

        {/* Eyebrow */}
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-line" />
          <span className="hero__eyebrow-text">Lagos, Nigeria · Est. 2020</span>
          <span className="hero__eyebrow-line" />
        </div>

        {/* Title */}
        <h1 className="hero__title">
          <span className="hero__title-word hero__title-word--1">Gracious</span>
          <br />
          <span className="hero__title-word hero__title-word--2">Hair</span>
          <span className="hero__title-word hero__title-word--3"> Extension</span>
        </h1>

        {/* Tagline */}
        <p className="hero__tagline">
          <em>"Your Crown Deserves the Best"</em>
        </p>

        {/* Live caption pill */}
        <div className="hero__caption" key={`caption-${current}`}>
          <span className="hero__caption-pulse" />
          <span>{SLIDES[current].caption}</span>
        </div>

        {/* Divider */}
        <div className="hero__divider">
          <span /><span className="hero__divider-gem">◆</span><span />
        </div>

        {/* CTA Buttons */}
        <div className="hero__ctas">
          <a href="#shop" className="hero__cta hero__cta--primary">
            <span className="hero__cta-bg" />
            <span className="hero__cta-icon">🛍</span>
            <span className="hero__cta-label">Shop Extensions</span>
          </a>
          <a
            href="https://wa.me/2349025317070?text=Hello!%20I'd%20like%20to%20book%20a%20service."
            className="hero__cta hero__cta--outline"
            target="_blank" rel="noopener noreferrer"
          >
            <span className="hero__cta-icon">💬</span>
            <span className="hero__cta-label">Book a Service</span>
          </a>
        </div>

        {/* Dot navigation */}
        <div className="hero__dots">
          {SLIDES.map((s, i) => (
            <button
              key={i}
              className={`hero__dot ${i === current ? 'hero__dot--active' : ''}`}
              onClick={() => { goTo(i); resetTimer(); }}
              aria-label={s.label}
            >
              <span className="hero__dot-fill" />
            </button>
          ))}
        </div>

        {/* Stats row */}
        <div className="hero__stats">
          {[
            { num: '9+',   label: 'Services' },
            { num: '100%', label: 'Premium Hair' },
            { num: '24/7', label: 'WhatsApp Orders' },
          ].map((s, i) => (
            <div className="hero__stat" key={i}>
              <span className="hero__stat-num">{s.num}</span>
              <span className="hero__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Service badge — bottom right ── */}
      <div className="hero__badge" key={`badge-${current}`}>
        <div className="hero__badge-num">{SLIDES[current].tag}</div>
        <div className="hero__badge-name">{SLIDES[current].label}</div>
        <div className="hero__badge-bar">
          <span className="hero__badge-fill" />
        </div>
      </div>

      {/* ── Thumbnail strip — left side ── */}
      <div className="hero__thumbs">
        {SLIDES.map((s, i) => (
          <button
            key={i}
            className={`hero__thumb ${i === current ? 'hero__thumb--active' : ''}`}
            onClick={() => { goTo(i); resetTimer(); }}
            style={{ backgroundImage: `url('${s.url}')` }}
            aria-label={s.label}
          >
            <span className="hero__thumb-overlay" />
          </button>
        ))}
      </div>

      {/* ── Scroll indicator ── */}
      <div className="hero__scroll">
        <div className="hero__scroll-mouse">
          <span className="hero__scroll-wheel" />
        </div>
        <span className="hero__scroll-text">Scroll</span>
      </div>

      <style jsx>{`
        /* ─── Base ───────────────────────────────────────────── */
        .hero {
          min-height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 120px 5% 100px;
        }

        /* ─── Background ─────────────────────────────────────── */
        .hero__bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .hero__bg-slide {
          position: absolute;
          inset: -8%;
          background-size: cover;
          background-position: center top;
          opacity: 0;
          transition: opacity 1s cubic-bezier(.4,0,.2,1),
                      transform 8s cubic-bezier(.25,.46,.45,.94);
          will-change: opacity, transform;
        }
        .hero__bg-slide--active {
          opacity: 1;
          z-index: 1;
        }
        .hero__bg-slide--exit {
          opacity: 0;
          z-index: 0;
        }
        .hero__overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
        }
        .hero__overlay--base {
          background: rgba(10, 4, 20, 0.55);
        }
        .hero__overlay--gradient {
          background: linear-gradient(
            135deg,
            rgba(10, 4, 20, 0.75) 0%,
            rgba(50, 10, 90, 0.4) 50%,
            rgba(10, 4, 20, 0.7) 100%
          );
        }
        .hero__overlay--vignette {
          background: radial-gradient(
            ellipse at center,
            transparent 30%,
            rgba(10, 4, 20, 0.7) 100%
          );
        }
        .hero__grain {
          position: absolute;
          inset: 0;
          z-index: 3;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }

        /* ─── Geometry ───────────────────────────────────────── */
        .hero__geo {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
        }
        .hero__geo-ring {
          position: absolute;
          top: 50%; left: 50%;
          border-radius: 50%;
          border: 1px solid rgba(201,168,76,0.1);
        }
        .hero__geo-ring--1 {
          width: 900px; height: 900px;
          animation: spinSlow 40s linear infinite;
          border-style: dashed;
        }
        .hero__geo-ring--2 {
          width: 600px; height: 600px;
          animation: spinSlow 25s linear infinite reverse;
          border-color: rgba(201,168,76,0.07);
        }
        @keyframes spinSlow {
          to { transform: translate(-50%,-50%) rotate(360deg); }
        }
        .hero__geo-line {
          position: absolute;
          top: 0; bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom,
            transparent,
            rgba(201,168,76,0.12) 30%,
            rgba(201,168,76,0.12) 70%,
            transparent
          );
        }
        .hero__geo-line--left  { left: 5%; }
        .hero__geo-line--right { right: 5%; }

        /* ─── Slide counter ───────────────────────────────────── */
        .hero__counter {
          position: absolute;
          top: 50%;
          right: 2rem;
          transform: translateY(-50%);
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
        }
        .hero__counter-current,
        .hero__counter-total {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 2px;
          color: rgba(245,228,168,0.5);
          font-variant-numeric: tabular-nums;
        }
        .hero__counter-current { color: var(--gold, #c9a84c); }
        .hero__counter-track {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .hero__counter-pip {
          width: 2px;
          height: 16px;
          background: rgba(255,255,255,0.2);
          border-radius: 2px;
          transition: height 0.3s, background 0.3s;
        }
        .hero__counter-pip--active {
          height: 32px;
          background: var(--gold, #c9a84c);
        }

        /* ─── Content ────────────────────────────────────────── */
        .hero__content {
          position: relative;
          z-index: 5;
          max-width: 820px;
          text-align: center;
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 1.2s ease, transform 1.2s ease;
        }
        .hero--loaded .hero__content {
          opacity: 1;
          transform: translateY(0);
        }

        /* Eyebrow */
        .hero__eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 2rem;
        }
        .hero__eyebrow-line {
          flex: 1;
          max-width: 60px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.5));
        }
        .hero__eyebrow-line:last-child {
          background: linear-gradient(90deg, rgba(201,168,76,0.5), transparent);
        }
        .hero__eyebrow-text {
          font-size: 0.58rem;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: var(--gold, #c9a84c);
          white-space: nowrap;
        }

        /* Title */
        .hero__title {
          font-family: 'Didot', 'Bodoni MT', 'Playfair Display', 'Georgia', serif;
          font-size: clamp(3.5rem, 10vw, 7.5rem);
          font-weight: 900;
          color: #f8f2e8;
          line-height: 0.95;
          margin-bottom: 1.5rem;
          letter-spacing: -2px;
          text-shadow:
            0 0 80px rgba(201,168,76,0.15),
            0 4px 40px rgba(0,0,0,0.5);
        }
        .hero__title-word--1 {
          color: var(--gold-light, #f5e4a8);
          display: inline-block;
          position: relative;
        }
        .hero__title-word--1::after {
          content: '';
          position: absolute;
          bottom: 4px; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--gold, #c9a84c), transparent);
          border-radius: 2px;
        }
        .hero__title-word--2 {
          font-style: italic;
          color: #fff;
        }
        .hero__title-word--3 { color: rgba(248,242,232,0.75); }

        /* Tagline */
        .hero__tagline {
          font-family: 'Cormorant Garamond', 'Garamond', 'Georgia', serif;
          font-size: clamp(1.1rem, 2.8vw, 1.75rem);
          font-style: italic;
          color: rgba(245,228,168,0.75);
          margin-bottom: 1.6rem;
          letter-spacing: 0.5px;
        }

        /* Caption pill */
        .hero__caption {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(201,168,76,0.1);
          border: 1px solid rgba(201,168,76,0.3);
          backdrop-filter: blur(12px);
          padding: 8px 20px;
          border-radius: 999px;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--gold-light, #f5e4a8);
          margin-bottom: 2rem;
          animation: fadeUp 0.6s ease forwards;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero__caption-pulse {
          width: 7px; height: 7px;
          background: var(--gold, #c9a84c);
          border-radius: 50%;
          animation: pulse 2s ease infinite;
          box-shadow: 0 0 8px rgba(201,168,76,0.6);
          flex-shrink: 0;
        }
        @keyframes pulse {
          0%,100% { transform: scale(1); opacity: 1; }
          50%      { transform: scale(0.6); opacity: 0.4; }
        }

        /* Divider */
        .hero__divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 2.5rem;
        }
        .hero__divider span:first-child,
        .hero__divider span:last-child {
          display: block;
          width: 80px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent);
        }
        .hero__divider-gem {
          color: var(--gold, #c9a84c);
          font-size: 0.55rem;
          opacity: 0.6;
        }

        /* CTAs */
        .hero__ctas {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }
        .hero__cta {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          border-radius: 4px;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          text-decoration: none;
          overflow: hidden;
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .hero__cta:hover { transform: translateY(-3px); }
        .hero__cta--primary {
          background: linear-gradient(135deg, #c9a84c, #e8c96a);
          color: #1a0f00;
          box-shadow: 0 8px 32px rgba(201,168,76,0.4);
        }
        .hero__cta--primary:hover {
          box-shadow: 0 14px 40px rgba(201,168,76,0.55);
        }
        .hero__cta-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #e8c96a, #c9a84c);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .hero__cta--primary:hover .hero__cta-bg { opacity: 1; }
        .hero__cta--outline {
          border: 1px solid rgba(201,168,76,0.45);
          color: var(--gold-light, #f5e4a8);
          background: rgba(201,168,76,0.06);
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        }
        .hero__cta--outline:hover {
          background: rgba(201,168,76,0.14);
          border-color: rgba(201,168,76,0.7);
          box-shadow: 0 14px 40px rgba(0,0,0,0.3);
        }
        .hero__cta-label { position: relative; z-index: 1; }
        .hero__cta-icon  { font-size: 1rem; position: relative; z-index: 1; }

        /* Dots */
        .hero__dots {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin-bottom: 3rem;
        }
        .hero__dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          border: 1.5px solid rgba(201,168,76,0.4);
          background: transparent;
          cursor: pointer;
          padding: 0;
          position: relative;
          transition: all 0.35s ease;
          display: flex; align-items: center; justify-content: center;
        }
        .hero__dot--active {
          border-color: var(--gold, #c9a84c);
          width: 32px;
          border-radius: 5px;
        }
        .hero__dot-fill {
          position: absolute;
          inset: 2px;
          background: var(--gold, #c9a84c);
          border-radius: 3px;
          transform: scaleX(0);
          transition: transform 0.35s ease;
          transform-origin: left;
        }
        .hero__dot--active .hero__dot-fill { transform: scaleX(1); }

        /* Stats */
        .hero__stats {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 0;
        }
        .hero__stat {
          text-align: center;
          padding: 0 2.5rem;
          position: relative;
        }
        .hero__stat + .hero__stat::before {
          content: '';
          position: absolute;
          left: 0; top: 10%; bottom: 10%;
          width: 1px;
          background: rgba(201,168,76,0.2);
        }
        .hero__stat-num {
          font-family: 'Didot', 'Bodoni MT', 'Playfair Display', 'Georgia', serif;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 900;
          color: var(--gold-light, #f5e4a8);
          display: block;
          line-height: 1;
          text-shadow: 0 0 30px rgba(201,168,76,0.3);
        }
        .hero__stat-label {
          font-size: 0.52rem;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          display: block;
          margin-top: 6px;
        }

        /* ─── Service badge ──────────────────────────────────── */
        .hero__badge {
          position: absolute;
          bottom: 44px;
          right: calc(5% + 2rem);
          z-index: 6;
          text-align: right;
          animation: fadeUp 0.5s ease forwards;
        }
        .hero__badge-num {
          font-family: 'Didot', 'Bodoni MT', 'Playfair Display', 'Georgia', serif;
          font-size: 4rem;
          font-weight: 900;
          color: rgba(201,168,76,0.1);
          line-height: 1;
          letter-spacing: -3px;
        }
        .hero__badge-name {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(245,228,168,0.5);
          margin-bottom: 6px;
        }
        .hero__badge-bar {
          height: 2px;
          background: rgba(255,255,255,0.1);
          border-radius: 2px;
          overflow: hidden;
          width: 80px;
          margin-left: auto;
        }
        .hero__badge-fill {
          display: block;
          height: 100%;
          background: linear-gradient(90deg, var(--gold, #c9a84c), var(--gold-light, #f5e4a8));
          animation: progressBar 5.5s linear forwards;
          border-radius: 2px;
        }
        @keyframes progressBar { from { width: 0; } to { width: 100%; } }

        /* ─── Thumbnail strip ────────────────────────────────── */
        .hero__thumbs {
          position: absolute;
          left: 2rem;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .hero__thumb {
          width: 48px;
          height: 48px;
          border-radius: 6px;
          background-size: cover;
          background-position: center top;
          border: 1.5px solid rgba(255,255,255,0.1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.25s, border-color 0.25s, height 0.35s;
        }
        .hero__thumb--active {
          height: 72px;
          border-color: var(--gold, #c9a84c);
          box-shadow: 0 0 20px rgba(201,168,76,0.35);
        }
        .hero__thumb-overlay {
          position: absolute;
          inset: 0;
          background: rgba(10,4,20,0.5);
          transition: background 0.25s;
        }
        .hero__thumb--active .hero__thumb-overlay { background: rgba(10,4,20,0.1); }
        .hero__thumb:hover { transform: scale(1.05); }

        /* ─── Scroll indicator ───────────────────────────────── */
        .hero__scroll {
          position: absolute;
          bottom: 44px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 6;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .hero__scroll-mouse {
          width: 22px; height: 34px;
          border: 1.5px solid rgba(201,168,76,0.35);
          border-radius: 12px;
          display: flex;
          justify-content: center;
          padding-top: 6px;
        }
        .hero__scroll-wheel {
          width: 3px; height: 6px;
          background: var(--gold, #c9a84c);
          border-radius: 2px;
          animation: scrollWheel 2s ease infinite;
        }
        @keyframes scrollWheel {
          0%   { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(10px); }
        }
        .hero__scroll-text {
          font-size: 0.5rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(201,168,76,0.4);
        }

        /* ─── Responsive ─────────────────────────────────────── */
        @media (max-width: 768px) {
          .hero { padding: 100px 5% 100px; }
          .hero__thumbs { display: none; }
          .hero__counter { display: none; }
          .hero__badge { display: none; }
          .hero__ctas { flex-direction: column; align-items: center; }
          .hero__stat { padding: 0 1.5rem; }
          .hero__title { letter-spacing: -1px; }
          .hero__stats { gap: 0; }
        }
        @media (max-width: 480px) {
          .hero__stat + .hero__stat::before { display: none; }
          .hero__stat { padding: 0 1rem; }
        }
      `}</style>
    </section>
  );
}