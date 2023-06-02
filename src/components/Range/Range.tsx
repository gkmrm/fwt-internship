import React, { FC, useRef, useState } from 'react';

import Arrow from '@components/Arrow';
import { useThemeContext } from '@hooks/ThemeContext';
import useOutsideClick from '@hooks/useOutsideClick';
import cn from 'classnames/bind';
import { observer } from 'mobx-react-lite';

import styles from './Range.module.scss';

const cx = cn.bind(styles);

export interface IRange {
  children: React.ReactNode;
  /**
   * Specify an optional className to be applied to the select box
   */
  className?: string;
  /**
   * Display name of the filter Range
   */
  placeholder: string;
  /**
   * Current theme
   */
  onClose: () => void;
}

const Range: FC<IRange> = ({ children, className, placeholder, onClose }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef(null);

  const openMenu = () => {
    setIsOpen(true);
  };

  const hideMenu = () => {
    setIsOpen(false);
    onClose();
  };

  useOutsideClick(ref, hideMenu);

  const { theme } = useThemeContext();
  const isDarkTheme = theme === 'dark' ? true : false;

  return (
    <div
      ref={ref}
      className={cx(className, 'Range', {
        'Range--open': isOpen,
        'Range--dark': isDarkTheme,
      })}
      aria-hidden='true'
      onClick={isOpen ? hideMenu : openMenu}
    >
      <span className={cx('Range__title')}>{placeholder}</span>
      <Arrow
        className={cx('Range__arrow')}
        isOpen={isOpen}
        isDarkTheme={isDarkTheme}
      />
      {isOpen && (
        <div
          className={cx('Range__сontainer', {
            'Range__сontainer--open': isOpen,
            'Range__сontainer--dark': isDarkTheme,
          })}
          onClick={(e) => e.stopPropagation()}
          aria-hidden='true'
        >
          <div>{children}</div>
        </div>
      )}
    </div>
  );
};

export default observer(Range);
