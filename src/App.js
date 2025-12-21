import React, { useState, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainBody from "./components/home/MainBody";
import Footer from "./components/Footer";
import LoadingAnimation from "./components/ui/LoadingAnimation";

// Sections
import Benefits from "./components/sections/Benefits";
import Features from "./components/sections/Features";
import Pricing from "./components/sections/Pricing";
import About from "./components/sections/About";
import HIPAA from "./components/sections/HIPAA";
import FAQ from "./components/sections/FAQ";
import Contact from "./components/sections/Contact";
import ProductDemo from "./components/sections/ProductDemo";
import Multilingual from "./components/sections/Multilingual";

import "./scss/custom.scss";

const Home = React.forwardRef((props, ref) => {
  return (
    <>
      <MainBody ref={ref} />
      <Benefits />
      <Features />
      <ProductDemo />
      <Multilingual />
      <Pricing />
      <About />
      <HIPAA />
      <FAQ />
      <Contact />
    </>
  );
});

function App() {
  const titleRef = useRef();
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL + "/"}>
      <LoadingAnimation onComplete={handleLoadingComplete} />
      {!isLoading && (
        <div className="loading-complete">
          <Navbar ref={titleRef} />
          <Routes>
            <Route path="/" exact element={<Home ref={titleRef} />} />
          </Routes>
          <Footer />
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
