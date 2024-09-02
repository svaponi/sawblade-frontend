import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import CreateForm from './CreateForm';
import { getApis, getClients } from '../actions';
import React from 'react';
import { config } from '../constants';

export const metadata: Metadata = {
  title: config.CREATE_PAGE_TITLE,
};

export default async function Page() {
  const [apis, clients] = await Promise.all([getApis(), getClients()]);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: config.LIST_PAGE_TITLE, href: config.LIST_PAGE_PATH },
          {
            label: config.CREATE_PAGE_TITLE,
            active: true,
          },
        ]}
      />
      <CreateForm apis={apis} clients={clients} />
    </main>
  );
}
