import NotFound from '@/components/form/NotFound';
import { config } from '../constants';

export default function NotFoundPage() {
  return (
    <NotFound text={`Could not find the requested ${config.RESOURCE_NAME}.`} />
  );
}
