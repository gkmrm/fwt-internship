import React, { useState } from 'react';

import { ThemeProvider, themeTypes } from '@hooks/ThemeContext';

import { GalleryPage } from './GalleryPage';

const App = () => {
  const [theme, setTheme] = useState<themeTypes>('light');

  return (
    <ThemeProvider value={{ theme, setTheme }}>
      <GalleryPage />
    </ThemeProvider>
  );
};

export default App;
