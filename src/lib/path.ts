import 'server-only';
import { headers } from 'next/headers';

export function getPathname(): string {
  const pathname = headers().get('x-pathname');
  if (!pathname) {
    throw new Error('x-pathname header not found, check your middleware.');
  }
  return pathname;
}
