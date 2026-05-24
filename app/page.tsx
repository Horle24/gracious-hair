import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Shop from "./components/Shop";
import Training from "./components/Training";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import CartDrawer from "./components/CartDrawer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Shop />
        <Training />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <Cart />
      <CartDrawer />
    </>
  );
}
