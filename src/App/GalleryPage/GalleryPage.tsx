import React from 'react';

import { Loader } from '@components/Loader';
import { Message } from '@components/Message';
import { Pagination } from '@components/Pagination';
import { useThemeContext } from '@hooks/ThemeContext';
import { GalleryPageStore } from '@store/GalleryPageStore';
import { useLocalStore } from '@store/useLocalStore';
import { Meta } from '@utils/meta';
import { observer } from 'mobx-react-lite';

import { FiltersBar } from './components/FiltersBar';
import { Gallery } from './components/Gallery';
import { Header } from './components/Header';
import styles from './GalleryPage.module.scss';

const GalleryPage: React.FC = () => {
  const galleryStore = useLocalStore(() => new GalleryPageStore());

  const { theme } = useThemeContext();

  React.useEffect(() => {
    galleryStore.getGallery();
  }, [galleryStore.author, galleryStore.location]);

  React.useEffect(() => {
    galleryStore.getAuthors();
    galleryStore.getLocations();
  }, []);

  const onChangePage = (page: number) => {
    galleryStore.setNextPage(page);
  };

  return (
    <div className={styles[theme]}>
      <div className={styles.container}>
        <Header />
        <FiltersBar store={galleryStore} />
        {galleryStore.meta === Meta.error && (
          <Message
            text={'Sorry. Something went wrong. Try reloading the page.'}
          />
        )}
        {galleryStore.meta === Meta.loading ? (
          <Loader className={styles.loader} />
        ) : (
          <>
            <Gallery store={galleryStore} />
            <Pagination
              pagesAmount={galleryStore.pagesAmount}
              currentPage={galleryStore.nextPage}
              onChange={onChangePage}
            />
          </>
        )}
      </div>
    </div>
  );
};
export default observer(GalleryPage);
