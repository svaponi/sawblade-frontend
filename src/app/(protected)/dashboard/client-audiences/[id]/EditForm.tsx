'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { Button } from '@/components/ui/button';
import { update } from '../actions';
import { FormFieldSelect } from '@/components/form/FormFieldSelect';
import { ClientAudience } from '@/domain/openauth/clientAudience';
import { Api } from '@/domain/openauth/api';
import { Client } from '@/domain/openauth/client';

interface Props {
  client_audience: ClientAudience;
  clients: Client[];
  apis: Api[];
  backTo?: string;
}

export default function EditForm({
  client_audience,
  clients,
  apis,
  backTo,
}: Props) {
  const initialState = { message: null, errors: {} };
  const updateWithId = update.bind(null, client_audience.id);
  const [state, dispatch] = useFormState(updateWithId, initialState);

  const clientIds = clients.map((item) => item.client_id);
  const audiences = apis.map((item) => item.audience);

  const [selectedApi, setSelectedApi] = useState<Api | undefined>(
    apis.find((api) => api.audience === client_audience.audience),
  );
  const selectedApiPermissions = selectedApi?.permissions || [];

  return (
    <form action={dispatch}>
      <div className="flex flex-col gap-4">
        <FormFieldSelect
          name="client_id"
          label="Client ID"
          value={client_audience.client_id}
          values={clientIds}
          errors={state.errors?.client_id}
        />
        <FormFieldSelect
          name="audience"
          label="Audience"
          value={client_audience.audience}
          values={audiences}
          errors={state.errors?.audience}
          onValueChange={(value) =>
            setSelectedApi(apis.find((api) => api.audience === value))
          }
        />

        {selectedApiPermissions.map((permission) =>
          client_audience.permissions.includes(permission) ? (
            <p className="mt-2 text-sm" key={permission}>
              {permission}
            </p>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground" key={permission}>
              {permission}
            </p>
          ),
        )}

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
