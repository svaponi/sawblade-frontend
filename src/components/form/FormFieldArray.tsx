'use client';
import { Input } from '@/components/ui/input';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import './Form.css';

interface Props {
  name: string;
  label?: string;
  values?: string[];
  errors?: string[];
}

export function FormFieldArray({
  name,
  label,
  values: valuesFromProps,
  errors,
}: Props) {
  const [values, setValues] = useState<string[]>([]);

  useEffect(() => setValues(valuesFromProps ?? []), [valuesFromProps]);

  const addPermissionField = () => {
    setValues([...values, '']);
  };

  const removePermissionField = (index: number, e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const updatedPermissions = values.filter((_, i) => i !== index);
    console.log('removePermissionField', index, updatedPermissions);
    setValues(updatedPermissions);
  };

  const handlePermissionChange = (index: number, value: string) => {
    const updatedPermissions = values.map((permission, i) =>
      i === index ? value : permission,
    );
    setValues(updatedPermissions);
  };

  return (
    <div className="">
      <label htmlFor={name} className="my-4 block text-sm font-medium">
        {label ?? name}
      </label>
      <div className="my-4 space-y-4">
        {values.map((value, index) => (
          <div key={name + '-' + index} className="flex items-center space-x-2">
            <Input
              id={name + '-' + index}
              name={name}
              value={value}
              onChange={(e) => handlePermissionChange(index, e.target.value)}
              aria-describedby={name + '-' + index + '-error'}
              className={'bg-accent'}
            />
            <Button
              variant={'destructive'}
              onClick={(e) => removePermissionField(index, e)}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          variant={'outline'}
          onClick={() => addPermissionField()}
          disabled={values.some((p) => p === '')}
        >
          Add New
        </Button>
      </div>
      <div id={name + '-error'} aria-live="polite" aria-atomic="true">
        {errors &&
          errors.map((error: string) => (
            <p className="mt-2 text-sm text-destructive" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>
  );
}
