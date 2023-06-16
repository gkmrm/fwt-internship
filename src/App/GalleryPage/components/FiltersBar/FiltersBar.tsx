import React from 'react';

import { DropDown } from '@components/DropDown';
import { Input } from '@components/Input';
import { Range } from '@components/Range';
import defaultOtion from '@config/defaultParameters';
import { useThemeContext } from '@hooks/ThemeContext';
import { dashForRange, dashForRangeDark } from '@icons/index';
import { GalleryPageStore } from '@store/GalleryPageStore';
import {
  AuthorsOptions,
  LocationsOptions,
} from '@store/GalleryPageStore/GalleryPageStore';
import _ from 'lodash';
import { observer } from 'mobx-react-lite';

import styles from './FiltersBar.module.scss';

interface IFilterBarProps {
  store: GalleryPageStore;
}

const FiltersBar: React.FC<IFilterBarProps> = ({ store }) => {
  const { theme } = useThemeContext();
  const isDarkTheme = theme === 'dark';

  const onChangeQuery = (query: string) => {
    store.setQuery(query);
  };
  const debounceSearchQuery = _.debounce(onChangeQuery, 650);

  const onChangeAuthors = (option: AuthorsOptions) => {
    store.setAuthor(option);
  };

  const onChangeLocation = (option: LocationsOptions) => {
    store.setLocation(option);
  };

  const onChangeGte = (value: string) => {
    store.setFromGte(value);
  };
  const debounceChangeGte = _.debounce(onChangeGte, 500);

  const onChangeLte = (value: string) => {
    store.setToLte(value);
  };
  const debounceChangeLte = _.debounce(onChangeLte, 500);

  const onHandleResetAuthors = () => {
    store.setAuthor(defaultOtion);
  };

  const onHandleResetLocations = () => {
    store.setLocation(defaultOtion);
  };

  return (
    <div className={styles.filters}>
      <Input
        placeholder={'Name'}
        onChange={debounceSearchQuery}
        className={
          isDarkTheme ? `${styles[`queryInput--dark`]}` : styles.queryInput
        }
      />
      <DropDown
        options={store.authors}
        value={store.author}
        placeholder={'Authors'}
        onChange={onChangeAuthors}
        onHandleReset={onHandleResetAuthors}
      />
      <DropDown
        options={store.locations}
        value={store.location}
        placeholder={'Locations'}
        onChange={onChangeLocation}
        onHandleReset={onHandleResetLocations}
      />
      <Range onClose={() => {}} placeholder={'Created'}>
        <div className={styles.range}>
          <Input
            placeholder={store.fromGte != '' ? `${store.fromGte}` : 'from'}
            onChange={debounceChangeGte}
            className={
              isDarkTheme ? `${styles[`inputRange--dark`]}` : styles.inputRange
            }
          />
          <img
            src={theme === 'light' ? dashForRange : dashForRangeDark}
            className={styles.dash}
          />
          <Input
            placeholder={store.toLte != '' ? `${store.toLte}` : 'before'}
            onChange={debounceChangeLte}
            className={
              isDarkTheme ? `${styles[`inputRange--dark`]}` : styles.inputRange
            }
          />
        </div>
      </Range>
    </div>
  );
};

export default observer(FiltersBar);
