import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import CreateForm from './CreateForm';
import { getApis, getClients } from '../actions';
import React from 'react';
import {
  CREATE_PAGE_TITLE,
  LIST_PAGE_PATH,
  LIST_PAGE_TITLE,
} from '../constants';

export const metadata: Metadata = {
  title: CREATE_PAGE_TITLE,
};

export default async function Page() {
  const [apis, clients] = await Promise.all([getApis(), getClients()]);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: LIST_PAGE_TITLE, href: LIST_PAGE_PATH },
          {
            label: CREATE_PAGE_TITLE,
            active: true,
          },
        ]}
      />
      <CreateForm apis={apis} clients={clients} />
    </main>
  );
}
