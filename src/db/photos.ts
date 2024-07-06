'use server';

import { WithId } from '@/db/index';

let photosPromise: Promise<Photo[]> | null = null;

async function getAllPhotosPromise() {
  const resp = await fetch(
    'https://api.slingacademy.com/v1/sample-data/photos?limit=1000',
  );
  console.log('>>', resp.url, resp.status, resp.statusText);
  const data: PhotoResponse = await resp.json();
  return data.photos.sort((a, b) => a.id - b.id);
}

export async function getAllPhotos() {
  if (!photosPromise) {
    photosPromise = getAllPhotosPromise();
  } else {
    console.log('>> loading photos`');
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  return await photosPromise;
}

export interface Photo extends WithId<number> {
  id: number;
  url: string;
  user: number;
  title: string;
  description: string;
}

interface PhotoResponse {
  success: boolean;
  total_photos: number;
  message: string;
  offset: number;
  limit: number;
  photos: Photo[];
}
