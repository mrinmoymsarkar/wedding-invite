import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Events from './components/Events';
import Gallery from './components/Gallery';
import Culture from './components/Culture';
import RSVP from './components/RSVP';
import Footer from './components/Footer';
import Tutorial from './components/Tutorial';
import AnimatedBackground from './components/AnimatedBackground';
import AdminPage from './pages/AdminPage';

function MainWebsite() {
  return (
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
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/admin-dashboard" element={<AdminPage />} />
              <Route path="/*" element={<MainWebsite />} />
            </Routes>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;