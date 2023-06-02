import React from 'react';

import { useThemeContext } from '@hooks/ThemeContext';
import { iconDarkTheme, iconLightTheme } from '@icons/index';

import styles from './ThemeSwitcher.module.scss';

const ThemeSwitcher: React.FC = () => {
  const themeContext = useThemeContext();

  const handleClick = () =>
    themeContext.setTheme(themeContext.theme === 'light' ? 'dark' : 'light');

  return (
    <div
      onClick={handleClick}
      className={styles.switcher}
      style={{
        backgroundImage: `url(${
          themeContext.theme === 'light' ? iconLightTheme : iconDarkTheme
        })`,
      }}
    ></div>
  );
};

export default ThemeSwitcher;
