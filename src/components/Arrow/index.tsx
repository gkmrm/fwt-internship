import React, { FC } from 'react';

import { ReactComponent as SelectArrow } from '@icons/selectArrow.svg';
import cn from 'classnames/bind';

import styles from './Arrow.module.scss';

export type TArrow = {
  isOpen: boolean;
  isDarkTheme: boolean;
  className?: string;
};

const cx = cn.bind(styles);

const Arrow: FC<TArrow> = ({ isOpen, isDarkTheme, className }) => (
  <div
    className={cx(className, {
      Arrow__opened: isOpen,
      Arrow__dark: isDarkTheme,
    })}
  >
    <SelectArrow />
  </div>
);

export default Arrow;
