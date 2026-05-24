'use client';
import { useEffect, useRef } from 'react';

const SOCIALS = [
  {
    key: 'whatsapp1',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    label: '09025317070',
    sub: 'WhatsApp / Call',
    href: 'https://wa.me/2349025317070',
    color: '#25D366',
    bg: 'rgba(37,211,102,0.08)',
    border: 'rgba(37,211,102,0.2)',
  },
  {
    key: 'whatsapp2',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    label: '08145413560',
    sub: 'WhatsApp / Call',
    href: 'https://wa.me/2348145413560',
    color: '#25D366',
    bg: 'rgba(37,211,102,0.08)',
    border: 'rgba(37,211,102,0.2)',
  },
  {
    key: 'instagram',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
    label: '@gracious_hair_extension',
    sub: 'Instagram',
    href: 'https://instagram.com/gracious_hair_extension',
    color: '#E1306C',
    bg: 'rgba(225,48,108,0.08)',
    border: 'rgba(225,48,108,0.2)',
  },
  {
    key: 'tiktok',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
      </svg>
    ),
    label: '@homeofbeauty023',
    sub: 'TikTok',
    href: 'https://tiktok.com/@homeofbeauty023',
    color: '#ff0050',
    bg: 'rgba(255,0,80,0.08)',
    border: 'rgba(255,0,80,0.2)',
  },
  {
    key: 'facebook',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    label: 'Coming soon',
    sub: 'Facebook',
    href: '#',
    color: '#1877F2',
    bg: 'rgba(24,119,242,0.08)',
    border: 'rgba(24,119,242,0.2)',
    disabled: true,
  },
  {
    key: 'email',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: 'Coming soon',
    sub: 'Email',
    href: '#',
    color: '#C9A84C',
    bg: 'rgba(201,168,76,0.08)',
    border: 'rgba(201,168,76,0.2)',
    disabled: true,
  },
];

