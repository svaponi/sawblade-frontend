import ProductChart from '@/components/ProductChart';
import { Button } from '@/components/ui/button';
import { auth } from '@/auth/auth';

export default async function Page() {
  const session = await auth();
  const isAdmin = session?.user?.role === 'admin';
  return isAdmin ? <Admin /> : <Nobody />;
}

function Nobody() {
  return (
    <div className="grid gap-8">
      <p>Not much to see here since we don’t have details on you yet.</p>
    </div>
  );
}

function Admin() {
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
