import { CrudDataRepository } from '@/domain/common';

export interface FormConfigInput<T, F = any> {
  repository: CrudDataRepository<T, F>;
  PAGE_SIZE?: number;
  RESOURCE_PATH_SEGMENT: string;
  RESOURCE_NAME: string;
  RESOURCE_NAME_PLURAL: string;
  CREATE_PAGE_TITLE?: string;
  EDIT_PAGE_TITLE?: string;
  LIST_PAGE_TITLE?: string;
  LIST_PAGE_PATH?: string;
}

export function formConfigBuilder<T, F = any>(
  input: FormConfigInput<T, F>,
): FormConfig<T, F> {
  return {
    repository: input.repository,
    PAGE_SIZE: input.PAGE_SIZE ?? 5,
    RESOURCE_PATH_SEGMENT: input.RESOURCE_PATH_SEGMENT,
    RESOURCE_NAME: input.RESOURCE_NAME,
    RESOURCE_NAME_PLURAL: input.RESOURCE_NAME_PLURAL,
    CREATE_PAGE_TITLE:
      input.CREATE_PAGE_TITLE ?? `Create ${input.RESOURCE_NAME}`,
    EDIT_PAGE_TITLE: input.EDIT_PAGE_TITLE ?? `Edit ${input.RESOURCE_NAME}`,
    LIST_PAGE_TITLE: input.LIST_PAGE_TITLE ?? `${input.RESOURCE_NAME_PLURAL}`,
    LIST_PAGE_PATH:
      input.LIST_PAGE_PATH ?? `/dashboard/${input.RESOURCE_PATH_SEGMENT}`,
  };
}

export interface FormConfig<T, F = any> {
  repository: CrudDataRepository<T, F>;
  PAGE_SIZE: number;
  RESOURCE_PATH_SEGMENT: string;
  RESOURCE_NAME: string;
  RESOURCE_NAME_PLURAL: string;
  CREATE_PAGE_TITLE: string;
  EDIT_PAGE_TITLE: string;
  LIST_PAGE_TITLE: string;
  LIST_PAGE_PATH: string;
}
