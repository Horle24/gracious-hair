'use client';
import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart]           = useState([]);
  const [open, setOpen]           = useState(false);   // cart drawer
  const [checkout, setCheckout]   = useState(false);   // checkout modal
  const [orderDone, setOrderDone] = useState(false);   // success screen

  function addToCart(product) {
    setCart(prev => {
      const existing = prev.find(c => c.id === product.id);
      if (existing) return prev.map(c => c.id === product.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(c => c.id !== id));
  }

  function updateQty(id, qty) {
    if (qty < 1) { removeFromCart(id); return; }
    setCart(prev => prev.map(c => c.id === id ? { ...c, qty } : c));
  }

  function clearCart() { setCart([]); }

  const itemsTotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const count      = cart.reduce((s, c) => s + c.qty, 0);

  // Called by CheckoutModal once delivery fee is known
  function sendToWhatsApp({ customerName, phone, address, deliveryFee, distanceKm }) {
    const itemLines = cart
      .map(c => `  • ${c.name} ×${c.qty}  →  ₦${(c.price * c.qty).toLocaleString()}`)
      .join('\n');

    const subtotal = itemsTotal + deliveryFee;

    const msg = encodeURIComponent(
      `Hello! 👋 I found you on your website and I'd like to place an order.\n\n` +
      `📋 *ORDER SUMMARY*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `${itemLines}\n\n` +
      `🛍️ Items Total:    ₦${itemsTotal.toLocaleString()}\n` +
      `🚚 Delivery Fee:  ₦${deliveryFee.toLocaleString()}  (${distanceKm} km)\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `💰 *Subtotal:       ₦${subtotal.toLocaleString()}*\n\n` +
      `📍 *Delivery To:*\n${address}\n\n` +
      `👤 Name: ${customerName}\n` +
      `📞 Phone: ${phone}\n\n` +
      `Please confirm availability. Thank you! 🙏`
    );

    // Log to Google Sheets (fire-and-forget)
    const apiUrl = process.env.NEXT_PUBLIC_SHEET_API_URL;
    if (apiUrl) {
      fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({
          action: 'logOrder',
          customer: customerName,
          phone,
          address,
          items: cart.map(c => `${c.name} ×${c.qty}`).join(', '),
          itemsTotal: `₦${itemsTotal.toLocaleString()}`,
          deliveryFee: `₦${deliveryFee.toLocaleString()}`,
          subtotal: `₦${subtotal.toLocaleString()}`,
          distanceKm,
        }),
      }).catch(() => {});
    }

    window.open(`https://wa.me/2349025317070?text=${msg}`, '_blank');
    setOrderDone(true);
  }

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, updateQty, clearCart,
      itemsTotal, count,
      open, setOpen,
      checkout, setCheckout,
      orderDone, setOrderDone,
      sendToWhatsApp,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() { return useContext(CartContext); }