import React from 'react';

import { IMG_BASE_URL } from '@config/BASE_URLS';
import { GalleryPageStore } from '@store/GalleryPageStore';
import { observer } from 'mobx-react-lite';

import styles from './Card.module.scss';

type TCardProps = {
  /**
   * String for src={${IMG_BASE_URL} + ///} in <img/>
   */
  imageUrl: string;
  /**
   * Name of Paint - STRING
   */
  name: string;
  /**
   * When was it created - STRING
   */
  created: string;
  /**
   * Id of author for compare with list of Authors
   */
  authorId: number;
  /**
   * Id of location for compare with list of location
   */
  locationId: number;
  /**
   * Main app store/ GalleryPageStore
   */
  store: GalleryPageStore;
};

const Card: React.FC<TCardProps> = (props) => {
  const [imageError, setImageError] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const errorMessageForUser = `Sorry. This picture could not be loaded. Try reloading the page ---> PICTURE: "${props.name}" `;

  return (
    <div className={styles.card}>
      {imageError ? (
        <div className={styles.placeholder}>{errorMessageForUser}</div>
      ) : (
        <img
          src={`${IMG_BASE_URL}${props.imageUrl}`}
          alt={props.name}
          className={styles.image}
          onError={handleImageError}
        />
      )}

      <div className={styles.cardInfo}>
        <h3 className={styles.title}>{props.name}</h3>
        <p>
          <span className={styles.subtitle}>Author: </span>{' '}
          {
            props.store.authors.find((author) => author.id === props.authorId)
              ?.name
          }
        </p>
        <p>
          <span className={styles.subtitle}>Created: </span> {props.created}
        </p>
        <p>
          <span className={styles.subtitle}>Location: </span>{' '}
          {
            props.store.locations.find(
              (location) => location.id === props.locationId
            )?.name
          }
        </p>
      </div>
    </div>
  );
};
export default observer(Card);
