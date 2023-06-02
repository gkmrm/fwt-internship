import { createContext, Dispatch, SetStateAction } from 'react';

export type themeTypes = 'light' | 'dark';

export interface ThemeProps {
  theme: themeTypes;
  setTheme: Dispatch<SetStateAction<themeTypes>>;
}

export const themeDefaultValue: ThemeProps = {
  theme: 'light',
  setTheme: () => 'light',
};

export const ThemeContext = createContext<ThemeProps>(themeDefaultValue);

const ThemeProvider = ThemeContext.Provider;

export default ThemeProvider;
