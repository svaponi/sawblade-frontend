'use client';

import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import ScrollableList, { ScrollResult } from '@/app/components/ScrollableList';
import {
  getProducts,
  Product,
} from '@/app/(protected)/dashboard/products/actions';

interface Props {
  result: ScrollResult<Product>;
  query?: string;
}

export default function ProductList({ query, result }: Props) {

  async function scroller(next: string) {
    return await getProducts(query, next);
  }

  return (
    <ScrollableList
      initialResult={result}
      ItemComponent={ItemComponent}
      scroller={scroller}
    />
  );
}

function ItemComponent({ item }: { item: Product }) {
  return (
    <Card key={item.id}>
      <CardContent className="flex flex-col justify-between gap-4 py-4 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <Image
            alt="Image"
            className="rounded-md object-cover"
            height="64"
            src={item.url ?? '/placeholder.svg'}
            style={{
              aspectRatio: '64/64',
              objectFit: 'cover',
            }}
            width="64"
          />
          <div className="grid flex-1 gap-1">
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.description}</p>
            <p className="text-xs text-gray-400">
              ID: {item.id} / User: {item.user}
            </p>
          </div>
        </div>
        <Button size="sm">Track</Button>
      </CardContent>
    </Card>
  );
}
