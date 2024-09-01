import { Input } from '@/components/ui/input';

interface Props {
  name: string;
  label?: string;
  value?: string | number;
  errors?: string[];
}

export function FormField({ name, label, value, errors }: Props) {
  return (
    <div className="">
      <label htmlFor={name} className="mb-2 block text-sm font-medium">
        {label ?? name}
      </label>
      <div className="">
        <Input
          id={name}
          name={name}
          defaultValue={value}
          aria-describedby={name + '-error'}
          className={'bg-accent'}
        />
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
