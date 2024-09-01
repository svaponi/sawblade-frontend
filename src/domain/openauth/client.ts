import { MongoEntity } from '@/db/mongo';
import { _Base, BaseRepository } from '@/domain/openauth';

export interface ClientFilters {
  query?: string | null;
}

export interface Client extends _Base {
  client_id: string;
  client_secret: string;
}

function _toModel(entity: MongoEntity): Client {
  return {
    id: entity._id.toString(),
    client_id: entity.client_id,
    client_secret: entity.client_secret,
    _created_at: entity._created_at,
    _last_modified_at: entity._last_modified_at,
    _raw: { ...entity },
  };
}

function _toMongoSearchFilter(filters: ClientFilters): any {
  const { query } = filters;
  return query ? { client_id: { $regex: query, $options: 'i' } } : {};
}

class ClientRepository extends BaseRepository<Client, ClientFilters> {
  constructor() {
    super('clients', _toModel, _toMongoSearchFilter);
  }
}

export const clients = new ClientRepository();
