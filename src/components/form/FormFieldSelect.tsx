'use client';
import './Form.css';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

interface Props {
  name: string;
  label?: string;
  value?: string;
  options: string[];
  errors?: string[];
  onValueChange?(value: string): void;
}

export function FormFieldSelect({
  name,
  label,
  value,
  options,
  errors,
  onValueChange,
}: Props) {
  const [selected, setSelected] = useState(value);
  function onChange(value: string) {
    setSelected(value);
    onValueChange?.(value);
  }
  return (
    <div className="">
      <label htmlFor={name} className="my-4 block text-sm font-medium">
        {label ?? name}
      </label>
      <div className="my-4 space-y-4">
        <Select name={name} value={selected} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder={label ?? name} />
          </SelectTrigger>
          <SelectContent>
            {options.map((value: string) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
