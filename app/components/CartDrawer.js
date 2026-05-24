'use client';
import { useEffect, useRef, useState } from 'react';
import { useCart } from './CartContext';

/* ─── Haversine distance (km) ─────────────────────────── */
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/* Ijaiye, Lagos coordinates */
const STORE_LAT = 6.6283;
const STORE_LON = 3.2731;

/* Delivery fee tiers */
function calcDeliveryFee(km) {
  if (km <= 3)  return 500;
  if (km <= 8)  return 1000;
  if (km <= 15) return 1500;
  if (km <= 25) return 2500;
  if (km <= 40) return 3500;
  return 5000;
}

/* ─── Cart Drawer ─────────────────────────────────────── */
export default function CartDrawer() {
  const {
    cart, removeFromCart, updateQty,
    itemsTotal, count,
    open, setOpen,
    checkout, setCheckout,
    orderDone, setOrderDone,
    clearCart, sendToWhatsApp,
  } = useCart();

  /* Checkout form state */
  const [step, setStep]           = useState('cart'); // 'cart' | 'form' | 'summary' | 'done'
  const [form, setForm]           = useState({ name: '', phone: '', address: '' });
  const [formErr, setFormErr]     = useState({});
  const [locating, setLocating]   = useState(false);
  const [locErr, setLocErr]       = useState('');
  const [deliveryFee, setDeliveryFee] = useState(null);
  const [distanceKm, setDistanceKm]   = useState(null);
  const [resolvedAddr, setResolvedAddr] = useState('');
  const [sending, setSending]     = useState(false);
  const drawerRef = useRef(null);

  /* Reset step when drawer closes */
  useEffect(() => {
    if (!open) setTimeout(() => { setStep('cart'); setForm({ name:'', phone:'', address:'' }); setDeliveryFee(null); setDistanceKm(null); setLocErr(''); setFormErr({}); }, 400);
  }, [open]);

  /* Close on backdrop click */
  const handleBackdrop = e => { if (e.target === e.currentTarget) setOpen(false); };

  /* ── Field change ── */
  const handleField = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  /* ── Geocode address → distance → fee ── */
  async function geocodeAddress(addr) {
    setLocating(true); setLocErr('');
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(addr + ', Lagos, Nigeria')}&format=json&limit=1`,
        { headers: { 'Accept-Language': 'en' } }
      );
      const data = await res.json();
      if (!data.length) throw new Error('Address not found. Try adding more detail.');
      const { lat, lon, display_name } = data[0];
      const km = parseFloat(haversine(STORE_LAT, STORE_LON, +lat, +lon).toFixed(1));
      setDistanceKm(km);
      setDeliveryFee(calcDeliveryFee(km));
      setResolvedAddr(display_name);
      setStep('summary');
    } catch (err) {
      setLocErr(err.message || 'Could not calculate distance. Please check your address.');
    } finally {
      setLocating(false);
    }
  }

  /* ── Validate form ── */
  function validateForm() {
    const errs = {};
    if (!form.name.trim())    errs.name    = 'Full name is required';
    if (!form.phone.trim())   errs.phone   = 'Phone number is required';
    if (!/^[0-9+\s]{7,}$/.test(form.phone.trim())) errs.phone = 'Enter a valid phone number';
    if (!form.address.trim()) errs.address = 'Delivery address is required';
    setFormErr(errs);
    return !Object.keys(errs).length;
  }

  function handleFormNext(e) {
    e.preventDefault();
    if (!validateForm()) return;
    geocodeAddress(form.address);
  }

  function handleConfirmOrder() {
    setSending(true);
    sendToWhatsApp({
      customerName: form.name,
      phone:        form.phone,
      address:      resolvedAddr || form.address,
      deliveryFee,
      distanceKm,
    });
    clearCart();
    setStep('done');
    setSending(false);
  }

  const subtotal = (itemsTotal || 0) + (deliveryFee || 0);

  /* ─── Render ─────────────────────────────────────────── */
  return (
    <>
      {/* Backdrop */}
      <div
        className={`drawer-backdrop ${open ? 'drawer-backdrop--visible' : ''}`}
        onClick={handleBackdrop}
      />

      {/* Drawer */}
      <aside className={`drawer ${open ? 'drawer--open' : ''}`} ref={drawerRef}>

        {/* Header */}
        <div className="drawer__head">
          <div className="drawer__head-left">
            {step !== 'cart' && step !== 'done' && (
              <button className="drawer__back" onClick={() => setStep(step === 'summary' ? 'form' : 'cart')}>
                ← Back
              </button>
            )}
          </div>
          <span className="drawer__title">
            {step === 'cart'    && `Your Cart (${count})`}
            {step === 'form'    && 'Delivery Details'}
            {step === 'summary' && 'Order Summary'}
            {step === 'done'    && 'Order Sent!'}
          </span>
          <button className="drawer__close" onClick={() => setOpen(false)} aria-label="Close">✕</button>
        </div>

        {/* ── STEP: CART ── */}
        {step === 'cart' && (
          <div className="drawer__body">
            {cart.length === 0 ? (
              <div className="drawer__empty">
                <span className="drawer__empty-icon">🛍️</span>
                <p>Your cart is empty</p>
                <button className="btn-ghost" onClick={() => setOpen(false)}>Continue Shopping</button>
              </div>
            ) : (
              <>
                <ul className="cart-list">
                  {cart.map(item => (
                    <li key={item.id} className="cart-item">
                      {item.image && (
                        <div className="cart-item__img-wrap">
                          <img src={item.image} alt={item.name} className="cart-item__img" />
                        </div>
                      )}
                      <div className="cart-item__info">
                        <span className="cart-item__name">{item.name}</span>
                        <span className="cart-item__price">₦{item.price.toLocaleString()}</span>
                      </div>
                      <div className="cart-item__controls">
                        <button className="qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                        <span className="qty-val">{item.qty}</span>
                        <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                      </div>
                      <div className="cart-item__subtotal">₦{(item.price * item.qty).toLocaleString()}</div>
                      <button className="cart-item__remove" onClick={() => removeFromCart(item.id)} aria-label="Remove">✕</button>
                    </li>
                  ))}
                </ul>

                <div className="cart-totals">
                  <div className="cart-totals__row">
                    <span>Items Total</span>
                    <span>₦{itemsTotal.toLocaleString()}</span>
                  </div>
                  <div className="cart-totals__row cart-totals__row--muted">
                    <span>Delivery fee</span>
                    <span>Calculated at next step</span>
                  </div>
                </div>

                <button className="btn-checkout" onClick={() => setStep('form')}>
                  Proceed to Checkout →
                </button>
              </>
            )}
          </div>
        )}

        {/* ── STEP: FORM ── */}
        {step === 'form' && (
          <div className="drawer__body">
            <p className="form-hint">We'll calculate your delivery fee based on distance from our Ijaiye store.</p>

            <form className="checkout-form" onSubmit={handleFormNext} noValidate>
              <div className="field">
                <label className="field__label">Full Name</label>
                <input
                  className={`field__input ${formErr.name ? 'field__input--err' : ''}`}
                  name="name" type="text" placeholder="e.g. Amaka Johnson"
                  value={form.name} onChange={handleField}
                />
                {formErr.name && <span className="field__err">{formErr.name}</span>}
              </div>

              <div className="field">
                <label className="field__label">Phone Number</label>
                <input
                  className={`field__input ${formErr.phone ? 'field__input--err' : ''}`}
                  name="phone" type="tel" placeholder="e.g. 08012345678"
                  value={form.phone} onChange={handleField}
                />
                {formErr.phone && <span className="field__err">{formErr.phone}</span>}
              </div>

              <div className="field">
                <label className="field__label">Delivery Address</label>
                <textarea
                  className={`field__input field__textarea ${formErr.address ? 'field__input--err' : ''}`}
                  name="address" rows={3}
                  placeholder="Street, area, local government — Lagos (e.g. 12 Bode Thomas, Surulere)"
                  value={form.address} onChange={handleField}
                />
                {formErr.address && <span className="field__err">{formErr.address}</span>}
              </div>

              {locErr && (
                <div className="loc-err">
                  ⚠️ {locErr}
                </div>
              )}

              <button className="btn-checkout" type="submit" disabled={locating}>
                {locating ? (
                  <><span className="spinner" /> Calculating distance…</>
                ) : (
                  'Calculate Delivery Fee →'
                )}
              </button>
            </form>
          </div>
        )}

        {/* ── STEP: SUMMARY ── */}
        {step === 'summary' && (
          <div className="drawer__body">
            <div className="summary">
              {/* Customer info */}
              <div className="summary__section">
                <h4 className="summary__label">📦 Delivering To</h4>
                <p className="summary__val">{form.name}</p>
                <p className="summary__val">{form.phone}</p>
                <p className="summary__val summary__val--addr">{resolvedAddr || form.address}</p>
                <p className="summary__distance">📍 {distanceKm} km from our Ijaiye store</p>
              </div>

              {/* Items */}
              <div className="summary__section">
                <h4 className="summary__label">🛍️ Items</h4>
                {cart.map(item => (
                  <div key={item.id} className="summary__item">
                    <span>{item.name} ×{item.qty}</span>
                    <span>₦{(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="summary__pricing">
                <div className="summary__pricing-row">
                  <span>Items Total</span>
                  <span>₦{itemsTotal.toLocaleString()}</span>
                </div>
                <div className="summary__pricing-row">
                  <span>Delivery Fee <em>({distanceKm} km)</em></span>
                  <span className="summary__delivery-fee">₦{deliveryFee.toLocaleString()}</span>
                </div>
                <div className="summary__pricing-row summary__pricing-row--total">
                  <span>Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button className="btn-whatsapp" onClick={handleConfirmOrder} disabled={sending}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
              </svg>
              {sending ? 'Opening WhatsApp…' : 'Send Order via WhatsApp'}
            </button>

            <p className="summary__note">WhatsApp will open with your order details pre-filled. Just hit send!</p>
          </div>
        )}

        {/* ── STEP: DONE ── */}
        {step === 'done' && (
          <div className="drawer__body drawer__body--center">
            <div className="done-icon">🎉</div>
            <h3 className="done-title">Order Sent!</h3>
            <p className="done-msg">Your order details have been sent to WhatsApp. We'll confirm availability shortly.</p>
            <button className="btn-checkout" onClick={() => { setOpen(false); setStep('cart'); }}>
              Back to Shop
            </button>
          </div>
        )}
      </aside>

      <style jsx>{`
        /* ── Backdrop ─────────────────────────────────────── */
        .drawer-backdrop {
          position: fixed; inset: 0;
          background: rgba(10, 6, 18, 0);
          backdrop-filter: blur(0px);
          z-index: 998;
          pointer-events: none;
          transition: background 0.35s, backdrop-filter 0.35s;
        }
        .drawer-backdrop--visible {
          background: rgba(10, 6, 18, 0.65);
          backdrop-filter: blur(4px);
          pointer-events: all;
        }

        /* ── Drawer ───────────────────────────────────────── */
        .drawer {
          position: fixed;
          top: 0; right: 0; bottom: 0;
          width: min(480px, 100vw);
          background: #0f0a1a;
          border-left: 1px solid rgba(201,168,76,0.18);
          z-index: 999;
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.38s cubic-bezier(.4,0,.2,1);
          box-shadow: -20px 0 60px rgba(0,0,0,0.5);
        }
        .drawer--open { transform: translateX(0); }

        /* ── Head ─────────────────────────────────────────── */
        .drawer__head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid rgba(201,168,76,0.12);
          background: rgba(201,168,76,0.04);
          flex-shrink: 0;
        }
        .drawer__head-left { min-width: 60px; }
        .drawer__back {
          background: none; border: none;
          color: rgba(201,168,76,0.7);
          font-size: 0.75rem; font-weight: 600;
          letter-spacing: 0.5px; cursor: pointer;
          transition: color 0.2s;
        }
        .drawer__back:hover { color: var(--gold, #c9a84c); }
        .drawer__title {
          font-family: var(--font-display, 'Georgia', serif);
          font-size: 1rem; font-weight: 700;
          color: #f5f0eb; letter-spacing: 0.3px;
          flex: 1; text-align: center;
        }
        .drawer__close {
          background: none; border: none;
          color: rgba(245,240,235,0.4);
          font-size: 1rem; cursor: pointer;
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
          transition: background 0.2s, color 0.2s;
        }
        .drawer__close:hover { background: rgba(255,255,255,0.08); color: #f5f0eb; }

        /* ── Body ─────────────────────────────────────────── */
        .drawer__body {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
          scrollbar-width: thin;
          scrollbar-color: rgba(201,168,76,0.2) transparent;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .drawer__body--center {
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 1.2rem;
        }

        /* ── Empty ────────────────────────────────────────── */
        .drawer__empty {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 1rem; flex: 1; padding: 3rem 0;
        }
        .drawer__empty-icon { font-size: 3.5rem; }
        .drawer__empty p { color: rgba(245,240,235,0.45); font-size: 0.9rem; }

        /* ── Cart List ────────────────────────────────────── */
        .cart-list {
          list-style: none;
          display: flex; flex-direction: column; gap: 0.8rem;
          margin: 0; padding: 0;
        }
        .cart-item {
          display: grid;
          grid-template-columns: 56px 1fr auto auto auto;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 0.75rem;
          transition: border-color 0.2s;
        }
        .cart-item:hover { border-color: rgba(201,168,76,0.2); }
        .cart-item__img-wrap {
          width: 56px; height: 56px;
          border-radius: 8px; overflow: hidden;
          background: rgba(201,168,76,0.1);
        }
        .cart-item__img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
        }
        .cart-item__info {
          display: flex; flex-direction: column; gap: 3px; min-width: 0;
        }
        .cart-item__name {
          font-size: 0.8rem; font-weight: 600;
          color: #f5f0eb;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .cart-item__price {
          font-size: 0.7rem; color: rgba(245,240,235,0.45);
        }
        .cart-item__controls {
          display: flex; align-items: center; gap: 6px;
        }
        .qty-btn {
          width: 26px; height: 26px; border-radius: 50%;
          background: rgba(201,168,76,0.12);
          border: 1px solid rgba(201,168,76,0.25);
          color: var(--gold, #c9a84c);
          font-size: 1rem; line-height: 1;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .qty-btn:hover { background: rgba(201,168,76,0.25); }
        .qty-val {
          font-size: 0.82rem; font-weight: 700;
          color: #f5f0eb; min-width: 18px; text-align: center;
        }
        .cart-item__subtotal {
          font-size: 0.78rem; font-weight: 700;
          color: var(--gold, #c9a84c);
          white-space: nowrap;
        }
        .cart-item__remove {
          background: none; border: none;
          color: rgba(245,240,235,0.25);
          font-size: 0.7rem; cursor: pointer;
          transition: color 0.2s;
          padding: 2px;
        }
        .cart-item__remove:hover { color: #e06060; }

        /* ── Cart Totals ──────────────────────────────────── */
        .cart-totals {
          border-top: 1px solid rgba(201,168,76,0.12);
          padding-top: 1rem;
          display: flex; flex-direction: column; gap: 0.5rem;
        }
        .cart-totals__row {
          display: flex; justify-content: space-between;
          font-size: 0.82rem; color: #f5f0eb; font-weight: 600;
        }
        .cart-totals__row--muted span { color: rgba(245,240,235,0.4); font-weight: 400; font-size: 0.75rem; }

        /* ── Form ─────────────────────────────────────────── */
        .form-hint {
          font-size: 0.76rem;
          color: rgba(245,240,235,0.45);
          line-height: 1.7;
          background: rgba(201,168,76,0.06);
          border: 1px solid rgba(201,168,76,0.12);
          border-radius: 8px;
          padding: 0.75rem 1rem;
        }
        .checkout-form {
          display: flex; flex-direction: column; gap: 1.1rem;
        }
        .field { display: flex; flex-direction: column; gap: 5px; }
        .field__label {
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 1px; text-transform: uppercase;
          color: rgba(245,240,235,0.55);
        }
        .field__input {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 0.75rem 1rem;
          color: #f5f0eb;
          font-size: 0.85rem;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          resize: none;
        }
        .field__input::placeholder { color: rgba(245,240,235,0.25); }
        .field__input:focus {
          border-color: rgba(201,168,76,0.5);
          background: rgba(201,168,76,0.05);
        }
        .field__input--err { border-color: rgba(224,96,96,0.5); }
        .field__textarea { min-height: 80px; }
        .field__err { font-size: 0.68rem; color: #e08080; }
        .loc-err {
          background: rgba(224,96,96,0.08);
          border: 1px solid rgba(224,96,96,0.25);
          border-radius: 8px;
          padding: 0.7rem 1rem;
          font-size: 0.76rem;
          color: #e08080;
          line-height: 1.6;
        }

        /* ── Summary ──────────────────────────────────────── */
        .summary { display: flex; flex-direction: column; gap: 1rem; }
        .summary__section {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 1rem 1.2rem;
          display: flex; flex-direction: column; gap: 4px;
        }
        .summary__label {
          font-size: 0.68rem; font-weight: 800;
          letter-spacing: 1.5px; text-transform: uppercase;
          color: var(--gold, #c9a84c);
          margin-bottom: 0.4rem;
        }
        .summary__val { font-size: 0.8rem; color: #f5f0eb; line-height: 1.6; }
        .summary__val--addr { color: rgba(245,240,235,0.6); font-size: 0.75rem; }
        .summary__distance {
          font-size: 0.72rem; color: rgba(201,168,76,0.7);
          margin-top: 4px;
        }
        .summary__item {
          display: flex; justify-content: space-between;
          font-size: 0.78rem; color: rgba(245,240,235,0.7);
          padding: 3px 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .summary__item:last-child { border-bottom: none; }

        .summary__pricing {
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 12px;
          padding: 1rem 1.2rem;
          display: flex; flex-direction: column; gap: 0.6rem;
          background: rgba(201,168,76,0.04);
        }
        .summary__pricing-row {
          display: flex; justify-content: space-between;
          font-size: 0.82rem; color: rgba(245,240,235,0.7);
        }
        .summary__pricing-row em { font-style: normal; font-size: 0.7rem; color: rgba(245,240,235,0.4); }
        .summary__delivery-fee { color: #7ed8a3; }
        .summary__pricing-row--total {
          border-top: 1px solid rgba(201,168,76,0.2);
          padding-top: 0.6rem;
          font-weight: 800; font-size: 0.92rem;
          color: #f5f0eb;
        }
        .summary__note {
          font-size: 0.7rem;
          color: rgba(245,240,235,0.35);
          text-align: center;
          line-height: 1.7;
        }

        /* ── Done ─────────────────────────────────────────── */
        .done-icon { font-size: 4rem; }
        .done-title {
          font-family: var(--font-display, 'Georgia', serif);
          font-size: 1.6rem; font-weight: 700;
          color: var(--gold, #c9a84c);
        }
        .done-msg {
          font-size: 0.82rem;
          color: rgba(245,240,235,0.5);
          line-height: 1.8; max-width: 300px;
        }

        /* ── Buttons ──────────────────────────────────────── */
        .btn-checkout {
          width: 100%;
          background: linear-gradient(135deg, #6a2fa0, #9b4fc8);
          color: #f5f0eb;
          border: none; border-radius: 10px;
          padding: 14px;
          font-size: 0.8rem; font-weight: 800;
          letter-spacing: 1px; text-transform: uppercase;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
          box-shadow: 0 8px 24px rgba(106,47,160,0.4);
          margin-top: auto;
        }
        .btn-checkout:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(106,47,160,0.55);
        }
        .btn-checkout:disabled { opacity: 0.6; cursor: not-allowed; }

        .btn-whatsapp {
          width: 100%;
          background: linear-gradient(135deg, #1da851, #25d366);
          color: #fff;
          border: none; border-radius: 10px;
          padding: 14px;
          font-size: 0.8rem; font-weight: 800;
          letter-spacing: 1px; text-transform: uppercase;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
          box-shadow: 0 8px 24px rgba(37,211,102,0.35);
        }
        .btn-whatsapp:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(37,211,102,0.5);
        }
        .btn-whatsapp:disabled { opacity: 0.6; cursor: not-allowed; }

        .btn-ghost {
          background: none;
          border: 1px solid rgba(201,168,76,0.3);
          color: var(--gold, #c9a84c);
          border-radius: 8px;
          padding: 10px 20px;
          font-size: 0.75rem; font-weight: 700;
          letter-spacing: 1px; text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }
        .btn-ghost:hover { background: rgba(201,168,76,0.08); border-color: var(--gold, #c9a84c); }

        /* Spinner */
        .spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(245,240,235,0.3);
          border-top-color: #f5f0eb;
          border-radius: 50%;
          display: inline-block;
          animation: spin 0.6s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}