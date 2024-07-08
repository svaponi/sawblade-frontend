const { MongoClient, ObjectId } = require('mongodb');

require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('Missing end var MONGODB_URI');
}

const client = new MongoClient(MONGODB_URI);

async function getProducts1() {
  const response = await fetch('https://dummyapi.online/api/products');
  console.log('response', response.url, response.status, response.statusText);
  const products = await response.json();
  console.assert(Array.isArray(products), 'products is not an array');
  console.log('getProducts1', products.length);
  return products.map(mapP);
}

async function getProducts2() {
  const response = await fetch('https://dummyjson.com/products?limit=999');
  console.log('response', response.url, response.status, response.statusText);
  const data = await response.json();
  const products = data.products;
  console.assert(Array.isArray(products), 'products is not an array');
  console.log('getProducts2', products.length);
  return products.map(mapP);
}

const startTime = new Date('2020-01-01').getTime();
const endTime = new Date().getTime();

function getRandomDate() {
  return new Date(startTime + Math.random() * (endTime - startTime));
}

function mapP(product) {
  if (product.thumbnailImage) {
    product.thumbnail = product.thumbnailImage.replace('?', '/png?');
    product.thumbnailImage = undefined;
  }
  if (product.basePrice) {
    product.price = product.basePrice;
    product.basePrice = undefined;
  }
  if (product.productCategory) {
    product.category = product.productCategory;
    product.productCategory = undefined;
  }
  if (product.name) {
    product.title = product.name;
    product.name = undefined;
  }
  product._createdAt = getRandomDate().toISOString();
  return product;
}

async function save(collection, product) {
  const result = await collection.insertOne(product);
  console.log(
    'insertOne',
    result.insertedId,
    JSON.stringify(product).slice(0, 100) + '...',
  );
}

function chunkArray(array, size) {
  if (!Array.isArray(array)) {
    throw new TypeError('Input must be an array');
  }
  if (typeof size !== 'number' || size <= 0) {
    throw new TypeError('Size must be a positive number');
  }
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

async function main() {
  console.log('connecting...');
  const connection = await client.connect();
  console.log('connected');

  const [products1, products2] = await Promise.all([
    getProducts1(),
    getProducts2(),
  ]);
  const products = [...products1, ...products2];
  console.log('total products', products.length);

  const collection = connection.db().collection('products');
  for (const chunk of chunkArray(products, 10)) {
    await Promise.all(chunk.map((product) => save(collection, product)));
  }
}

main()
  .catch((err) => {
    console.error(
      'An error occurred while attempting to seed the database:',
      err,
    );
  })
  .finally(() => {
    console.log('terminating...');
    return client.close();
  })
  .finally(() => {
    console.log('terminated');
  });
