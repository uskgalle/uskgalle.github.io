import PageBackground from './components/PageBackground/PageBackground';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Details from './components/Details/Details';
import Programme from './components/Programme/Programme';
import WhatToBring from './components/WhatToBring/WhatToBring';
import Gallery from './components/Gallery/Gallery';
import Join from './components/Join/Join';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import BackToTop from './components/BackToTop/BackToTop';

export default function Home() {
  return (
    <>
      <PageBackground />
      <main>
        <Hero />
        <About />
        <Details />
        <Programme />
        <WhatToBring />
        <Gallery />
        <Join />
        <Contact />
        <Footer />
        <BackToTop />
      </main>
    </>
  );
}
