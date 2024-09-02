'use client';
import './Form.css';
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from '@/components/ui/extension/multi-select';
import { useState } from 'react';

interface Props {
  name: string;
  label?: string;
  values?: string[];
  options: string[];
  errors?: string[];

  onValuesChange?(values: string[]): void;
}

// See https://shadcn-extension.vercel.app/docs/multi-select
export function FormFieldSelectMulti({
  name,
  label,
  values,
  options,
  errors,
  onValuesChange,
}: Props) {
  const [selected, setSelected] = useState<string[]>(values ?? []);

  function onChange(values: string[]) {
    setSelected(values);
    onValuesChange?.(values);
  }

  return (
    <div className="">
      <label htmlFor={name} className="my-4 block text-sm font-medium">
        {label ?? name}
      </label>
      <div className="my-4 space-y-4">
        <MultiSelector values={selected} onValuesChange={onChange}>
          <MultiSelectorTrigger>
            <MultiSelectorInput placeholder={label ?? name} />
          </MultiSelectorTrigger>
          <MultiSelectorContent>
            <MultiSelectorList>
              {options.map((value: string) => (
                <MultiSelectorItem key={value} value={value}>
                  {value}
                </MultiSelectorItem>
              ))}
            </MultiSelectorList>
          </MultiSelectorContent>
        </MultiSelector>
        {selected.map((value) => (
          <input type="hidden" name={name} value={value} key={value} />
        ))}
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
