import { MongoEntity } from '@/db/mongo';
import { _Base, BaseRepository } from '@/domain/openauth';

export interface ClientAudienceFilters {
  query?: string | null;
  client_id?: string | null;
  audience?: string | null;
}

export interface ClientAudience extends _Base {
  client_id: string;
  audience: string;
  expires_in: number;
  permissions: string[];
}

function _toModel(entity: MongoEntity): ClientAudience {
  return {
    id: entity._id.toString(),
    client_id: entity.client_id,
    audience: entity.audience,
    expires_in: entity.expires_in,
    permissions: entity.permissions,
    _created_at: entity._created_at,
    _last_modified_at: entity._last_modified_at,
    _raw: { ...entity },
  };
}

function _toMongoSearchFilter(filters: ClientAudienceFilters): any {
  const { query } = filters;
  return query
    ? {
        client_id: { $regex: query, $options: 'i' },
        audience: { $regex: query, $options: 'i' },
      }
    : {};
}

class ClientAudienceRepository extends BaseRepository<
  ClientAudience,
  ClientAudienceFilters
> {
  constructor() {
    super('client_audiences', _toModel, _toMongoSearchFilter);
  }
}

export const client_audiences = new ClientAudienceRepository();
