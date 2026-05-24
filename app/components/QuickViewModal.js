'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductGallery from './ProductGallery';
import ProductReviews from './ProductReviews';

const TABS = [
  { key: 'gallery', label: '🖼 Gallery' },
  { key: 'details', label: '✦ Details' },
  { key: 'reviews', label: '★ Reviews' },
];

export default function QuickViewModal({ product, added, onAdd, onClose }) {
  const [tab, setTab] = useState('gallery');
  const router = useRouter();

  if (!product) return null;

  return (
    <div className="qv-backdrop" onClick={onClose}>
      <div className="qv-modal" onClick={e => e.stopPropagation()}>

        {/* Close */}
        <button className="qv-close" onClick={onClose} aria-label="Close">✕</button>

        {/* View full page link */}
        <button
          className="qv-fullpage"
          onClick={() => { onClose(); router.push(`/shop/${product.id}`); }}
        >
          Full Details ↗
        </button>

        <div className="qv-layout">
          {/* ── Left: Gallery ── */}
          <div className="qv-left">
            <ProductGallery productId={product.id} productName={product.name} compact />
          </div>

          {/* ── Right: Tabs ── */}
          <div className="qv-right">
            {/* Tab bar */}
            <div className="qv-tabs">
              {TABS.map(t => (
                <button
                  key={t.key}
                  className={`qv-tab${tab === t.key ? ' qv-tab--active' : ''}`}
                  onClick={() => setTab(t.key)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab panels */}
            <div className="qv-panel">
              {tab === 'gallery' && (
                <div className="qv-details">
                  <span className="qv-cat">{product.category}</span>
                  <h2 className="qv-name">{product.name}</h2>
                  <p className="qv-price">₦{product.price.toLocaleString()}</p>
                  <p className="qv-desc">{product.desc}</p>

                  <div className="qv-divider" />

                  <div className="qv-actions">
                    <button
                      className={`qv-add${added ? ' qv-add--done' : ''}`}
                      disabled={!product.available}
                      onClick={onAdd}
                    >
                      {!product.available ? 'Out of Stock' : added ? '✓ Added to Cart' : '+ Add to Cart'}
                    </button>
                    <a
                      href={`https://wa.me/2349025317070?text=Hello!%20I'm%20interested%20in%20${encodeURIComponent(product.name)}%20(₦${product.price.toLocaleString()}).%20Is%20it%20available?`}
                      className="qv-wa"
                      target="_blank" rel="noopener noreferrer"
                      onClick={onClose}
                    >
                      💬 Order via WhatsApp
                    </a>
                  </div>

                  <p className="qv-note">
                    💳 Pay on delivery · 🚚 Lagos delivery · ✦ 100% genuine hair
                  </p>
                </div>
              )}

              {tab === 'details' && (
                <div className="qv-details">
                  <span className="qv-cat">{product.category}</span>
                  <h2 className="qv-name">{product.name}</h2>
                  <p className="qv-price">₦{product.price.toLocaleString()}</p>
                  <div className="qv-divider" />
                  <p className="qv-desc-full">{product.desc}</p>
                  {product.details && (
                    <ul className="qv-attr-list">
                      {Object.entries(product.details).map(([k, v]) => (
                        <li key={k}><span className="qv-attr-key">{k}</span><span className="qv-attr-val">{v}</span></li>
                      ))}
                    </ul>
                  )}
                  <div className="qv-actions" style={{ marginTop: '1rem' }}>
                    <button
                      className={`qv-add${added ? ' qv-add--done' : ''}`}
                      disabled={!product.available}
                      onClick={onAdd}
                    >
                      {!product.available ? 'Out of Stock' : added ? '✓ Added to Cart' : '+ Add to Cart'}
                    </button>
                  </div>
                </div>
              )}

              {tab === 'reviews' && (
                <div className="qv-reviews-wrap">
                  <ProductReviews productId={product.id} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .qv-backdrop {
          position: fixed; inset: 0; z-index: 2000;
          background: rgba(5,2,12,0.88);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .qv-modal {
          width: 100%; max-width: 900px;
          background: #100920;
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          animation: modalUp 0.3s cubic-bezier(0.34,1.56,0.64,1);
          box-shadow: 0 40px 100px rgba(0,0,0,0.7);
          max-height: 90vh;
          display: flex; flex-direction: column;
        }
        @keyframes modalUp {
          from { transform: scale(0.9) translateY(20px); opacity: 0; }
          to   { transform: scale(1)   translateY(0);    opacity: 1; }
        }

        .qv-close {
          position: absolute; top: 14px; right: 14px; z-index: 10;
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,253,247,0.7);
          font-size: 0.85rem; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
        }
        .qv-close:hover { background: rgba(201,168,76,0.2); color: #E8C96A; }

        .qv-fullpage {
          position: absolute; top: 14px; left: 14px; z-index: 10;
          background: rgba(201,168,76,0.1);
          border: 1px solid rgba(201,168,76,0.25);
          border-radius: 20px;
          padding: 5px 12px;
          color: rgba(232,201,106,0.8);
          font-size: 0.58rem; font-weight: 700;
          letter-spacing: 1px; text-transform: uppercase;
          cursor: pointer; transition: all 0.2s;
        }
        .qv-fullpage:hover { background: rgba(201,168,76,0.2); color: #E8C96A; }

        .qv-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          flex: 1;
          overflow: hidden;
        }

        .qv-left { overflow: hidden; }

        .qv-right {
          display: flex; flex-direction: column;
          border-left: 1px solid rgba(201,168,76,0.1);
          overflow: hidden;
        }

        /* Tabs */
        .qv-tabs {
          display: flex;
          border-bottom: 1px solid rgba(201,168,76,0.1);
          flex-shrink: 0;
        }
        .qv-tab {
          flex: 1;
          padding: 0.85rem 0.5rem;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          color: rgba(245,240,235,0.35);
          font-size: 0.6rem; font-weight: 700;
          letter-spacing: 1px; text-transform: uppercase;
          cursor: pointer; transition: all 0.2s;
        }
        .qv-tab:hover { color: rgba(245,240,235,0.7); }
        .qv-tab--active {
          color: #E8C96A;
          border-bottom-color: #C9A84C;
          background: rgba(201,168,76,0.04);
        }

        /* Panel */
        .qv-panel {
          flex: 1;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(201,168,76,0.2) transparent;
        }
        .qv-panel::-webkit-scrollbar { width: 4px; }
        .qv-panel::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.2); border-radius: 2px; }

        .qv-details {
          padding: 1.5rem 1.6rem;
          display: flex; flex-direction: column; gap: 0.65rem;
        }
        .qv-reviews-wrap { padding: 1.2rem 1.4rem; }

        /* Detail content (shared with original modal) */
        .qv-cat {
          font-size: 0.55rem; font-weight: 700;
          letter-spacing: 3px; text-transform: uppercase; color: #C9A84C;
        }
        .qv-name {
          font-family: Georgia, serif;
          font-size: 1.35rem; font-weight: 700;
          color: #f5f0eb; line-height: 1.2;
        }
        .qv-price {
          font-family: Georgia, serif;
          font-size: 1.5rem; font-weight: 700; color: #E8C96A;
        }
        .qv-desc, .qv-desc-full {
          font-size: 0.78rem; color: rgba(245,240,235,0.5); line-height: 1.75;
        }
        .qv-divider { height: 1px; background: rgba(201,168,76,0.1); }
        .qv-attr-list {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 6px;
        }
        .qv-attr-list li {
          display: flex; justify-content: space-between;
          font-size: 0.72rem;
          border-bottom: 1px dashed rgba(201,168,76,0.08);
          padding-bottom: 5px;
        }
        .qv-attr-key { color: rgba(245,240,235,0.4); }
        .qv-attr-val { color: #f5f0eb; font-weight: 600; }

        .qv-actions { display: flex; flex-direction: column; gap: 0.65rem; }
        .qv-add {
          width: 100%; padding: 12px;
          background: linear-gradient(135deg, #3E0F6B, #6B2FA0);
          border: 1px solid rgba(201,168,76,0.25); border-radius: 6px;
          color: #E8C96A;
          font-size: 0.68rem; font-weight: 800;
          letter-spacing: 1.5px; text-transform: uppercase;
          cursor: pointer; transition: all 0.25s;
        }
        .qv-add:hover:not(:disabled) { background: linear-gradient(135deg, #5C1F96, #9B4FC8); }
        .qv-add:disabled { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.2); cursor: not-allowed; }
        .qv-add--done { background: linear-gradient(135deg, #145230, #1e7a48) !important; color: #7eeaaa !important; }
        .qv-wa {
          width: 100%; padding: 12px;
          background: rgba(37,211,102,0.1); border: 1px solid rgba(37,211,102,0.25); border-radius: 6px;
          color: #25D366;
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 1px; text-transform: uppercase;
          text-decoration: none; text-align: center; display: block; transition: all 0.25s;
        }
        .qv-wa:hover { background: rgba(37,211,102,0.18); }
        .qv-note {
          font-size: 0.64rem; color: rgba(245,240,235,0.28); line-height: 1.7;
        }

        /* Responsive */
        @media (max-width: 680px) {
          .qv-layout { grid-template-columns: 1fr; }
          .qv-left { max-height: 260px; }
          .qv-right { border-left: none; border-top: 1px solid rgba(201,168,76,0.1); }
          .qv-modal { max-height: 95vh; }
          .qv-fullpage { display: none; }
        }
      `}</style>
    </div>
  );
}