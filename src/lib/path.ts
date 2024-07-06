import 'server-only';
import { headers } from 'next/headers';

export function getPathname() {
  const referer = headers().get('referer');
  return new URL(referer ?? '/').pathname;
}
