import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getById } from '@/app/(protected)/dashboard/products/actions';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import EditForm from '@/app/(protected)/dashboard/products/[id]/edit/EditForm';
import { fetchCustomers } from '@/domain/invoices/actions';

export const metadata: Metadata = {
  title: 'Edit Invoice',
};

interface Props {
  params: { id: string };
  searchParams?: {
    fromPage?: string;
  };
}

export default async function Page({ params, searchParams }: Props) {
  const fromPage = searchParams?.fromPage;
  const id = params.id;
  const [product, customers] = await Promise.all([
    getById(id),
    fetchCustomers(),
  ]);

  if (!product) {
    notFound();
  }

  const backTo = fromPage
    ? `/dashboard/products?page=${fromPage}`
    : '/dashboard/products';

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: 'Products',
            href: backTo,
          },
          {
            label: 'Edit Product',
            active: true,
          },
        ]}
      />
      <EditForm product={product} customers={customers} backTo={backTo} />
    </main>
  );
}
