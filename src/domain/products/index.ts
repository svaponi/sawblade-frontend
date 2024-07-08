import { MongoEntity, repository } from '@/db/mongo';
import { CrudDataRepository } from '@/domain/common';

export interface Product {
  id: string;
  title: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  thumbnail?: string;
  _createdAt?: string;
  _updatedAt?: string;
  _raw?: any;
}

export interface ProductFilters {
  query?: string | null;
}

class ProductRepository implements CrudDataRepository<Product, ProductFilters> {
  async getById(id: string): Promise<Product | null> {
    const result = await repository.getById('products', id);
    return result ? this.toProduct(result) : null;
  }

  async search(
    offset: number,
    limit: number,
    filters?: ProductFilters | null,
  ): Promise<Product[]> {
    const filter = this.buildMongoFilter(filters);
    const result = await repository.search('products', offset, limit, filter, {
      title: 'asc',
    });
    return result.map(this.toProduct);
  }

  async count(filters?: ProductFilters | null): Promise<number> {
    const filter = this.buildMongoFilter(filters);
    return await repository.count('products', filter);
  }

  async create(data: any): Promise<Product> {
    const _createdAt = new Date().toISOString();
    const result = await repository.create('products', { ...data, _createdAt });
    return this.toProduct(result);
  }

  async updateById(
    id: string,
    data: any,
    upsert?: boolean,
  ): Promise<Product | null> {
    const _updatedAt = new Date().toISOString();
    const result = await repository.updateById(
      'products',
      id,
      { ...data, _updatedAt },
      upsert,
    );
    return result ? this.toProduct(result) : null;
  }

  async deleteById(id: string): Promise<void> {
    await repository.deleteById('products', id);
  }

  async distinctCategories(): Promise<string[]> {
    return await repository.distinct<string>('products', 'productCategory');
  }

  async distinctBrands(): Promise<string[]> {
    return await repository.distinct<string>('products', 'brands');
  }

  private buildMongoFilter(filters?: ProductFilters | null) {
    const { query } = filters ?? {};
    const filter: any = {};
    if (query && query.length) {
      filter.title = { $regex: query, $options: 'i' };
    }
    return filter;
  }

  private toProduct(entity: MongoEntity): Product {
    return {
      id: entity._id.toString(),
      title: entity.title,
      brand: entity.brand,
      category: entity.category,
      description: entity.description,
      price: entity.price,
      thumbnail: entity.thumbnail,
      _createdAt: entity._createdAt,
      _updatedAt: entity._updatedAt,
      _raw: { ...entity },
    };
  }
}

export const products = new ProductRepository();
