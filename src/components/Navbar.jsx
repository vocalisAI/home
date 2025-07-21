import React, { useState } from "react";
import { useScrollPosition } from "../hooks/useScrollPosition";
import useResizeObserver from "../hooks/useResizeObserver";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const Navigation = React.forwardRef((props, ref) => {
  const [isTop, setIsTop] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const navbarMenuRef = React.useRef();
  const navbarDimensions = useResizeObserver(navbarMenuRef);
  const navBottom = navbarDimensions ? navbarDimensions.bottom : 0;
  useScrollPosition(
    ({ prevPos, currPos }) => {
      if (!navbarDimensions) return;
      currPos.y + ref.current.offsetTop - navbarDimensions.bottom > 5
        ? setIsTop(true)
        : setIsTop(false);
      setScrollPosition(currPos.y);
    },
    [navBottom]
  );

  React.useEffect(() => {
    if (!navbarDimensions) return;
    navBottom - scrollPosition >= ref.current.offsetTop
      ? setIsTop(false)
      : setIsTop(true);
  }, [navBottom, navbarDimensions, ref, scrollPosition]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Navbar
      ref={navbarMenuRef}
      className={`px-3 fixed-top  ${!isTop ? "navbar-white" : "navbar-transparent"}`}
      expand="lg"
    >
      <Navbar.Brand 
        className="navbar-brand d-flex align-items-center" 
        onClick={scrollToTop}
        style={{cursor: 'pointer'}}
      >
        <img 
          src={process.env.PUBLIC_URL + "/logo.png"} 
          alt="Vocalis Logo" 
          height="40" 
          className="me-2"
          style={{objectFit: 'contain'}}
        />
        <span className="fw-bold fs-4">Vocalis</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="toggler" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="#benefits" className="nav-link mx-2">Benefits</Nav.Link>
          <Nav.Link href="#features" className="nav-link mx-2">Features</Nav.Link>
          <Nav.Link href="#pricing" className="nav-link mx-2">Pricing</Nav.Link>
          <Nav.Link href="#about" className="nav-link mx-2">About</Nav.Link>
          <Nav.Link href="#faq" className="nav-link mx-2">FAQ</Nav.Link>
          <Nav.Link href="#contact" className="btn btn-primary text-white px-4 rounded-pill">
            Contact Us
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
});

export default Navigation;
