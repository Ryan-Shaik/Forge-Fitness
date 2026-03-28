/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Schedule from './components/Schedule';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <BrowserRouter>
      <main className="relative min-h-screen bg-forge">
        <Navbar />
        <Hero />
        <About />
        <Gallery />
        <Schedule />
        <Pricing />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </BrowserRouter>
  );
}

