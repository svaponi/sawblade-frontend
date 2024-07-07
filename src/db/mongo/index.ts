import clientPromise from '@/db/mongo/mongodb';

export async function getDb() {
  const client = await clientPromise;
  return client.db();
}
