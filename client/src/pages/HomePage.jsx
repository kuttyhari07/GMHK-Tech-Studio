import React from "react";
import { useReveal } from "../hooks/useReveal";
import {
  Contact,
  FAQ,
  Footer,
  Hero,
  Navbar,
  Portfolio,
  Pricing,
  ReviewForm,
  Services,
  Testimonials,
} from "../components/sections.jsx";

const HomePage = () => {
  useReveal();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Pricing />
        <Testimonials />
        <ReviewForm />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
