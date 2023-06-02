export interface IGalleryFWTApi {
  authorId: number;
  created: string;
  id: number;
  imageUrl: string;
  locationId: number;
  name: string;
}

export interface IGalleryModel {
  id: number;
  paintName: string;
  paintSource: string;
  authorId: number;
  createdAt: string;
  locationId: number;
}

export const normalizeGalleryFWTApi = (
  paint: IGalleryFWTApi
): IGalleryModel => ({
  id: paint.id,
  paintName: paint.name,
  paintSource: paint.imageUrl,
  authorId: paint.authorId,
  createdAt: paint.created,
  locationId: paint.locationId,
});

export interface IGalleryAuthorApi {
  id: number;
  name: string;
}

export interface IGalleryLocationApi {
  id: number;
  location: string;
}

export interface IGalleryLocationModel {
  id: number;
  name: string;
}

export const normalizeLocationsFWTApi = (
  location: IGalleryLocationApi
): IGalleryLocationModel => ({
  id: location.id,
  name: location.location,
});
