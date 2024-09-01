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
}

export function FormFieldSelect({ name, label, value, values, errors }: Props) {
  return (
    <div className="">
      <label htmlFor={name} className="my-4 block text-sm font-medium">
        {label ?? name}
      </label>
      <div className="my-4 space-y-4">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={label ?? name} defaultValue={value} />
          </SelectTrigger>
          <SelectContent>
            {values &&
              values.map((value: string) => (
                <SelectItem value={value}>{value}</SelectItem>
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
