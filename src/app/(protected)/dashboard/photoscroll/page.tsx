import { getPhotoScroll } from '@/app/(protected)/dashboard/photoscroll/actions';
import Search from '@/app/(protected)/dashboard/components/Search';
import React, { Suspense } from 'react';
import ScrollList from '@/app/(protected)/dashboard/photoscroll/ScrollList';

interface Props {
  searchParams?: {
    query?: string;
    next?: string;
  };
}

export default async function Page(props: Props) {
  return (
    <div className="grid gap-4 md:gap-8">
      <div className="flex items-center justify-between gap-10">
        <div className="">
          <div className="text-2xl font-semibold">
            <h3>Photos</h3>
          </div>
          <div className="text-sm text-gray-500">
            <h3>All photos in the system</h3>
          </div>
        </div>
        <Search placeholder="Search photos..." />
      </div>
      <div className="flex flex-col gap-4">
        <Suspense fallback={<div>Loading...</div>} key={JSON.stringify(props)}>
          <SuspendedList {...props} />
        </Suspense>
      </div>
    </div>
  );
}

async function SuspendedList({ searchParams }: Props) {
  const query = searchParams?.query;
  const next = searchParams?.next;
  const result = await getPhotoScroll(query, next);
  return <ScrollList result={result} query={query} />;
}
