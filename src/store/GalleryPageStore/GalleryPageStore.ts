import { urls } from '@config/urlsCreator';
import {
  IGalleryModel,
  normalizeGalleryFWTApi,
  normalizeLocationsFWTApi,
} from '@models/GalleryFWT';
import { Meta } from '@utils/meta';
import {
  makeObservable,
  observable,
  computed,
  action,
  runInAction,
} from 'mobx';

import instanceAxios from '../instanceAxios';
import { ILocalStore } from '../useLocalStore';

export type AuthorsOptions = {
  id: number;
  name: string;
};

export type LocationsOptions = {
  id: number;
  name: string;
};

export type GetGalleryListParams = {
  nextPage: number;
  locationId: number;
  authorId: number;
  query: string;
  from_gte: number;
  to_lte: number;
};

interface IGalleryPageStore {
  getGallery(params: GetGalleryListParams): Promise<void>;
}

type PrivateFields =
  | '_list'
  | '_meta'
  | '_nextPage'
  | '_query'
  | '_locations'
  | '_authors'
  | '_fromGte'
  | '_toLte'
  | '_pagesAmount'
  | '_author'
  | '_location';

class GalleryPageStore implements ILocalStore, IGalleryPageStore {
  private _list: IGalleryModel[] = [];
  private _meta: Meta = Meta.initial;
  private _nextPage: number = 1;
  private _query: string = '';
  private _locations: LocationsOptions[] = [
    {
      id: 999,
      name: '',
    },
  ];
  private _authors: AuthorsOptions[] = [
    {
      id: 999,
      name: '',
    },
  ];
  private _fromGte: string = '';
  private _toLte: string = '';
  private _pagesAmount: number = 1;
  private _author: AuthorsOptions = { id: 999, name: '' };
  private _location: LocationsOptions = { id: 999, name: '' };
  private readonly _lengthList: number = 12;

  constructor() {
    makeObservable<GalleryPageStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      _nextPage: observable,
      _query: observable,
      _locations: observable,
      _authors: observable,
      _fromGte: observable.ref,
      _toLte: observable.ref,
      _pagesAmount: observable.ref,
      _author: observable.ref,
      _location: observable.ref,
      list: computed,
      meta: computed,
      authors: computed,
      locations: computed,
      fromGte: computed,
      toLte: computed,
      pagesAmount: computed,
      setAuthor: action,
      setQuery: action,
      setLocation: action,
      setFromGte: action,
      setToLte: action,
      reset: action,
    });
  }

  get list(): IGalleryModel[] {
    return this._list;
  }

  get meta(): Meta {
    return this._meta;
  }

  get query(): string {
    return this._query;
  }

  get locations(): LocationsOptions[] {
    return this._locations;
  }

  get authors(): AuthorsOptions[] {
    return this._authors;
  }

  get fromGte(): string {
    return this._fromGte;
  }

  get toLte(): string {
    return this._toLte;
  }

  get pagesAmount(): number {
    return this._pagesAmount;
  }

  get nextPage(): number {
    return this._nextPage;
  }

  get author(): AuthorsOptions {
    return this._author;
  }

  get location(): LocationsOptions {
    return this._location;
  }

  setNextPage = (nextPage: number) => {
    this._nextPage = nextPage;

    this.getGallery();
  };

  setQuery = (query: string) => {
    this._query = query;
    this._nextPage = 1;

    this.getGallery();
  };

  setLocation = (location: LocationsOptions) => {
    this._location = location;
    this._nextPage = 1;

    this.getGallery();
  };

  setAuthor = (author: AuthorsOptions) => {
    this._author = author;
    this._nextPage = 1;

    this.getGallery();
  };

  setFromGte = (from_gte: string) => {
    this._fromGte = from_gte;
    this._nextPage = 1;

    this.getGallery();
  };

  setToLte = (to_lte: string) => {
    this._toLte = to_lte;
    this._nextPage = 1;

    this.getGallery();
  };

  reset(): void {
    this._list = [];
    this._meta = Meta.initial;
    this._nextPage = 1;
    this._query = '';
    this._fromGte = '';
    this._toLte = '';
  }

  getAuthors = async (): Promise<void> => {
    try {
      const authorsResponse = await instanceAxios.get(urls.urlAuthors());
      this._authors = authorsResponse.data;
    } catch (e) {
      this._meta = Meta.error;
    }
  };

  getLocations = async (): Promise<void> => {
    try {
      const locationsResponse = await instanceAxios.get(urls.urlLocations());

      runInAction(() => {
        const locationsData = locationsResponse.data.map(
          normalizeLocationsFWTApi
        );
        this._locations = locationsData;
      });
    } catch (e) {
      this._meta = Meta.error;
    }
  };

  getGallery = async (): Promise<void> => {
    this._meta = Meta.loading;

    try {
      const response = await instanceAxios.get(
        urls.urlPaintings({
          page: this._nextPage,
          limit: this._lengthList,
          locationId: this._location.id,
          authorId: this._author.id,
          query: this._query,
          from_gte: this._fromGte,
          to_lte: this._toLte,
        })
      );

      const pagesAmountResponse = await instanceAxios.get(
        urls.urlPaintings({
          page: this._nextPage,
          locationId: this._location.id,
          authorId: this._author.id,
          query: this._query,
          from_gte: this._fromGte,
          to_lte: this._toLte,
        })
      );

      runInAction(() => {
        const data = response.data.map(normalizeGalleryFWTApi);
        const pagesAmountData = pagesAmountResponse.data;
        if (this._nextPage === 1) {
          this._pagesAmount = Math.ceil(pagesAmountData.length / 12);
        }

        this._list = [...data];

        this._meta = Meta.success;
      });
    } catch (e) {
      this._meta = Meta.error;
    }
  };

  destroy(): void {
    this.reset();
    this.getGallery();
  }
}

export { GalleryPageStore };
