import React, { FC, useRef, useState } from 'react';

import Arrow from '@components/Arrow';
import { useThemeContext } from '@hooks/ThemeContext';
import useOutsideClick from '@hooks/useOutsideClick';
import resetButton from '@icons/resetButton.svg';
import cn from 'classnames/bind';
import { observer } from 'mobx-react-lite';
import SimpleBar from 'simplebar-react';

import styles from './DropDown.module.scss';

import './SimpleBar.scss';

const cx = cn.bind(styles);

type Options = {
  id: number;
  name: string;
};

export interface ISelect {
  /**
   * Specify an optional className to be applied to the select box
   */
  className?: string;
  /**
   * Specify whether the control is disabled
   */
  disabled?: boolean;
  /**
   * Provide the contents of your Select
   */
  options: Options[];
  /**
   * The value of the `<select>`
   */
  value: Options;
  /**
   * A placeholder that is shown when nothing is selected
   */
  placeholder: string;
  /**
   * The callback function that is called each time the value of
   * the underlying `<input>` changes
   */
  onChange: (option: Options) => void;
  /**
   * The callback function that is called when the reset element is clicked
   */
  onHandleReset: () => void;
}

const DropDown: FC<ISelect> = ({
  className,
  disabled = false,
  options,
  value,
  placeholder,
  onChange,
  onHandleReset,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef(null);
  const toggleOpen = () => setIsOpen((prev) => !prev);
  useOutsideClick(ref, toggleOpen);

  const { theme } = useThemeContext();

  const isDarkTheme = theme === 'dark' ? true : false;

  const handleChange = (option: Options) => {
    if (value.id !== option.id) {
      onChange(option);
    }
  };

  return (
    <div
      ref={isOpen ? ref : null}
      className={cx(className, 'Select', {
        'Select--open': isOpen,
        'Select--dark': isDarkTheme,
      })}
      onClick={!disabled ? toggleOpen : () => {}}
      aria-hidden='true'
    >
      {value.name === '' && (
        <span className={cx('Select__title')}>{placeholder}</span>
      )}
      <span className={cx('Select__title')}>{value.name}</span>
      {value.name !== '' && (
        <div
          className={styles.reset}
          onClick={(e) => {
            onHandleReset();
            e.stopPropagation();
          }}
        >
          <img src={resetButton} className={styles.reset__icon} />
        </div>
      )}
      <Arrow
        isOpen={isOpen}
        className={cx('Select__arrow')}
        isDarkTheme={isDarkTheme}
      />
      {isOpen && options && (
        <ul
          className={cx('Select__optionContainer', {
            'Select__optionContainer--open': isOpen,
            'Select__optionContainer--dark': isDarkTheme,
          })}
        >
          <SimpleBar style={{ maxHeight: 'inherit' }}>
            {options.map((option) => (
              <li
                onClick={() => handleChange(option)}
                className={cx('Select__option', {
                  'Select__option--dark': isDarkTheme,
                })}
                key={option.id}
                aria-hidden='true'
              >
                <p className={cx('Select__optionName')}>{option.name}</p>
              </li>
            ))}
          </SimpleBar>
        </ul>
      )}
    </div>
  );
};

export default observer(DropDown);
