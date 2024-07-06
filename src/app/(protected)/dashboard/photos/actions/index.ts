'use server';
import { getAllPhotos, Photo } from '@/db/photos';
import { PageResult } from '@/app/components/PageList';

const PAGE_SIZE = 5;

export async function getPhotos(
  query?: string,
  page?: number,
): Promise<PageResult<Photo>> {
  let collection = await getAllPhotos();
  if (query) {
    collection = collection.filter(
      (photo) =>
        photo.title.toLowerCase().includes(query.toLowerCase()) ||
        photo.description.toLowerCase().includes(query.toLowerCase()),
    );
  }
  let offset = page ? (page - 1) * PAGE_SIZE : 0;
  const data = collection.slice(offset, offset + PAGE_SIZE);
  const totalPages = collection.length
    ? Math.ceil(collection.length / PAGE_SIZE)
    : data.length
      ? 1
      : 0;
  return { data, totalPages };
}

export async function getPhotoCount(): Promise<number> {
  let collection = await getAllPhotos();
  return collection.length;
}
