import {
  client_audiences,
  ClientAudience,
} from '@/domain/openauth/clientAudience';
import { formConfigBuilder } from '@/components/form/FormConfig';
import { z } from 'zod';

export const config = formConfigBuilder({
  repository: client_audiences,
  RESOURCE_PATH_SEGMENT: 'client-audiences',
  RESOURCE_NAME: 'Client Audience',
  RESOURCE_NAME_PLURAL: 'Client Audiences',
});

export type Model = ClientAudience;

export function formDataToObject(formData: FormData): Partial<Model> {
  return {
    client_id: formData.get('client_id') as string,
    audience: formData.get('audience') as string,
    permissions: formData
      .getAll('permissions')
      .map((permission) => permission as string),
  };
}

export const FormSchema = z.object({
  client_id: z
    .string({
      invalid_type_error: 'Please provide a client_id.',
    })
    .min(1, 'Audience cannot be empty'),
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
