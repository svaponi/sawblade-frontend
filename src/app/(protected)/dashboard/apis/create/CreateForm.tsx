'use client';

import Link from 'next/link';
import { useFormState } from 'react-dom';
import { Button } from '@/components/ui/button';
import { create } from '../actions';
import { FormField } from '@/components/form/FormField';
import { FormFieldArray } from '@/components/form/FormFieldArray';

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
          name="audience"
          label="Audience"
          errors={state.errors?.audience}
        />
        <FormFieldArray
          name="permissions"
          label="Permissions"
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
