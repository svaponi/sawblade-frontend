import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import React from 'react';
import EditForm from './EditForm';
import JSONStringify from '@/components/form/JSONStringify';
import { config } from '../constants';
import { getApis, getById, getClients } from '../actions';

export const metadata: Metadata = {
  title: config.EDIT_PAGE_TITLE,
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
  const [item, apis, clients] = await Promise.all([
    getById(id),
    getApis(),
    getClients(),
  ]);

  if (!item) {
    notFound();
  }

  const backTo = fromPage
    ? `${config.LIST_PAGE_PATH}?page=${fromPage}`
    : config.LIST_PAGE_PATH;

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: config.LIST_PAGE_TITLE,
            href: backTo,
          },
          {
            label: config.EDIT_PAGE_TITLE,
            active: true,
          },
        ]}
      />
      <EditForm
        client_audience={item}
        apis={apis}
        clients={clients}
        backTo={backTo}
      />
      <JSONStringify obj={item._raw} />
    </main>
  );
}
