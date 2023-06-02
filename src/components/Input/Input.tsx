import React from 'react';

import { useThemeContext } from '@hooks/ThemeContext';
import { observer } from 'mobx-react-lite';

import styles from './Input.module.scss';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  /**
   * Value of the Input, from Store or State
   */
  value?: string;
  /**
   * The callback function that is called each time the value of
   * the `<input>` changes
   */
  onChange: (value: string) => void;
  /**
   * Additional classes for CSS
   */
  className?: string;
  /**
   * Displayed placeholder when there is no value
   */
  placeholder: string;
  disabled: boolean;
};

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  className = '',
  placeholder,
  disabled = false,
  ...rest
}) => {
  const handleInputChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    onChange(target.value);
  };

  const { theme } = useThemeContext();

  const inputClassName = `${styles.input} ${className} 
  ${styles[`${theme}`]} ${disabled ? styles.input_disabled : ''} `;

  return (
    <input
      className={inputClassName}
      value={value}
      placeholder={placeholder}
      onChange={handleInputChange}
      {...rest}
    />
  );
};

export default observer(Input);
