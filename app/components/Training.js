'use client';
import { useEffect, useRef } from 'react';

const SKILLS = [
  { icon: '💆', title: 'Hair Fixing',        desc: 'Professional attachment techniques for natural and relaxed hair.' },
  { icon: '👑', title: 'Wig Making',          desc: 'From lace fronts to full wigs — construction, customisation & styling.' },
  { icon: '🌀', title: 'Braiding & Twisting', desc: 'Box braids, knotless, passion twists and protective styles.' },
  { icon: '✨', title: 'Frontal Installation', desc: 'Seamless lace frontals and closures — glued, sewn and glueless.' },
  { icon: '🎨', title: 'Colouring & Toning',  desc: 'Highlights, balayage and full colour on extensions and natural hair.' },
  { icon: '💼', title: 'Business Launch',      desc: 'Pricing, client management and marketing to launch your brand.' },
];

const STATS = [
  { value: '500+', label: 'Graduates' },
  { value: '6',    label: 'Core Modules' },
  { value: '100%', label: 'Hands-On' },
];

export default function Training() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.07 }
    );
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="training" className="tr" ref={ref}>

      {/* ── Background layers ── */}
      <div className="tr__bg-grid" />
      <div className="tr__orb tr__orb--gold" />
      <div className="tr__orb tr__orb--purple" />

      <div className="tr__inner">

        {/* ── Hero band ── */}
        <div className="tr__hero reveal">
          <div className="tr__hero-left">
            <span className="tr__eyebrow">✦ Learn from the Best</span>
            <h2 className="tr__title">
              Turn Your Passion<br />
              Into a <em>Profession</em>
            </h2>
            <p className="tr__lead">
              Our hands-on professional programme covers everything —
              from hair fixing and frontal installation to running your
              own thriving beauty business.
            </p>

            {/* Stats row */}
            <div className="tr__stats">
              {STATS.map(s => (
                <div key={s.label} className="tr__stat">
                  <span className="tr__stat-val">{s.value}</span>
                  <span className="tr__stat-label">{s.label}</span>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/2349025317070?text=Hello!%20I'm%20interested%20in%20the%20full%20hair%20training%20program."
              className="tr__cta"
              target="_blank" rel="noopener noreferrer"
            >
              <span>💬</span>
              <span>Enquire About Training</span>
              <span className="tr__cta-arrow">→</span>
            </a>
          </div>

          {/* Right — decorative cert card */}
          <div className="tr__cert-wrap">
            <div className="tr__cert">
              <div className="tr__cert-shine" />
              <span className="tr__cert-icon">🎓</span>
              <p className="tr__cert-title">Professional<br />Certification</p>
              <div className="tr__cert-line" />
              <p className="tr__cert-sub">Gracious Hair Academy</p>
              <div className="tr__cert-dots">
                {[...Array(3)].map((_, i) => <span key={i} className="tr__cert-dot" />)}
              </div>
            </div>
          </div>
        </div>

        {/* ── Skills grid ── */}
        <div className="tr__skills-header reveal" style={{ transitionDelay: '0.1s' }}>
          <span className="tr__section-tag">What You'll Learn</span>
        </div>

        <div className="tr__grid">
          {SKILLS.map((s, i) => (
            <div
              key={s.title}
              className="tr__card reveal"
              style={{ transitionDelay: `${0.12 + i * 0.07}s` }}
            >
              <div className="tr__card-top">
                <span className="tr__card-icon">{s.icon}</span>
                <div className="tr__card-num">0{i + 1}</div>
              </div>
              <h3 className="tr__card-title">{s.title}</h3>
              <p className="tr__card-desc">{s.desc}</p>
              <div className="tr__card-bar" />
            </div>
          ))}
        </div>

        {/* ── Bottom CTA strip ── */}
        <div className="tr__bottom reveal" style={{ transitionDelay: '0.6s' }}>
          <p className="tr__bottom-text">
            Ready to start? Message us on WhatsApp and we'll walk you through everything.
          </p>
          <a
            href="https://wa.me/2349025317070?text=Hello!%20I'm%20interested%20in%20the%20full%20hair%20training%20program."
            className="tr__bottom-btn"
            target="_blank" rel="noopener noreferrer"
          >
            Start Your Journey ✦
          </a>
        </div>

      </div>

      <style jsx>{`
        /* ══ SHELL ══════════════════════════════════════════ */
        .tr {
          background: #0a0612;
          position: relative;
          overflow: hidden;
          padding-bottom: 6rem;
        }

        /* Background grid lines */
        .tr__bg-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        /* Orbs */
        .tr__orb {
          position: absolute; border-radius: 50%;
          pointer-events: none; filter: blur(80px);
        }
        .tr__orb--gold {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(201,168,76,0.09) 0%, transparent 70%);
          top: -200px; right: -100px;
        }
        .tr__orb--purple {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(62,15,107,0.5) 0%, transparent 70%);
          bottom: -100px; left: -100px;
        }

        .tr__inner {
          position: relative; z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 6rem 5% 0;
        }

        /* ══ REVEAL ══════════════════════════════════════════ */
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        /* ══ HERO BAND ══════════════════════════════════════ */
        .tr__hero {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 4rem;
          align-items: center;
          margin-bottom: 5rem;
          padding-bottom: 4rem;
          border-bottom: 1px solid rgba(201,168,76,0.1);
        }

        .tr__hero-left {
          display: flex; flex-direction: column; gap: 1.4rem;
        }

        .tr__eyebrow {
          font-size: 0.58rem; font-weight: 700;
          letter-spacing: 5px; text-transform: uppercase;
          color: #C9A84C;
        }
        .tr__title {
          font-family: Georgia, serif;
          font-size: clamp(2.2rem, 4.5vw, 3.8rem);
          font-weight: 900; color: #FFFDF7;
          line-height: 1.1;
        }
        .tr__title em { color: #E8C96A; font-style: italic; }

        .tr__lead {
          font-size: 0.92rem;
          color: rgba(255,253,247,0.55);
          line-height: 1.85;
          max-width: 500px;
        }

        /* Stats */
        .tr__stats {
          display: flex; gap: 2.5rem;
          padding: 1.5rem 0;
          border-top: 1px solid rgba(201,168,76,0.1);
          border-bottom: 1px solid rgba(201,168,76,0.1);
        }
        .tr__stat { display: flex; flex-direction: column; gap: 3px; }
        .tr__stat-val {
          font-family: Georgia, serif;
          font-size: 2rem; font-weight: 900; color: #E8C96A;
          line-height: 1;
        }
        .tr__stat-label {
          font-size: 0.6rem; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase;
          color: rgba(255,253,247,0.35);
        }

        /* CTA button */
        .tr__cta {
          display: inline-flex; align-items: center; gap: 10px;
          align-self: flex-start;
          background: linear-gradient(135deg, #3E0F6B, #6B2FA0);
          border: 1px solid rgba(201,168,76,0.25);
          border-radius: 8px;
          padding: 14px 26px;
          color: #E8C96A;
          font-size: 0.72rem; font-weight: 800;
          letter-spacing: 1.5px; text-transform: uppercase;
          text-decoration: none;
          transition: all 0.25s;
          box-shadow: 0 8px 28px rgba(62,15,107,0.4);
        }
        .tr__cta:hover {
          background: linear-gradient(135deg, #5C1F96, #9B4FC8);
          transform: translateY(-2px);
          box-shadow: 0 14px 36px rgba(62,15,107,0.55);
        }
        .tr__cta-arrow { transition: transform 0.2s; }
        .tr__cta:hover .tr__cta-arrow { transform: translateX(4px); }

        /* ── Cert card ── */
        .tr__cert-wrap {
          display: flex; align-items: center; justify-content: center;
        }
        .tr__cert {
          width: 260px;
          background: linear-gradient(145deg, #1e0840, #3E0F6B);
          border: 1px solid rgba(201,168,76,0.3);
          border-radius: 20px;
          padding: 2.5rem 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.1);
        }
        .tr__cert-shine {
          position: absolute; top: -60px; left: -60px;
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 60%);
          pointer-events: none;
        }
        .tr__cert-icon { font-size: 3rem; display: block; margin-bottom: 1rem; }
        .tr__cert-title {
          font-family: Georgia, serif;
          font-size: 1.1rem; font-weight: 700;
          color: #FFFDF7; line-height: 1.3;
          margin-bottom: 1.2rem;
        }
        .tr__cert-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent);
          margin-bottom: 1rem;
        }
        .tr__cert-sub {
          font-size: 0.65rem; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase;
          color: #C9A84C;
          margin-bottom: 1.5rem;
        }
        .tr__cert-dots { display: flex; gap: 6px; justify-content: center; }
        .tr__cert-dot {
          width: 28px; height: 4px; border-radius: 2px;
          background: rgba(201,168,76,0.3);
        }
        .tr__cert-dot:first-child { background: #C9A84C; }

        /* ══ SKILLS GRID ════════════════════════════════════ */
        .tr__skills-header { margin-bottom: 2rem; }
        .tr__section-tag {
          font-size: 0.58rem; font-weight: 700;
          letter-spacing: 4px; text-transform: uppercase;
          color: rgba(201,168,76,0.6);
          padding: 6px 14px;
          border: 1px solid rgba(201,168,76,0.15);
          border-radius: 20px;
          background: rgba(201,168,76,0.05);
        }

        .tr__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.2rem;
          margin-bottom: 4rem;
        }

        .tr__card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(201,168,76,0.1);
          border-radius: 14px;
          padding: 1.8rem 1.6rem;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          cursor: default;
        }
        .tr__card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, #C9A84C, transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .tr__card:hover {
          transform: translateY(-6px);
          border-color: rgba(201,168,76,0.28);
          box-shadow: 0 20px 50px rgba(0,0,0,0.4);
        }
        .tr__card:hover::before { opacity: 1; }

        .tr__card-top {
          display: flex; align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        .tr__card-icon { font-size: 1.8rem; }
        .tr__card-num {
          font-family: Georgia, serif;
          font-size: 1.4rem; font-weight: 900;
          color: rgba(201,168,76,0.12);
          line-height: 1;
        }
        .tr__card-title {
          font-family: Georgia, serif;
          font-size: 1rem; font-weight: 700;
          color: #f5f0eb; margin-bottom: 0.5rem;
          line-height: 1.2;
        }
        .tr__card-desc {
          font-size: 0.75rem;
          color: rgba(245,240,235,0.45);
          line-height: 1.7;
          margin-bottom: 1.2rem;
        }
        .tr__card-bar {
          height: 2px; width: 32px;
          background: linear-gradient(90deg, #C9A84C, transparent);
          border-radius: 1px;
          transition: width 0.3s ease;
        }
        .tr__card:hover .tr__card-bar { width: 100%; }

        /* ══ BOTTOM STRIP ════════════════════════════════════ */
        .tr__bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          padding: 2.5rem 3rem;
          background: linear-gradient(135deg, rgba(62,15,107,0.4), rgba(30,8,64,0.6));
          border: 1px solid rgba(201,168,76,0.15);
          border-radius: 16px;
          flex-wrap: wrap;
        }
        .tr__bottom-text {
          font-size: 0.88rem;
          color: rgba(255,253,247,0.55);
          line-height: 1.7;
          max-width: 500px;
          font-style: italic;
          font-family: Georgia, serif;
        }
        .tr__bottom-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #C9A84C, #E8C96A);
          color: #1a0f00;
          padding: 13px 26px; border-radius: 8px;
          font-size: 0.68rem; font-weight: 800;
          letter-spacing: 1.5px; text-transform: uppercase;
          text-decoration: none; white-space: nowrap; flex-shrink: 0;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 6px 24px rgba(201,168,76,0.25);
        }
        .tr__bottom-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(201,168,76,0.4);
        }

        /* ══ RESPONSIVE ══════════════════════════════════════ */
        @media (max-width: 960px) {
          .tr__hero { grid-template-columns: 1fr; gap: 3rem; }
          .tr__cert-wrap { display: none; }
          .tr__grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .tr__inner { padding: 4rem 5% 0; }
          .tr__grid { grid-template-columns: 1fr; }
          .tr__stats { gap: 1.5rem; }
          .tr__bottom { flex-direction: column; text-align: center; padding: 2rem 1.5rem; }
          .tr__bottom-btn { align-self: stretch; justify-content: center; }
        }
      `}</style>
    </section>
  );
}