export interface DataRepository<T, F = any> {
  search(offset: number, limit: number, filters?: F | null): Promise<T[]>;

  count(filters?: F | null): Promise<number>;
}

export interface CrudDataRepository<T, F = any>
  extends DataRepository<T, F> {
  create(data: any): Promise<T>;

  updateById(id: string, data: any, upsert?: boolean): Promise<T | null>;

  deleteById(id: string): Promise<void>;
}
