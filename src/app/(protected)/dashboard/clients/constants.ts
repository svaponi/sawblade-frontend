import { Client, clients } from '@/domain/openauth/client';
import { formConfigBuilder } from '@/components/form/FormConfig';
import { z } from 'zod';

export const config = formConfigBuilder({
  repository: clients,
  RESOURCE_PATH_SEGMENT: 'clients',
  RESOURCE_NAME: 'Client',
  RESOURCE_NAME_PLURAL: 'Clients',
});

export type Model = Client;

export function formDataToObject(formData: FormData): Partial<Model> {
  return {
    client_id: formData.get('client_id') as string,
    client_secret: formData.get('client_secret') as string,
  };
}

export const FormSchema = z.object({
  client_id: z
    .string({
      invalid_type_error: 'Please provide a client_id.',
    })
    .min(1, 'Audience cannot be empty'),
  client_secret: z
    .string({
      invalid_type_error: 'Please provide a client_secret.',
    })
    .min(1, 'Audience cannot be empty'),
});
