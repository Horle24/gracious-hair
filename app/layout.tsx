import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./components/CartContext";
import CartDrawer from './components/CartDrawer';

export const metadata: Metadata = {
  title: "Gracious Hair Extension – Your Crown Deserves the Best",
  description: "Premium hair extensions, wigs, and professional hair services in Lagos, Nigeria. Fixing, wigging, braiding, gele, frontal installation & more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <CartDrawer /> 
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
