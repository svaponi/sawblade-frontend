import React from 'react';
import { auth } from '@/auth/auth';

interface Props {}

export default async function Page(props: Props) {
  const session = await auth();
  const user = session?.user;
  return (
    <div className="grid gap-4 md:gap-8">
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
