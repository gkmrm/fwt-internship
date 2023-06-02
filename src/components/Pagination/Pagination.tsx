import React, { FC } from 'react';

import { useThemeContext } from '@hooks/ThemeContext';
import usePaginationSlice from '@hooks/usePaginationSlice';
import { ReactComponent as ArrowL } from '@icons/arrowL.svg';
import { ReactComponent as ArrowR } from '@icons/arrowR.svg';
import { ReactComponent as DoubleArrowL } from '@icons/doubleArrowL.svg';
import { ReactComponent as DoubleArrowR } from '@icons/doubleArrowR.svg';
import cn from 'classnames/bind';
import { observer } from 'mobx-react-lite';

import styles from './Pagination.module.scss';
import PaginationPage from './PaginationPage';
import PaginationPageWithActive from './PaginationPageWithActive';

const cx = cn.bind(styles);

export type TPagination = {
  /**
   * The total number of items
   */
  pagesAmount: number;
  /**
   * The current page
   */
  currentPage: number;
  /**
   * Additional CSS class names
   */
  className?: string;
  /**
   * The callback function called when the current page changes
   */
  onChange: (currentPage: number) => void;
};

const Pagination: FC<TPagination> = ({
  currentPage,
  pagesAmount,
  className,
  onChange,
}) => {
  const { theme } = useThemeContext();
  const isDarkTheme = theme === 'dark' ? true : false;

  const slicedPagesArray = usePaginationSlice({
    current: currentPage,
    amount: pagesAmount,
  });

  const leftArrowProps = {
    isDarkTheme,
    disabled: currentPage < 2,
  };

  const rightArrowProps = {
    isDarkTheme,
    disabled: currentPage >= pagesAmount,
  };

  return (
    <div className={cx(className, 'Pagination')}>
      <PaginationPage {...leftArrowProps} onClick={() => onChange(1)}>
        <DoubleArrowL />
      </PaginationPage>
      <PaginationPage
        {...leftArrowProps}
        onClick={() => onChange(currentPage - 1)}
      >
        <ArrowL />
      </PaginationPage>

      {slicedPagesArray.map((el) => (
        <PaginationPageWithActive
          isDarkTheme={isDarkTheme}
          onClick={() => onChange(el)}
          isActive={currentPage === el}
          key={el}
        >
          {el}
        </PaginationPageWithActive>
      ))}
      <PaginationPage
        {...rightArrowProps}
        onClick={() => onChange(currentPage + 1)}
      >
        <ArrowR />
      </PaginationPage>
      <PaginationPage
        {...rightArrowProps}
        onClick={() => onChange(pagesAmount)}
      >
        <DoubleArrowR />
      </PaginationPage>
    </div>
  );
};

export default observer(Pagination);
