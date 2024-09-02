'use client';

import Link from 'next/link';
import { useFormState } from 'react-dom';
import { Button } from '@/components/ui/button';
import { create } from '../actions';
import { Api } from '@/domain/openauth/api';
import { Client } from '@/domain/openauth/client';
import { FormFieldSelect } from '@/components/form/FormFieldSelect';
import React, { useState } from 'react';
import { FormFieldSelectMulti } from '@/components/form/FormFieldSelectMulti';

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
          options={clientIds}
          errors={state.errors?.client_id}
        />
        <FormFieldSelect
          name="audience"
          label="Audience"
          options={audiences}
          errors={state.errors?.audience}
          onValueChange={(value) =>
            setSelectedApi(apis.find((api) => api.audience === value))
          }
        />
        <FormFieldSelectMulti
          name="permissions"
          label="Permissions"
          options={selectedApiPermissions}
          errors={state.errors?.permissions}
        />
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
