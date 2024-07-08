import clientPromise from '@/db/mongo/mongodb';
import { Document, Filter, ObjectId, Sort, WithId } from 'mongodb';

export async function getDb() {
  const client = await clientPromise;
  return client.db();
}

export type MongoEntity = WithId<Document>;

export class MongoDataRepository {
  async getById(
    collectionName: string,
    id: string,
  ): Promise<MongoEntity | null> {
    const db = await getDb();
    const collection = db.collection(collectionName);
    const filter = { _id: new ObjectId(id) };
    return await collection.findOne(filter);
  }

  async search(
    collectionName: string,
    offset: number,
    limit: number,
    filter?: Filter<MongoEntity> | null,
    sort?: Sort,
  ): Promise<MongoEntity[]> {
    const db = await getDb();
    const collection = db.collection(collectionName);
    console.log('search', filter, offset, limit);
    return await collection
      .find(filter ?? {})
      .skip(offset)
      .limit(limit)
      .sort(sort ?? { _id: 1 })
      .toArray();
  }

  async count(
    collectionName: string,
    filter?: Filter<MongoEntity> | null,
  ): Promise<number> {
    const db = await getDb();
    const collection = db.collection(collectionName);
    return await collection.countDocuments(filter ?? {});
  }

  async distinct<T = string>(
    collectionName: string,
    fieldName: string,
  ): Promise<T[]> {
    const db = await getDb();
    const collection = db.collection(collectionName);
    return await collection.distinct(fieldName);
  }

  async aggregate(
    collectionName: string,
    fieldName: string,
  ): Promise<MongoEntity[]> {
    const db = await getDb();
    const collection = db.collection(collectionName);
    const pipeline = [
      {
        $group: {
          _id: { $toLower: `$${fieldName}` },
          count: { $sum: 1 },
        },
      },
    ];
    const result = await collection
      .aggregate(pipeline)
      .sort({ _id: 1 })
      .toArray();
    console.log('aggregate', result);
    return result.map((r) => ({ _id: r._id, count: r.count }));
  }

  async create(collectionName: string, data: any): Promise<MongoEntity> {
    const db = await getDb();
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(data);
    return { ...data, _id: result.insertedId };
  }

  async updateById(
    collectionName: string,
    id: string,
    data: any,
    upsert?: boolean,
  ): Promise<MongoEntity | null> {
    const db = await getDb();
    const collection = db.collection(collectionName);
    const filter = { _id: new ObjectId(id) };
    const result = await collection.updateOne(
      filter,
      { $set: data },
      { upsert },
    );
    return result.modifiedCount
      ? { ...data, _id: id }
      : result.upsertedCount
        ? { ...data, _id: result.upsertedId }
        : null;
  }

  async deleteById(collectionName: string, id: string): Promise<void> {
    const db = await getDb();
    const collection = db.collection(collectionName);
    const filter = { _id: new ObjectId(id) };
    await collection.deleteOne(filter);
  }
}

export const repository = new MongoDataRepository();
