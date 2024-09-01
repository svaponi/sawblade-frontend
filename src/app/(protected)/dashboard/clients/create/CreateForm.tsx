'use client';

import Link from 'next/link';
import { useFormState } from 'react-dom';
import { Button } from '@/components/ui/button';
import { create } from '../actions';
import { FormField } from '@/components/form/FormField';

interface Props {
  backTo?: string;
}

export default function CreateForm({ backTo }: Props) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(create, initialState);

  return (
    <form action={dispatch}>
      <div className="flex flex-col gap-4">
        <FormField
          name="client_id"
          label="Client ID"
          errors={state.errors?.client_id}
        />
        <FormField
          name="client_secret"
          label="Client Secret"
          errors={state.errors?.client_secret}
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
