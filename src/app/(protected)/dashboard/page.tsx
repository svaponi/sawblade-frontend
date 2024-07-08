import ProductChart from '@/components/ProductChart';

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
    <div className="grid gap-4 md:gap-8">
      <ProductChart />
    </div>
  );
}
