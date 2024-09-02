import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import CreateForm from './CreateForm';
import React from 'react';
import { config } from '../constants';

export const metadata: Metadata = {
  title: config.CREATE_PAGE_TITLE,
};

export default async function Page() {
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
      <CreateForm />
    </main>
  );
}
