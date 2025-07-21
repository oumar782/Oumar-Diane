import React from 'react';
import About from './composant/About';
import Navbar from './composant/Navbar';
import Hero from './composant/Hero';
import Skills from './composant/Skills';
import Projet from './composant/Projet';
import Contact from './composant/Contact';



function App() {
  return (
    <>
      <Navbar />
      <Hero />

      <About />
      <Skills />
      <Projet />
      <Contact />
    </>
  );
}

export default App;