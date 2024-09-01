import NotFound from '@/components/form/NotFound';
import { RESOURCE_NAME } from '../constants';

export default function NotFoundPage() {
  return <NotFound text={`Could not find the requested ${RESOURCE_NAME}.`} />;
}
