import { BASE_URL } from './BASE_URLS';

const createUrl = (url: string): string => `${BASE_URL}${url}`;

const defaultLimitOfResponse = 120;

const urls = {
  urlPaintings: (params?: {
    page?: number;
    limit?: number;
    locationId?: number;
    authorId?: number;
    query?: string;
    from_gte?: number | string;
    to_lte?: number | string;
  }): string => {
    return createUrl(
      `/paintings?_page=${params?.page ? `${params?.page}` : ''}${
        params?.limit
          ? `&_limit=${params?.limit}`
          : `&_limit=${defaultLimitOfResponse}`
      }${
        params?.locationId
          ? params.locationId === 999
            ? ''
            : `&locationId=${params.locationId}`
          : ''
      }${
        params?.authorId
          ? params.authorId === 999
            ? ''
            : `&authorId=${params.authorId}`
          : ''
      }${params?.query ? `&q=${params.query}` : ''}${
        params?.from_gte ? `&created_gte=${params.from_gte}` : ''
      }${params?.to_lte ? `&created_lte=${params.to_lte}` : ''}`
    );
  },
  urlAuthors: (params?: { id?: number }): string =>
    createUrl(`/authors/
    ${params?.id ? `${params.id}` : ``}`),
  urlLocations: (params?: { id?: number }): string =>
    createUrl(`/locations/
    ${params?.id ? `${params.id}` : ``}`),
};

export { createUrl, urls };
