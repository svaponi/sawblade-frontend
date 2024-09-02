'use client';
import './Form.css';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Props {
  name: string;
  label?: string;
  value?: string;
  values?: string[];
  errors?: string[];
  onValueChange?(value: string): void;
}

export function FormFieldSelect({
  name,
  label,
  value,
  values,
  errors,
  onValueChange,
}: Props) {
  return (
    <div className="">
      <label htmlFor={name} className="my-4 block text-sm font-medium">
        {label ?? name}
      </label>
      <div className="my-4 space-y-4">
        <Select name={name} value={value} onValueChange={onValueChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={label ?? name} />
          </SelectTrigger>
          {values && (
            <SelectContent position="popper">
              {values.map((value: string) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          )}
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
