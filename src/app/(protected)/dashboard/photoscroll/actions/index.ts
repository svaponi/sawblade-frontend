'use server';
import { ScrollResult } from '@/app/components/ScrollableList';
import { getAllPhotos, Photo as PhotoAlias } from '@/db/photos';

const PAGE_SIZE = 5;

export type Photo = PhotoAlias;

export async function getPhotoScroll(
  query?: string,
  next?: string,
): Promise<ScrollResult<Photo>> {
  let collection = await getAllPhotos();
  if (query) {
    collection = collection.filter(
      (photo) =>
        photo.title.toLowerCase().includes(query.toLowerCase()) ||
        photo.description.toLowerCase().includes(query.toLowerCase()),
    );
  }
  let offset = Number(next ?? 0);
  const data = collection.slice(offset, offset + PAGE_SIZE);
  const result = {
    data,
    next: String(offset + PAGE_SIZE),
    total: collection.length,
  };
  console.log('getPhotoScroll', query, next, collection.length);
  return result;
}
