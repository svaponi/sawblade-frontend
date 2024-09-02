import { Api, apis } from '@/domain/openauth/api';
import { formConfigBuilder } from '@/components/form/FormConfig';
import { z } from 'zod';

export const config = formConfigBuilder({
  repository: apis,
  RESOURCE_PATH_SEGMENT: 'apis',
  RESOURCE_NAME: 'API',
  RESOURCE_NAME_PLURAL: 'APIs',
});

export type Model = Api;

export function formDataToObject(formData: FormData): Partial<Model> {
  return {
    audience: formData.get('audience') as string,
    permissions: formData
      .getAll('permissions')
      .map((permission) => permission as string),
  };
}

export const FormSchema = z.object({
  audience: z
    .string({
      invalid_type_error: 'Please provide an audience.',
    })
    .min(1, 'Audience cannot be empty')
    .url('Audience must be a valid URL'),
  permissions: z.array(
    z.string({
      invalid_type_error: 'Please provide a permission.',
    }),
  ),
});
