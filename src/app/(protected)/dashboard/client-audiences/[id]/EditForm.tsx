'use client';

import React from 'react';
import Link from 'next/link';
import { FormField } from '@/components/form/FormField';
import { useFormState } from 'react-dom';
import { Button } from '@/components/ui/button';
import { update } from '../actions';
import { Client } from '@/domain/openauth/client';

interface Props {
  client: Client;
  backTo?: string;
}

export default function EditForm({ client, backTo }: Props) {
  const initialState = { message: null, errors: {} };
  const updateWithId = update.bind(null, client.id);
  const [state, dispatch] = useFormState(updateWithId, initialState);

  return (
    <form action={dispatch}>
      <div className="flex flex-col gap-4">
        <FormField
          name="client_id"
          label="Client ID"
          value={client.client_id}
          errors={state.errors?.client_id}
        />
        <FormField
          name="client_id"
          label="Client Secret"
          value={client.client_secret}
          errors={state.errors?.client_secret}
        />

        {clientAudiences.map((clientAudience) => (
          <p className="mt-2 text-sm" key={clientAudience.id}>
            {clientAudience.audience}
            {clientAudience.permissions.map((permission) => (
              <p className="mt-2 text-sm" key={permission}>
                {permission}
              </p>
            ))}
          </p>
        ))}

        {apis.map((api) => (
          <p className="mt-2 text-sm" key={api.id}>
            {api.id}
          </p>
        ))}

        <div className="flex gap-4">
          <Button type="submit">Save</Button>
          {backTo ? (
            <Link href={backTo}>
              <Button variant={'secondary'}>Cancel</Button>
            </Link>
          ) : null}
        </div>
      </div>
    </form>
  );
}
