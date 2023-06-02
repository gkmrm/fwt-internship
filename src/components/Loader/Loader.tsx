import React from 'react';

import classNames from 'classnames';

import styles from './Loader.module.scss';

export enum LoaderSize {
  s = 's',
  m = 'm',
  l = 'l',
}

export type LoaderProps = {
  /**
   * Boolean value for displaying the component,
   * optional, without it Loader is shown all the time,
   * Recommended to use Loader together with chaining
   */
  loading?: boolean;
  /**
   * Loader has 3 sizes 's' = 20px | 'l' = 40px | 'm' = 60px
   * Inside the component, an enum is exported with the dimensions of the Loader
   */
  size?: LoaderSize;
  /**
   * Additional clases for CSS
   */
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({
  loading = true,
  size = 'm',
  className,
}) => {
  return (
    <>
      {loading && (
        <div className={classNames(styles.loader, styles[size], className)} />
      )}
    </>
  );
};

export default Loader;
