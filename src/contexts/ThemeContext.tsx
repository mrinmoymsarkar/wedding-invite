import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'auto';

interface ThemeContextType {
  theme: Theme;
  actualTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme;
    return saved || 'auto';
  });

  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const root = window.document.documentElement;

    // Get theme based on IST time (UTC+5:30)
    // Light mode: 6 AM - 6 PM IST, Dark mode: 6 PM - 6 AM IST
    const getISTTimeBasedTheme = (): 'light' | 'dark' => {
      const now = new Date();
      // Convert to IST (UTC+5:30)
      const utcHours = now.getUTCHours();
      const utcMinutes = now.getUTCMinutes();
      const istTotalMinutes = (utcHours * 60 + utcMinutes) + 330; // Add 5 hours 30 minutes
      const istHours = Math.floor((istTotalMinutes % 1440) / 60); // 1440 = 24 * 60

      // Day time: 6 AM (6) to 6 PM (18)
      return (istHours >= 6 && istHours < 18) ? 'light' : 'dark';
    };

    const applyTheme = (newTheme: Theme) => {
      let applied: 'light' | 'dark';

      if (newTheme === 'auto') {
        applied = getISTTimeBasedTheme();
      } else {
        applied = newTheme;
      }

      setActualTheme(applied);

      if (applied === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    applyTheme(theme);
    localStorage.setItem('theme', theme);

    // Check every minute for time-based theme changes when in auto mode
    let intervalId: number | undefined;
    if (theme === 'auto') {
      intervalId = window.setInterval(() => {
        applyTheme('auto');
      }, 60000); // Check every minute
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, actualTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};