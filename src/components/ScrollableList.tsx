import { ComponentType, useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { WithId } from '@/db';

export interface ScrollResult<T> {
  data: T[];
  total?: number;
  next?: string;
}

interface Props<T> {
  initialResult: ScrollResult<T>;
  ItemComponent: ComponentType<{ item: T }>;
  scroller: (next: string) => Promise<ScrollResult<T>>;
}

export default function ScrollableList<T extends WithId>({
  initialResult,
  ItemComponent,
  scroller,
}: Props<T>) {
  const [result, setResult] = useState<ScrollResult<T>>(initialResult);
  const [data, setData] = useState<T[]>(initialResult.data);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView();

  const loadMore = useCallback(async () => {
    const next = result.next;
    if (next) {
      const res = await scroller(next);
      setResult(res);
      setData((prev) => [...prev, ...res.data]);
    }
  }, [scroller, result]);

  useEffect(() => {
    if (inView && !loading) {
      setLoading(true);
      loadMore().finally(() => setLoading(false));
    }
  }, [inView, loadMore, loading]);

  const keepScrolling =
    result.next && result.total && result.total > data.length;

  return (
    <>
      {data.map((item) => (
        <ItemComponent key={item.id} item={item} />
      ))}
      {keepScrolling ? <div ref={ref}>Loading...</div> : null}
    </>
  );
}
