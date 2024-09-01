import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import React from 'react';
import EditForm from './EditForm';
import JSONStringify from '@/components/form/JSONStringify';
import { EDIT_PAGE_TITLE, LIST_PAGE_PATH, LIST_PAGE_TITLE } from '../constants';
import { getApis, getById, getClientAudienceByClientId } from '../actions';

export const metadata: Metadata = {
  title: EDIT_PAGE_TITLE,
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
  const [item, apis] = await Promise.all([getById(id), getApis()]);

  if (!item) {
    notFound();
  }

  const clientAudiences = await getClientAudienceByClientId(item.client_id);

  const backTo = fromPage
    ? `${LIST_PAGE_PATH}?page=${fromPage}`
    : LIST_PAGE_PATH;

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: LIST_PAGE_TITLE,
            href: backTo,
          },
          {
            label: EDIT_PAGE_TITLE,
            active: true,
          },
        ]}
      />
      <EditForm client={item} backTo={backTo} />
      <JSONStringify obj={item._raw} />
    </main>
  );
}
