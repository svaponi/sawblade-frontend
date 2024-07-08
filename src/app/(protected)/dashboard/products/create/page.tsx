import { Metadata } from 'next';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import { fetchCustomers } from '@/domain/invoices/actions';
import CreateForm from '@/app/(protected)/dashboard/products/create/CreateForm';

export const metadata: Metadata = {
  title: 'Create Invoice',
};

export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Products', href: '/dashboard/products' },
          {
            label: 'Create Product',
            active: true,
          },
        ]}
      />
      <CreateForm customers={customers} />
    </main>
  );
}
