import { MongoDataRepository, MongoEntity } from '@/db/mongo';
import { CrudDataRepository } from '@/domain/common';

export const repository = new MongoDataRepository('openauth');

export interface _Base {
  id: string;
  _created_at?: string;
  _last_modified_at?: string;
  _raw?: any;
}

export class BaseRepository<T extends _Base, F = any>
  implements CrudDataRepository<T, F>
{
  constructor(
    private collName: string,
    private mapper: (entity: MongoEntity) => T,
    private searchFilterBuilder: (filters: F) => any,
  ) {}

  async getById(id: string): Promise<T | null> {
    const result = await repository.getById(this.collName, id);
    return result ? this.mapper(result) : null;
  }

  async getFirst(filters?: F | null): Promise<T | null> {
    const filter = this.buildMongoFilter(filters);
    const result = await repository.findOne(this.collName, filter);
    return result ? this.mapper(result) : null;
  }

  async search(
    offset: number,
    limit: number,
    filters?: F | null,
  ): Promise<T[]> {
    const filter = this.buildMongoFilter(filters);
    const result = await repository.search(
      this.collName,
      offset,
      limit,
      filter,
      {
        _created_at: -1,
      },
    );
    return result.map(this.mapper);
  }

  async count(filters?: F | null): Promise<number> {
    const filter = this.buildMongoFilter(filters);
    return await repository.count(this.collName, filter);
  }

  async create(data: any): Promise<T> {
    const _createdAt = new Date().toISOString();
    const result = await repository.create(this.collName, {
      ...data,
      _createdAt,
    });
    return this.mapper(result);
  }

  async updateById(id: string, data: any, upsert?: boolean): Promise<T | null> {
    const _updatedAt = new Date().toISOString();
    const result = await repository.updateById(
      this.collName,
      id,
      { ...data, _updatedAt },
      upsert,
    );
    return result ? this.mapper(result) : null;
  }

  async deleteById(id: string): Promise<void> {
    await repository.deleteById(this.collName, id);
  }

  private buildMongoFilter(filters?: F | null) {
    if (filters) {
      return this.searchFilterBuilder(filters);
    } else {
      return {};
    }
  }
}