export default function Contact() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="ct" ref={ref}>

      {/* ── Decorative top border ── */}
      <div className="ct__top-rule" />

      <div className="ct__inner">

        {/* ── Header ── */}
        <div className="ct__header reveal">
          <span className="ct__eyebrow">✦ Find Us</span>
          <h2 className="ct__title">Get In <em>Touch</em></h2>
          <p className="ct__sub">We're always happy to help — reach us on any platform below.</p>
        </div>

        {/* ── Main grid ── */}
        <div className="ct__grid">

          {/* Left col — address + socials */}
          <div className="ct__left">

            {/* Address card */}
            <div className="ct__address reveal">
              <span className="ct__card-eyebrow">📍 Our Location</span>
              <p className="ct__address-text">
                31 Oguntana Ogundeji Str.,<br />
                Off Ajala Bus-Stop,<br />
                Ijaiye, Ojokoro, Lagos.
              </p>
              <a
                href="https://maps.google.com/?q=Ijaiye+Ojokoro+Lagos+Nigeria"
                className="ct__directions"
                target="_blank" rel="noopener noreferrer"
              >
                Get Directions ↗
              </a>
            </div>

            {/* Social / contact links */}
            <div className="ct__socials reveal" style={{ transitionDelay: '0.1s' }}>
              <span className="ct__card-eyebrow">💬 Reach Us</span>
              <div className="ct__links">
                {SOCIALS.map(s => (
                  <a
                    key={s.key}
                    href={s.href}
                    className={`ct__link${s.disabled ? ' ct__link--disabled' : ''}`}
                    target={s.disabled ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    style={{
                      '--link-color':  s.color,
                      '--link-bg':     s.bg,
                      '--link-border': s.border,
                    }}
                    onClick={s.disabled ? e => e.preventDefault() : undefined}
                  >
                    <span className="ct__link-icon">{s.icon}</span>
                    <span className="ct__link-text">
                      <span className="ct__link-sub">{s.sub}</span>
                      <span className="ct__link-label">{s.label}</span>
                    </span>
                    {s.disabled && <span className="ct__link-badge">Soon</span>}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right col — real Google Map */}
          <div className="ct__map-col reveal" style={{ transitionDelay: '0.2s' }}>
            <span className="ct__card-eyebrow">🗺 On The Map</span>
            <div className="ct__map-frame">
              <iframe
                title="Gracious Hair Extension Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.0!2d3.3209!3d6.6412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzgnMjguMyJOIDPCsDE5JzE1LjIiRQ!5e0!3m2!1sen!2sng!4v1!5m2!1sen!2sng&q=Ijaiye+Ojokoro+Lagos+Nigeria&iwloc=B"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Map overlay gradient at bottom */}
              <div className="ct__map-fade" />
            </div>
            <a
              href="https://maps.google.com/?q=Ijaiye+Ojokoro+Lagos+Nigeria"
              className="ct__map-open"
              target="_blank" rel="noopener noreferrer"
            >
              📍 Open in Google Maps
            </a>
          </div>

        </div>
      </div>

      <style jsx>{`
        /* ── Section shell ── */
        .ct {
          background: #0a0612;
          position: relative;
          overflow: hidden;
        }
        .ct__top-rule {
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%, rgba(201,168,76,0.4) 30%,
            rgba(201,168,76,0.4) 70%, transparent 100%);
        }
        .ct__inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 5rem 5% 6rem;
        }

        /* ── Reveal animation ── */
        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        /* ── Header ── */
        .ct__header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .ct__eyebrow {
          display: inline-block;
          font-size: 0.58rem; font-weight: 700;
          letter-spacing: 5px; text-transform: uppercase;
          color: #C9A84C; margin-bottom: 1rem;
        }
        .ct__title {
          font-family: Georgia, serif;
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 900; color: #FFFDF7;
          line-height: 1.08; margin-bottom: 0.9rem;
        }
        .ct__title em { color: #E8C96A; font-style: italic; }
        .ct__sub {
          font-size: 0.88rem;
          color: rgba(255,253,247,0.45);
          font-style: italic;
          font-family: Georgia, serif;
        }

        /* ── 2-col grid ── */
        .ct__grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 2.5rem;
          align-items: start;
        }

        /* Shared card eyebrow */
        .ct__card-eyebrow {
          display: block;
          font-size: 0.56rem; font-weight: 700;
          letter-spacing: 3px; text-transform: uppercase;
          color: rgba(201,168,76,0.6);
          margin-bottom: 1rem;
        }

        /* ── Address card ── */
        .ct__address {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,168,76,0.12);
          border-radius: 14px;
          padding: 1.8rem 2rem;
          margin-bottom: 1.5rem;
          position: relative;
          overflow: hidden;
        }
        .ct__address::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, #C9A84C, transparent);
        }
        .ct__address-text {
          font-size: 0.9rem;
          color: rgba(245,240,235,0.7);
          line-height: 1.9;
          margin-bottom: 1.2rem;
        }
        .ct__directions {
          font-size: 0.65rem; font-weight: 700;
          letter-spacing: 1.5px; text-transform: uppercase;
          color: #C9A84C;
          text-decoration: none;
          border-bottom: 1px solid rgba(201,168,76,0.3);
          padding-bottom: 2px;
          transition: color 0.2s, border-color 0.2s;
        }
        .ct__directions:hover { color: #E8C96A; border-color: rgba(201,168,76,0.7); }

        /* ── Social links ── */
        .ct__socials {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,168,76,0.12);
          border-radius: 14px;
          padding: 1.8rem 2rem;
        }
        .ct__links {
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
        }
        .ct__link {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 16px;
          background: var(--link-bg);
          border: 1px solid var(--link-border);
          border-radius: 10px;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
          position: relative;
        }
        .ct__link:hover:not(.ct__link--disabled) {
          transform: translateX(5px);
          background: color-mix(in srgb, var(--link-bg) 200%, transparent);
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        .ct__link--disabled { opacity: 0.45; cursor: default; }
        .ct__link-icon {
          color: var(--link-color);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          width: 36px; height: 36px;
          background: rgba(255,255,255,0.05);
          border-radius: 8px;
        }
        .ct__link-text {
          display: flex; flex-direction: column; gap: 1px;
        }
        .ct__link-sub {
          font-size: 0.55rem; font-weight: 700;
          letter-spacing: 1.5px; text-transform: uppercase;
          color: rgba(245,240,235,0.35);
        }
        .ct__link-label {
          font-size: 0.82rem; font-weight: 600;
          color: var(--link-color);
        }
        .ct__link-badge {
          margin-left: auto;
          font-size: 0.5rem; font-weight: 800;
          letter-spacing: 1px; text-transform: uppercase;
          padding: 3px 8px; border-radius: 20px;
          background: rgba(201,168,76,0.12);
          color: rgba(201,168,76,0.5);
          border: 1px solid rgba(201,168,76,0.15);
        }

        /* ── Map column ── */
        .ct__map-col {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          position: sticky;
          top: 90px;
        }
        .ct__map-frame {
          position: relative;
          height: 420px;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(201,168,76,0.15);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }
        .ct__map-frame iframe {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          filter: invert(90%) hue-rotate(180deg) saturate(0.6) brightness(0.85);
        }
        .ct__map-fade {
          position: absolute; bottom: 0; left: 0; right: 0; height: 60px;
          background: linear-gradient(transparent, rgba(10,6,18,0.6));
          pointer-events: none;
        }
        .ct__map-open {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: linear-gradient(135deg, #C9A84C, #E8C96A);
          color: #1a0f00;
          padding: 13px 24px;
          border-radius: 8px;
          font-size: 0.68rem; font-weight: 800;
          letter-spacing: 1.5px; text-transform: uppercase;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 6px 24px rgba(201,168,76,0.25);
          align-self: stretch;
          text-align: center;
        }
        .ct__map-open:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(201,168,76,0.4);
        }

        /* ── Responsive ── */
        @media (max-width: 860px) {
          .ct__grid { grid-template-columns: 1fr; }
          .ct__map-col { position: static; }
          .ct__map-frame { height: 320px; }
        }
        @media (max-width: 480px) {
          .ct__inner { padding: 3.5rem 5% 4rem; }
          .ct__map-frame { height: 260px; }
          .ct__address, .ct__socials { padding: 1.4rem 1.2rem; }
        }
      `}</style>
    </section>
  );
}