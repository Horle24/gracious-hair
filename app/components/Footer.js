'use client';

const NAV_LINKS = [
  { label: 'Services',  href: '#services' },
  { label: 'Shop',      href: '#shop' },
  { label: 'Gallery',   href: '#gallery' },
  { label: 'Training',  href: '#training' },
  { label: 'Contact',   href: '#contact' },
];

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/gracious_hair_extension',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com/@homeofbeauty023',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/2349025317070',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="ft">

      {/* ── Top gold rule ── */}
      <div className="ft__rule" />

      {/* ── CTA band ── */}
      <div className="ft__cta-band">
        <div className="ft__cta-inner">
          <div className="ft__cta-orb" />
          <div className="ft__cta-text">
            <h3 className="ft__cta-title">Ready to look stunning?</h3>
            <p className="ft__cta-sub">Shop our premium collection or chat with us directly.</p>
          </div>
          <a
            href="https://wa.me/2349025317070?text=Hello!%20I'd%20like%20to%20place%20an%20order."
            className="ft__cta-btn"
            target="_blank" rel="noopener noreferrer"
          >
            💬 Chat With Us
          </a>
        </div>
      </div>

      {/* ── Main footer body ── */}
      <div className="ft__body">

        {/* Brand column */}
        <div className="ft__brand">
          <div className="ft__logo-wrap">
            <span className="ft__logo-mark">✦</span>
            <span className="ft__logo-text">Gracious<br /><em>Hair Extension</em></span>
          </div>
          <p className="ft__tagline">
            Premium hair extensions, wigs &amp; accessories — handpicked for beauty you can feel.
          </p>
          <div className="ft__socials">
            {SOCIALS.map(s => (
              <a
                key={s.label}
                href={s.href}
                className="ft__social"
                target="_blank" rel="noopener noreferrer"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="ft__col">
          <span className="ft__col-title">Quick Links</span>
          <nav className="ft__nav">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} className="ft__nav-link">
                <span className="ft__nav-dot">✦</span>
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Contact info */}
        <div className="ft__col">
          <span className="ft__col-title">Contact</span>
          <div className="ft__contact-list">
            <div className="ft__contact-item">
              <span className="ft__contact-icon">📍</span>
              <span>31 Oguntana Ogundeji Str.,<br />Off Ajala Bus-Stop,<br />Ijaiye, Ojokoro, Lagos.</span>
            </div>
            <a href="https://wa.me/2349025317070" className="ft__contact-item ft__contact-item--link" target="_blank" rel="noopener noreferrer">
              <span className="ft__contact-icon">📞</span>
              <span>09025317070</span>
            </a>
            <a href="https://wa.me/2348145413560" className="ft__contact-item ft__contact-item--link" target="_blank" rel="noopener noreferrer">
              <span className="ft__contact-icon">📞</span>
              <span>08145413560</span>
            </a>
            <div className="ft__contact-item">
              <span className="ft__contact-icon">🕐</span>
              <span>Mon – Sat: 8am – 7pm</span>
            </div>
          </div>
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className="ft__bottom">
        <div className="ft__bottom-inner">
          <p className="ft__copy">
            © {year} Gracious Hair Extension · All rights reserved
          </p>
          <p className="ft__made">
            ✦ Ijaiye, Ojokoro · Lagos, Nigeria
          </p>
        </div>
      </div>

      <style jsx>{`
        /* ══ SHELL ══════════════════════════════════════════ */
        .ft {
          background: #06030f;
          position: relative;
          overflow: hidden;
        }

        /* Top decorative rule */
        .ft__rule {
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(201,168,76,0.5) 30%,
            rgba(201,168,76,0.5) 70%,
            transparent 100%
          );
        }

        /* ══ CTA BAND ════════════════════════════════════════ */
        .ft__cta-band {
          padding: 0 5%;
          margin-top: -1px;
        }
        .ft__cta-inner {
          max-width: 1100px;
          margin: 0 auto;
          margin-top: 3.5rem;
          background: linear-gradient(135deg, #1a0535, #3E0F6B 50%, #250845);
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 18px;
          padding: 2.5rem 3rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
          position: relative;
          overflow: hidden;
        }
        .ft__cta-orb {
          position: absolute;
          width: 300px; height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%);
          right: -80px; top: -80px;
          pointer-events: none;
        }
        .ft__cta-text { position: relative; z-index: 1; }
        .ft__cta-title {
          font-family: Georgia, serif;
          font-size: 1.35rem; font-weight: 800;
          color: #FFFDF7; margin-bottom: 0.3rem;
        }
        .ft__cta-sub {
          font-size: 0.8rem;
          color: rgba(255,253,247,0.5);
        }
        .ft__cta-btn {
          position: relative; z-index: 1;
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #C9A84C, #E8C96A);
          color: #1a0f00;
          padding: 13px 26px; border-radius: 8px;
          font-size: 0.7rem; font-weight: 800;
          letter-spacing: 1.5px; text-transform: uppercase;
          text-decoration: none; white-space: nowrap; flex-shrink: 0;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 6px 24px rgba(201,168,76,0.3);
        }
        .ft__cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(201,168,76,0.45);
        }

        /* ══ MAIN BODY ═══════════════════════════════════════ */
        .ft__body {
          max-width: 1100px;
          margin: 0 auto;
          padding: 4rem 5% 3.5rem;
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr;
          gap: 4rem;
          border-bottom: 1px solid rgba(201,168,76,0.07);
        }

        /* Brand col */
        .ft__logo-wrap {
          display: flex; align-items: flex-start; gap: 12px;
          margin-bottom: 1.2rem;
        }
        .ft__logo-mark {
          font-size: 1.4rem; color: #C9A84C;
          line-height: 1; margin-top: 4px; flex-shrink: 0;
        }
        .ft__logo-text {
          font-family: Georgia, serif;
          font-size: 1.3rem; font-weight: 900;
          color: #FFFDF7; line-height: 1.2;
        }
        .ft__logo-text em { color: #E8C96A; font-style: italic; }
        .ft__tagline {
          font-size: 0.78rem;
          color: rgba(255,253,247,0.38);
          line-height: 1.8;
          margin-bottom: 1.8rem;
          max-width: 280px;
        }

        /* Socials */
        .ft__socials { display: flex; gap: 10px; }
        .ft__social {
          width: 38px; height: 38px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(201,168,76,0.15);
          border-radius: 10px;
          color: rgba(255,253,247,0.45);
          text-decoration: none;
          transition: all 0.2s;
        }
        .ft__social:hover {
          background: rgba(201,168,76,0.1);
          border-color: rgba(201,168,76,0.4);
          color: #E8C96A;
          transform: translateY(-2px);
        }

        /* Columns */
        .ft__col { display: flex; flex-direction: column; gap: 1.2rem; }
        .ft__col-title {
          font-size: 0.58rem; font-weight: 800;
          letter-spacing: 3.5px; text-transform: uppercase;
          color: #C9A84C;
          padding-bottom: 0.8rem;
          border-bottom: 1px solid rgba(201,168,76,0.1);
        }

        /* Nav links */
        .ft__nav { display: flex; flex-direction: column; gap: 0.65rem; }
        .ft__nav-link {
          display: flex; align-items: center; gap: 8px;
          font-size: 0.78rem;
          color: rgba(255,253,247,0.42);
          text-decoration: none;
          transition: color 0.2s, gap 0.2s;
        }
        .ft__nav-link:hover { color: #E8C96A; gap: 12px; }
        .ft__nav-dot {
          font-size: 0.4rem; color: rgba(201,168,76,0.35);
          transition: color 0.2s;
        }
        .ft__nav-link:hover .ft__nav-dot { color: #C9A84C; }

        /* Contact list */
        .ft__contact-list { display: flex; flex-direction: column; gap: 0.9rem; }
        .ft__contact-item {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 0.76rem;
          color: rgba(255,253,247,0.42);
          line-height: 1.7;
          text-decoration: none;
        }
        .ft__contact-item--link {
          transition: color 0.2s;
          cursor: pointer;
        }
        .ft__contact-item--link:hover { color: #E8C96A; }
        .ft__contact-icon { font-size: 0.85rem; flex-shrink: 0; margin-top: 2px; }

        /* ══ BOTTOM BAR ══════════════════════════════════════ */
        .ft__bottom {
          padding: 0 5%;
        }
        .ft__bottom-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 1.6rem 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .ft__copy {
          font-size: 0.6rem;
          color: rgba(255,253,247,0.2);
          letter-spacing: 0.8px;
        }
        .ft__made {
          font-size: 0.6rem;
          color: rgba(201,168,76,0.3);
          letter-spacing: 1px;
        }

        /* ══ RESPONSIVE ══════════════════════════════════════ */
        @media (max-width: 860px) {
          .ft__body {
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
          }
          .ft__brand { grid-column: 1 / -1; }
        }
        @media (max-width: 560px) {
          .ft__body { grid-template-columns: 1fr; gap: 2.5rem; }
          .ft__cta-inner { padding: 2rem 1.5rem; flex-direction: column; }
          .ft__cta-btn { align-self: stretch; text-align: center; justify-content: center; }
          .ft__bottom-inner { flex-direction: column; text-align: center; gap: 0.4rem; }
        }
      `}</style>
    </footer>
  );
}