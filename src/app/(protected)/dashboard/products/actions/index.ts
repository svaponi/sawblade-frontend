'use server';
import { ScrollResult } from '@/app/components/ScrollableList';
import { getAllPhotos, Photo } from '@/db/photos';

const PAGE_SIZE = 5;

export type Product = Photo;

export async function getProducts(
  query?: string,
  next?: string,
): Promise<ScrollResult<Product>> {
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
  const result = { data, next: String(offset + PAGE_SIZE), total: collection.length };
  console.log('getProducts', query, next, collection.length);
  return result;
}

export async function getProductCount(): Promise<number> {
  let collection = await getAllPhotos();
  return collection.length;
}
