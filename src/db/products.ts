import { Document, ObjectId, WithId } from 'mongodb';
import { getDb } from '@/db/mongo';
import { CrudDataRepository } from '@/db/common';

type Entity = WithId<Document>;
type Filters = { query?: string | null };

async function search(
  offset: number,
  limit: number,
  filters?: Filters | null,
): Promise<Entity[]> {
  const db = await getDb();
  const collection = db.collection('products');
  const filter = buildMongoFilter(filters);
  return await collection.find(filter).skip(offset).limit(limit).toArray();
}

async function count(filters?: Filters | null): Promise<number> {
  const db = await getDb();
  const collection = db.collection('products');
  const filter = buildMongoFilter(filters);
  return await collection.countDocuments(filter);
}

async function create(data: any): Promise<Entity> {
  const db = await getDb();
  const collection = db.collection('products');
  const result = await collection.insertOne(data);
  return { ...data, _id: result.insertedId };
}

async function updateById(
  id: string,
  data: any,
  upsert?: boolean,
): Promise<Entity | null> {
  const db = await getDb();
  const collection = db.collection('products');
  const filter = { _id: new ObjectId(id) };
  const result = await collection.updateOne(filter, { $set: data }, { upsert });
  return result.modifiedCount
    ? { ...data, _id: id }
    : result.upsertedCount
      ? { ...data, _id: result.upsertedId }
      : null;
}

async function deleteById(id: string): Promise<void> {
  const db = await getDb();
  const collection = db.collection('products');
  const filter = { _id: new ObjectId(id) };
  await collection.deleteOne(filter);
}

function buildMongoFilter(filters?: Filters | null) {
  const { query } = filters ?? {};
  const filter: any = {};
  if (query && query.length) {
    filter.title = { $regex: query, $options: 'i' };
  }
  return filter;
}

export const products: CrudDataRepository<Entity, Filters> = {
  search,
  count,
  create,
  updateById,
  deleteById,
};
