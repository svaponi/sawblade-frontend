import ProductChart from '@/components/ProductChart';
import { Button } from '@/components/ui/button';

export default function Page() {
  const orders = [
    {
      id: 1,
      name: 'Crispy Chicken Burger',
      image: '/placeholder.svg',
      orderId: '#123456',
    },
    {
      id: 2,
      name: 'Iced Latte',
      image: '/placeholder.svg',
      orderId: '#654321',
    },
    {
      id: 3,
      name: 'Pepperoni Pizza',
      image: '/placeholder.svg',
      orderId: '#987654',
    },
  ];
  return (
    <div className="grid gap-8">
      <ProductChart />
      <div className="flex flex-col justify-center gap-2 min-[400px]:flex-row">
        <Button variant={'default'}>default</Button>
        <Button variant={'secondary'}>secondary</Button>
        <Button variant={'outline'}>outline</Button>
        <Button variant={'ghost'}>ghost</Button>
        <Button variant={'destructive'}>destructive</Button>
      </div>
    </div>
  );
}
