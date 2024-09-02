'use client';

import Link from 'next/link';
import { useFormState } from 'react-dom';
import { Button } from '@/components/ui/button';
import { create } from '../actions';
import { Api } from '@/domain/openauth/api';
import { Client } from '@/domain/openauth/client';
import { FormFieldSelect } from '@/components/form/FormFieldSelect';
import React, { useState } from 'react';

interface Props {
  clients: Client[];
  apis: Api[];
  backTo?: string;
}

export default function CreateForm({ clients, apis, backTo }: Props) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(create, initialState);

  const clientIds = clients.map((item) => item.client_id);
  const audiences = apis.map((item) => item.audience);

  const [selectedApi, setSelectedApi] = useState<Api>();
  const selectedApiPermissions = selectedApi?.permissions || [];

  return (
    <form action={dispatch}>
      <div className="flex flex-col gap-4">
        <FormFieldSelect
          name="client_id"
          label="Client ID"
          values={clientIds}
          errors={state.errors?.client_id}
        />
        <FormFieldSelect
          name="audience"
          label="Audience"
          values={audiences}
          errors={state.errors?.audience}
          onValueChange={(value) =>
            setSelectedApi(apis.find((api) => api.audience === value))
          }
        />

        {selectedApiPermissions.map((permission) => (
          <p className="mt-2 text-sm" key={permission}>
            {permission}
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
