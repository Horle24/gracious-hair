'use client';
import { useCart } from '../components/CartContext';

export default function Cart() {
  const { cart, removeFromCart, itemsTotal, count, open, setOpen } = useCart();

  return (
    <>
      {/* Floating cart button */}
      <button className="cart-float" onClick={() => setOpen(o => !o)} title="View Cart">
        🛒
        {count > 0 && <span className="cart-float__count">{count}</span>}
      </button>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/2349025317070?text=Hello%20Gracious%20Hair%20Extension!"
        className="wa-float"
        target="_blank" rel="noopener noreferrer"
        title="Chat on WhatsApp"
      >
        💬
        <span className="wa-float__tip">Chat on WhatsApp</span>
      </a>

      {/* Cart panel */}
      {open && (
        <div className="cart-panel">
          <div className="cart-panel__header">
            <span>🛒 Your Order ({count})</span>
            <button className="cart-panel__close" onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="cart-panel__items">
            {cart.length === 0
              ? <p className="cart-panel__empty">Your cart is empty</p>
              : cart.map(c => (
                  <div key={c.id} className="cart-panel__item">
                    <span className="cart-panel__item-name">{c.name}{c.qty > 1 ? ` ×${c.qty}` : ''}</span>
                    <div className="cart-panel__item-right">
                      <span className="cart-panel__item-price">₦{(c.price * c.qty).toLocaleString()}</span>
                      <button className="cart-panel__remove" onClick={() => removeFromCart(c.id)}>✕</button>
                    </div>
                  </div>
                ))
            }
          </div>

          {cart.length > 0 && (
            <>
              <div className="cart-panel__total">
                <span>Items Total</span>
                {/* ✅ Fixed: was `total` (undefined) — now correctly `itemsTotal` */}
                <span>₦{itemsTotal.toLocaleString()}</span>
              </div>

              <div className="cart-panel__footer">
                {/* ✅ Fixed: opens CartDrawer checkout flow instead of calling sendToWhatsApp() directly */}
                <button className="cart-panel__wa-btn" onClick={() => setOpen(true)}>
                  🛍️ Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <style jsx>{`
        .cart-float {
          position: fixed;
          bottom: 100px; right: 24px;
          z-index: 900;
          width: 56px; height: 56px;
          background: linear-gradient(135deg, var(--gold-light), var(--gold));
          border: none;
          border-radius: 50%;
          font-size: 1.3rem;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(201,168,76,0.45);
          transition: transform 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cart-float:hover { transform: scale(1.08); }
        .cart-float__count {
          position: absolute;
          top: -3px; right: -3px;
          background: var(--purple);
          color: var(--gold-light);
          font-size: 0.6rem;
          font-weight: 700;
          min-width: 18px;
          height: 18px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 3px;
        }

        .wa-float {
          position: fixed;
          bottom: 32px; right: 24px;
          z-index: 900;
          width: 56px; height: 56px;
          background: #25D366;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          box-shadow: 0 4px 20px rgba(37,211,102,0.38);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .wa-float:hover { transform: scale(1.1); box-shadow: 0 6px 28px rgba(37,211,102,0.5); }
        .wa-float__tip {
          position: absolute;
          right: 66px;
          background: rgba(0,0,0,0.8);
          color: #fff;
          font-size: 0.68rem;
          white-space: nowrap;
          padding: 5px 10px;
          border-radius: 4px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s;
        }
        .wa-float:hover .wa-float__tip { opacity: 1; }

        .cart-panel {
          position: fixed;
          top: 80px; bottom: 24px;
          right: 24px;
          z-index: 950;
          width: 360px;
          max-height: calc(100vh - 104px);
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          box-shadow: 0 20px 60px rgba(62,15,107,0.28);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          animation: cartSlideIn 0.25s ease;
        }
        @keyframes cartSlideIn {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .cart-panel__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.25rem;
          background: linear-gradient(135deg, var(--purple-dark), var(--purple));
          font-family: var(--font-display);
          font-size: 1rem;
          color: var(--gold-light);
        }
        .cart-panel__close {
          background: none; border: none;
          color: var(--gold-light);
          font-size: 1rem; cursor: pointer;
          opacity: 0.7; transition: opacity 0.2s;
        }
        .cart-panel__close:hover { opacity: 1; }

        .cart-panel__items {
          flex: 1; overflow-y: auto;
          padding: 0.75rem 1.25rem;
          scrollbar-width: thin;
          scrollbar-color: var(--gold) transparent;
        }
        .cart-panel__items::-webkit-scrollbar { width: 4px; }
        .cart-panel__items::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 4px; }
        .cart-panel__empty {
          text-align: center; color: var(--text-muted);
          font-size: 0.8rem; font-style: italic; padding: 1.2rem 0;
        }
        .cart-panel__item {
          display: flex; justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid rgba(201,168,76,0.1);
          gap: 8px;
        }
        .cart-panel__item-name { font-size: 0.78rem; color: var(--text-dark); flex: 1; }
        .cart-panel__item-right { display: flex; align-items: center; gap: 6px; }
        .cart-panel__item-price { font-size: 0.8rem; font-weight: 600; color: var(--purple); }
        .cart-panel__remove {
          background: none; border: none;
          color: #ccc; cursor: pointer; font-size: 0.75rem;
          transition: color 0.2s;
        }
        .cart-panel__remove:hover { color: #e44; }

        .cart-panel__total {
          display: flex; justify-content: space-between;
          padding: 0.75rem 1.25rem;
          border-top: 1px solid rgba(201,168,76,0.18);
          font-weight: 600; font-size: 0.85rem;
          color: var(--purple-dark);
        }

        .cart-panel__footer { padding: 0.75rem 1.25rem 1.25rem; }
        .cart-panel__wa-btn {
          width: 100%;
          background: linear-gradient(135deg, var(--purple-dark), var(--purple));
          color: #fff; border: none;
          padding: 12px;
          border-radius: var(--radius-sm);
          font-family: var(--font-body);
          font-size: 0.75rem; font-weight: 700;
          letter-spacing: 1px; text-transform: uppercase;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          gap: 8px; transition: opacity 0.2s;
          box-shadow: 0 4px 16px rgba(106,47,160,0.35);
        }
        .cart-panel__wa-btn:hover { opacity: 0.9; }

        @media (max-width: 480px) {
          .cart-panel {
            right: 0; left: 0;
            top: 70px; bottom: 0;
            width: 100%;
            border-radius: var(--radius-lg) var(--radius-lg) 0 0;
            max-height: calc(100vh - 70px);
          }
        }
      `}</style>
    </>
  );
}