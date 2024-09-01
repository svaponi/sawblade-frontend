'use client';

import React from 'react';
import Link from 'next/link';
import { FormField } from '@/components/form/FormField';
import { useFormState } from 'react-dom';
import { FormFieldArray } from '@/components/form/FormFieldArray';
import { Button } from '@/components/ui/button';
import { update } from '../actions';
import { Api } from '@/domain/openauth/api';

interface Props {
  api: Api;
  backTo?: string;
}
export default function EditForm({ api, backTo }: Props) {
  const initialState = { message: null, errors: {} };
  const updateWithId = update.bind(null, api.id);
  const [state, dispatch] = useFormState(updateWithId, initialState);

  return (
    <form action={dispatch}>
      <div className="flex flex-col gap-4">
        <FormField
          name="audience"
          label="Audience"
          value={api.audience}
          errors={state.errors?.audience}
        />
        <FormFieldArray
          name="permissions"
          label="Permissions"
          values={api.permissions}
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
