import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';

interface Props {
  text: string;
}

export default function NotFound({ text }: Props) {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-muted-foreground" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>{text}</p>
      <Link
        href="../"
        className="mt-4 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
      >
        Go Back
      </Link>
    </main>
  );
}
