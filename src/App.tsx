import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Events from './components/Events';
import Gallery from './components/Gallery';
import Culture from './components/Culture';
import RSVP from './components/RSVP';
import Footer from './components/Footer';
import Tutorial from './components/Tutorial';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-white dark:bg-dark-900 transition-colors duration-300 relative">
          <AnimatedBackground />
          <Header />
          <main className="relative z-10">
            <Hero />
            <Events />
            <Gallery />
            <Culture />
            <RSVP />
          </main>
          <Footer />
          <Tutorial />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;