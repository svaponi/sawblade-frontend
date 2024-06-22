import { HomeIcon } from '@/components/ui/icons';
import Link from 'next/link';

export default function ExitButton() {
  return (
    <Link href={'/'}>
      <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition-all hover:text-gray-900">
        <HomeIcon className="h-4 w-4" />
        Exit
      </button>
    </Link>
  );
}
