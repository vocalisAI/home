import React, { useRef, useState, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import useScrollSnap from "./hooks/useScrollSnap";

// Sections
import HeroOrbAnimation from "./components/sections/HeroOrbAnimation";
import WhatIsVocalis from "./components/sections/WhatIsVocalis";
import VocalisCapabilities from "./components/sections/VocalisCapabilities";
import Pricing from "./components/sections/Pricing";
import About from "./components/sections/About";
import FAQ from "./components/sections/FAQ";
import Contact from "./components/sections/Contact";

import "./scss/custom.scss";

const Home = React.forwardRef(({ onHeroProgress }, ref) => {
  return (
    <>
      <HeroOrbAnimation onProgressChange={onHeroProgress} />
      <WhatIsVocalis />
      <VocalisCapabilities />
      <Pricing />
      <About />
      <FAQ />
      <Contact />
    </>
  );
});

function App() {
  const titleRef = useRef();
  
  // Dynamic Snap Points calculation
  const [snapPoints, setSnapPoints] = useState([]);

  React.useEffect(() => {
    const calcSnaps = () => {
      const vh = window.innerHeight;
      const heroHeight = vh * 5;
      const anatomyHeight = vh * 3;
      
      const snaps = [
        0,                            // 1. Hero Start
        heroHeight - vh,              // 2. Hero Conclusion / CTAs
        heroHeight,                   // 3. What is Vocalis (Start)
        heroHeight + (vh * 1.5),      // 4. What is Vocalis (Part 2)
        heroHeight + anatomyHeight,   // 5. Capabilities Start
      ];

      // Add snap points for each of the 10 capabilities (every 100vh)
      for (let i = 1; i <= 10; i++) {
        snaps.push(heroHeight + anatomyHeight + (vh * i));
      }

      setSnapPoints(snaps);
    };

    calcSnaps();
    window.addEventListener('resize', calcSnaps);
    return () => window.removeEventListener('resize', calcSnaps);
  }, []);

  useScrollSnap({ snapPoints, threshold: 40 });

  const handleHeroProgress = useCallback((progress) => {
    // Progress callback for Hero animation
  }, []);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route
          path="/"
          element={
            <Home ref={titleRef} onHeroProgress={handleHeroProgress} />
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
