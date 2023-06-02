import React from 'react';

import { Card } from '@components/Card';
import { GalleryPageStore } from '@store/GalleryPageStore';
import { observer } from 'mobx-react-lite';

import styles from './Gallery.module.scss';

interface IGalleryProps {
  store: GalleryPageStore;
}

const Gallery: React.FC<IGalleryProps> = observer(({ store }) => {
  return (
    <div className={styles.gallery}>
      {store.list.map((paint) => (
        <Card
          key={paint.id}
          locationId={paint.locationId}
          imageUrl={paint.paintSource}
          name={paint.paintName}
          created={paint.createdAt}
          authorId={paint.authorId}
          store={store}
        />
      ))}
    </div>
  );
});

export default Gallery;
