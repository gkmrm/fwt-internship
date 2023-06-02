import React, { FC } from 'react';

import classNames from 'classnames';

import PaginationPage, { PaginationPageProps } from './PaginationPage';
import styles from './PaginationPage.module.scss';

interface IProps extends PaginationPageProps {
  isActive: boolean;
}

const PaginationPageWithActive: FC<IProps> = ({
  isDarkTheme,
  isActive,
  className,
  ...other
}) => {
  return (
    <PaginationPage
      isDarkTheme={isDarkTheme}
      className={classNames(styles[`${className}`], {
        [styles[`PaginationPageWithActive`]]: isActive,
        [styles[`PaginationPageWithActive--dark`]]: isDarkTheme && isActive,
      })}
      {...other}
    />
  );
};

export default PaginationPageWithActive;
