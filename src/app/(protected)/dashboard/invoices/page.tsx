import { Suspense } from 'react';
import { Metadata } from 'next';
import Search from '@/app/(protected)/dashboard/components/Search';
import { CreateInvoice } from '@/domain/invoices/buttons';
import Pagination from '@/app/components/Pagination';
import { countInvoices } from '@/domain/invoices/actions';
import InvoicesTable from '@/domain/invoices/table';
import { InvoicesTableSkeleton } from '@/domain/invoices/skeletons';

export const metadata: Metadata = {
  title: 'Invoices',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await countInvoices(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <InvoicesTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
