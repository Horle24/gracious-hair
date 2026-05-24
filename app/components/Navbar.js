'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '../components/CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, setOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['services', 'shop', 'gallery', 'contact'];

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>

      {/* ── Logo ── */}
      <a href="#hero" className="navbar__logo-link" aria-label="Gracious Hair Extension – Home">
        <Image
          src="/logo.svg"
          alt="Gracious Hair Extension logo"
          width={190}
          height={52}
          priority
          className="navbar__logo-img"
        />
      </a>

      {/* ── Nav links ── */}
      <ul className={`navbar__links${menuOpen ? ' navbar__links--open' : ''}`}>
        {links.map(s => (
          <li key={s}>
            <a
              href={`#${s}`}
              className="navbar__link"
              onClick={() => setMenuOpen(false)}
            >
              {s}
            </a>
          </li>
        ))}
        <li>
          <a
            href="https://wa.me/2349025317070?text=Hello%20Gracious%20Hair%20Extension!"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__wa-btn"
            onClick={() => setMenuOpen(false)}
          >
            <span className="navbar__wa-icon">💬</span>
            Chat Us
          </a>
        </li>
      </ul>

      {/* ── Right controls ── */}
      <div className="navbar__right">
        <button
          className="navbar__cart-btn"
          onClick={() => setOpen(o => !o)}
          title="View Cart"
          aria-label="Open cart"
        >
          🛒
          {count > 0 && (
            <span className="navbar__cart-badge" aria-label={`${count} items`}>
              {count}
            </span>
          )}
        </button>

        <button
          className={`hamburger${menuOpen ? ' hamburger--open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      <style jsx>{`
        /* ── Base ── */
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 4%;
          background: rgba(28, 6, 50, 0.96);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(201,168,76,0.22);
          transition: background 0.35s ease, box-shadow 0.35s ease;
        }
        .navbar--scrolled {
          background: rgba(18, 3, 36, 0.99);
          box-shadow: 0 4px 30px rgba(0,0,0,0.35);
        }

        /* ── Logo ── */
        .navbar__logo-link {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          transition: opacity 0.2s;
        }
        .navbar__logo-link:hover { opacity: 0.88; }
        .navbar__logo-img {
          height: 48px;
          width: auto;
          object-fit: contain;
          filter: drop-shadow(0 2px 8px rgba(201,168,76,0.25));
        }

        /* ── Links ── */
        .navbar__links {
          display: flex;
          align-items: center;
          gap: 2.2rem;
          list-style: none;
        }
        .navbar__link {
          color: rgba(255,255,255,0.7);
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          text-decoration: none;
          padding-bottom: 2px;
          border-bottom: 1px solid transparent;
          transition: color 0.25s, border-color 0.25s;
        }
        .navbar__link:hover {
          color: var(--gold-light);
          border-color: rgba(201,168,76,0.5);
        }

        /* WhatsApp button */
        .navbar__wa-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, var(--gold-light), var(--gold));
          color: var(--purple-dark);
          padding: 9px 18px;
          border-radius: 3px;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
          white-space: nowrap;
        }
        .navbar__wa-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 5px 18px rgba(201,168,76,0.42);
        }
        .navbar__wa-icon { font-size: 0.9rem; }

        /* ── Right controls ── */
        .navbar__right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .navbar__cart-btn {
          position: relative;
          background: none;
          border: none;
          font-size: 1.25rem;
          cursor: pointer;
          padding: 4px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
        }
        .navbar__cart-btn:hover { transform: scale(1.12); }

        .navbar__cart-badge {
          position: absolute;
          top: -4px; right: -7px;
          background: linear-gradient(135deg, var(--gold-light), var(--gold));
          color: var(--purple-dark);
          font-size: 0.58rem;
          font-weight: 700;
          min-width: 18px;
          height: 18px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 3px;
          line-height: 1;
          animation: badgePop 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes badgePop {
          from { transform: scale(0); }
          to   { transform: scale(1); }
        }

        /* ── Hamburger ── */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          padding: 5px;
          background: none;
          border: none;
          cursor: pointer;
        }
        .hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: var(--gold-light);
          border-radius: 2px;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .hamburger--open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger--open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger--open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── Mobile ── */
        @media (max-width: 860px) {
          .hamburger { display: flex; }

          .navbar__links {
            display: none;
            position: fixed;
            top: 72px; left: 0; right: 0;
            flex-direction: column;
            align-items: flex-start;
            gap: 0;
            background: rgba(18, 3, 36, 0.98);
            border-top: 1px solid rgba(201,168,76,0.15);
            border-bottom: 1px solid rgba(201,168,76,0.1);
            padding: 0.5rem 0;
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
          }
          .navbar__links--open { display: flex; }

          .navbar__links li {
            width: 100%;
          }
          .navbar__link {
            display: block;
            padding: 1rem 5%;
            font-size: 0.82rem;
            border-bottom: 1px solid rgba(201,168,76,0.07);
            border-left: none;
          }
          .navbar__link:hover {
            background: rgba(201,168,76,0.06);
            border-color: rgba(201,168,76,0.07);
          }
          .navbar__wa-btn {
            display: inline-flex;
            margin: 0.75rem 5%;
            width: auto;
            justify-content: center;
          }

          .navbar__logo-img {
            height: 42px;
          }
        }
      `}</style>
    </nav>
  );
}