'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { products as fallbackProducts } from '../../data/products';
import { useCart } from '../../context/CartContext';
import ProductGallery from '../../components/ProductGallery';
import ProductReviews from '../../components/ProductReviews';

const SHEET_API_URL = process.env.NEXT_PUBLIC_SHEET_API_URL || '';

const TABS = [
  { key: 'gallery', label: '🖼 Gallery' },
  { key: 'details', label: '✦ Details' },
  { key: 'reviews', label: '★ Reviews & Likes' },
];

export default function ProductPage() {
  const { id }  = useParams();
  const router  = useRouter();
  const { addToCart, setOpen } = useCart();

  const [products, setProducts] = useState(fallbackProducts);
  const [added, setAdded]       = useState(false);
  const [tab, setTab]           = useState('gallery');

  useEffect(() => {
    if (!SHEET_API_URL) return;
    fetch(`${SHEET_API_URL}?action=getProducts`)
      .then(r => r.json())
      .then(d => { if (d?.products?.length) setProducts(d.products); })
      .catch(() => {});
  }, []);

  const product = products.find(p => String(p.id) === String(id));

  /* ── Not found ── */
  if (!product) {
    return (
      <div className="pdp-not-found">
        <p>Product not found.</p>
        <button onClick={() => router.push('/#shop')}>← Back to Shop</button>
        <style jsx>{`
          .pdp-not-found {
            min-height: 60vh;
            display: flex; flex-direction: column;
            align-items: center; justify-content: center; gap: 1rem;
            background: #0a0612; color: rgba(245,240,235,0.5);
            font-size: 0.9rem;
          }
          button {
            background: none; border: 1px solid rgba(201,168,76,0.3);
            color: #C9A84C; padding: 8px 18px; border-radius: 6px;
            cursor: pointer; font-size: 0.75rem;
          }
        `}</style>
      </div>
    );
  }

  function handleAdd() {
    if (!product.available) return;
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
    setOpen(true);
  }

  return (
    <div className="pdp">

      {/* ── Breadcrumb ── */}
      <nav className="pdp__breadcrumb">
        <button onClick={() => router.push('/#shop')} className="pdp__bc-link">Shop</button>
        <span className="pdp__bc-sep">›</span>
        <span className="pdp__bc-cur">{product.name}</span>
      </nav>

      {/* ── Main 2-col layout ── */}
      <div className="pdp__body">

        {/* Left — Gallery */}
        <div className="pdp__gallery-col">
          <ProductGallery productId={product.id} productName={product.name} />
        </div>

        {/* Right — Info + Tabs */}
        <div className="pdp__info-col">

          <span className="pdp__cat">{product.category}</span>
          <h1 className="pdp__name">{product.name}</h1>

          <span className={`pdp__badge${!product.available ? ' pdp__badge--out' : ''}`}>
            {product.available ? '● In Stock' : '○ Sold Out'}
          </span>

          <p className="pdp__price">₦{product.price.toLocaleString()}</p>

          {/* CTA buttons */}
          <div className="pdp__cta">
            <button
              className={`pdp__add${added ? ' pdp__add--done' : ''}${!product.available ? ' pdp__add--disabled' : ''}`}
              disabled={!product.available}
              onClick={handleAdd}
            >
              {!product.available ? 'Out of Stock' : added ? '✓ Added to Cart' : '+ Add to Cart'}
            </button>
            <a
              href={`https://wa.me/2349025317070?text=Hello!%20I'm%20interested%20in%20${encodeURIComponent(product.name)}%20(₦${product.price.toLocaleString()}).%20Is%20it%20available?`}
              className="pdp__wa"
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 Order via WhatsApp
            </a>
          </div>

          <p className="pdp__trust">
            💳 Pay on delivery &nbsp;·&nbsp; 🚚 Lagos delivery available &nbsp;·&nbsp; ✦ 100% genuine hair
          </p>

          {/* Tabs */}
          <div className="pdp__tabs">
            {TABS.map(t => (
              <button
                key={t.key}
                className={`pdp__tab${tab === t.key ? ' pdp__tab--active' : ''}`}
                onClick={() => setTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="pdp__tab-panel">

            {tab === 'gallery' && (
              <p className="pdp__desc">{product.desc}</p>
            )}

            {tab === 'details' && (
              <div className="pdp__detail-block">
                <p className="pdp__desc">{product.desc}</p>
                {product.details ? (
                  <table className="pdp__attr-table">
                    <tbody>
                      {Object.entries(product.details).map(([k, v]) => (
                        <tr key={k}>
                          <td className="pdp__attr-key">{k}</td>
                          <td className="pdp__attr-val">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="pdp__no-details">No additional specifications available.</p>
                )}
              </div>
            )}

            {tab === 'reviews' && (
              <ProductReviews productId={product.id} />
            )}

          </div>
        </div>
      </div>

      {/* ── Back button ── */}
      <div className="pdp__footer-band">
        <button className="pdp__back" onClick={() => router.push('/#shop')}>
          ← Back to Shop
        </button>
      </div>

      <style jsx>{`
        .pdp {
          background: #0a0612;
          min-height: 100vh;
          padding-bottom: 4rem;
        }

        /* Breadcrumb */
        .pdp__breadcrumb {
          display: flex; align-items: center; gap: 8px;
          padding: 1.2rem 5%;
          border-bottom: 1px solid rgba(201,168,76,0.08);
        }
        .pdp__bc-link {
          background: none; border: none;
          color: #C9A84C; font-size: 0.7rem; font-weight: 700;
          letter-spacing: 1px; text-transform: uppercase;
          cursor: pointer;
          text-decoration: underline; text-underline-offset: 3px;
        }
        .pdp__bc-sep { color: rgba(245,240,235,0.25); font-size: 0.8rem; }
        .pdp__bc-cur { font-size: 0.7rem; color: rgba(245,240,235,0.45); letter-spacing: 0.5px; }

        /* 2-col body */
        .pdp__body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          max-width: 1200px;
          margin: 0 auto;
          align-items: start;
        }
        .pdp__gallery-col {
          position: sticky;
          top: 80px;
          border-right: 1px solid rgba(201,168,76,0.08);
        }
        .pdp__info-col {
          padding: 2.5rem 3rem;
          display: flex; flex-direction: column; gap: 1rem;
        }

        /* Identity */
        .pdp__cat {
          font-size: 0.58rem; font-weight: 700;
          letter-spacing: 3px; text-transform: uppercase; color: #C9A84C;
        }
        .pdp__name {
          font-family: Georgia, serif;
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          font-weight: 900; color: #FFFDF7; line-height: 1.12;
        }
        .pdp__badge {
          display: inline-block;
          font-size: 0.55rem; font-weight: 700;
          letter-spacing: 1px; text-transform: uppercase;
          padding: 4px 12px; border-radius: 20px;
          background: rgba(201,168,76,0.9); color: #1a0f00;
          align-self: flex-start;
        }
        .pdp__badge--out {
          background: rgba(30,20,45,0.85);
          color: rgba(255,253,247,0.5);
          border: 1px solid rgba(255,255,255,0.1);
        }
        .pdp__price {
          font-family: Georgia, serif;
          font-size: 2rem; font-weight: 700; color: #E8C96A;
        }

        /* CTA */
        .pdp__cta { display: flex; flex-direction: column; gap: 0.65rem; }
        .pdp__add {
          width: 100%; padding: 14px;
          background: linear-gradient(135deg, #3E0F6B, #6B2FA0);
          border: 1px solid rgba(201,168,76,0.25); border-radius: 8px;
          color: #E8C96A; font-size: 0.72rem; font-weight: 800;
          letter-spacing: 2px; text-transform: uppercase;
          cursor: pointer; transition: all 0.25s;
        }
        .pdp__add:hover:not(:disabled) {
          background: linear-gradient(135deg, #5C1F96, #9B4FC8);
          box-shadow: 0 8px 28px rgba(62,15,107,0.5);
        }
        .pdp__add--done {
          background: linear-gradient(135deg, #145230, #1e7a48) !important;
          color: #7eeaaa !important;
        }
        .pdp__add--disabled {
          background: rgba(255,255,255,0.04) !important;
          color: rgba(255,255,255,0.2) !important;
          cursor: not-allowed;
        }
        .pdp__wa {
          width: 100%; padding: 13px;
          background: rgba(37,211,102,0.1);
          border: 1px solid rgba(37,211,102,0.28); border-radius: 8px;
          color: #25D366; font-size: 0.72rem; font-weight: 700;
          letter-spacing: 1px; text-transform: uppercase;
          text-decoration: none; text-align: center; display: block;
          transition: all 0.25s;
        }
        .pdp__wa:hover { background: rgba(37,211,102,0.18); }

        .pdp__trust {
          font-size: 0.65rem; color: rgba(245,240,235,0.3); line-height: 1.8;
          border-top: 1px solid rgba(201,168,76,0.08);
          padding-top: 0.75rem;
        }

        /* Tabs */
        .pdp__tabs {
          display: flex;
          border-bottom: 1px solid rgba(201,168,76,0.1);
          margin-top: 0.5rem;
        }
        .pdp__tab {
          padding: 0.75rem 1rem;
          background: none; border: none;
          border-bottom: 2px solid transparent;
          color: rgba(245,240,235,0.35);
          font-size: 0.62rem; font-weight: 700;
          letter-spacing: 1px; text-transform: uppercase;
          cursor: pointer; transition: all 0.2s; white-space: nowrap;
        }
        .pdp__tab:hover { color: rgba(245,240,235,0.7); }
        .pdp__tab--active { color: #E8C96A; border-bottom-color: #C9A84C; }

        .pdp__tab-panel { padding-top: 1rem; }
        .pdp__desc {
          font-size: 0.85rem; color: rgba(245,240,235,0.55); line-height: 1.8;
        }
        .pdp__detail-block { display: flex; flex-direction: column; gap: 1rem; }
        .pdp__attr-table { width: 100%; border-collapse: collapse; }
        .pdp__attr-table tr { border-bottom: 1px dashed rgba(201,168,76,0.08); }
        .pdp__attr-key, .pdp__attr-val { padding: 8px 4px; font-size: 0.75rem; }
        .pdp__attr-key { color: rgba(245,240,235,0.4); width: 40%; }
        .pdp__attr-val { color: #f5f0eb; font-weight: 600; }
        .pdp__no-details { font-size: 0.75rem; color: rgba(245,240,235,0.3); }

        /* Footer */
        .pdp__footer-band {
          max-width: 1200px; margin: 3rem auto 0;
          padding: 2rem 5% 0;
          border-top: 1px solid rgba(201,168,76,0.08);
          display: flex;
        }
        .pdp__back {
          background: none;
          border: 1px solid rgba(201,168,76,0.2); border-radius: 6px;
          padding: 10px 20px; color: rgba(201,168,76,0.7);
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 1px; text-transform: uppercase;
          cursor: pointer; transition: all 0.2s;
        }
        .pdp__back:hover { border-color: rgba(201,168,76,0.5); color: #E8C96A; }

        /* Responsive */
        @media (max-width: 800px) {
          .pdp__body { grid-template-columns: 1fr; }
          .pdp__gallery-col { position: static; border-right: none; }
          .pdp__info-col { padding: 1.8rem 5%; }
        }
        @media (max-width: 480px) {
          .pdp__info-col { padding: 1.4rem 4%; }
          .pdp__name { font-size: 1.5rem; }
          .pdp__price { font-size: 1.6rem; }
        }
      `}</style>
    </div>
  );
} 
