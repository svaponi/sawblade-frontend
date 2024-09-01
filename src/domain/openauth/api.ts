import { MongoEntity } from '@/db/mongo';
import { _Base, BaseRepository } from '@/domain/openauth/index';

export interface ApiFilters {
  query?: string | null;
}

export interface Api extends _Base {
  audience: string;
  permissions: string[];
}

function _toModel(entity: MongoEntity): Api {
  return {
    id: entity._id.toString(),
    audience: entity.audience,
    permissions: entity.permissions,
    _created_at: entity._created_at,
    _last_modified_at: entity._last_modified_at,
    _raw: { ...entity },
  };
}

function _toMongoSearchFilter(filters: ApiFilters): any {
  const { query } = filters;
  return query ? { audience: { $regex: query, $options: 'i' } } : {};
}

class ApiRepository extends BaseRepository<Api, ApiFilters> {
  constructor() {
    super('apis', _toModel, _toMongoSearchFilter);
  }
}

export const apis = new ApiRepository();
