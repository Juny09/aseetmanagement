import React, { useState, useEffect } from 'react';
import '../styles/globals.css';
import '../styles/homep.css';
import '../styles/form.css';
import type { AppProps } from 'next/app';
import { FiSun, FiMoon } from 'react-icons/fi';


function MyApp({ Component, pageProps }: AppProps) {
  // Step 1: Create a state variable to track dark mode
  const [darkMode, setDarkMode] = useState(false);

  // Step 2: Create a function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Step 3: Use useEffect to apply the dark mode class to the root element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <div>

  
      {/* Render your component */}
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
