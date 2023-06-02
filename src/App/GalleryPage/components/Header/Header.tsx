import React from 'react';

import { ThemeSwitcher } from '@components/ThemeSwitcher';
import { FWTLogo } from '@icons/index';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.head}>
      <img className={styles.image} src={FWTLogo} alt='FWTLogo' />
      <ThemeSwitcher />
    </header>
  );
};

export default Header;
