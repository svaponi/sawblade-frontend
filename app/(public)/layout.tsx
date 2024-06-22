import Header from '@/app/(public)/header';
import React from 'react';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <main className="container mx-auto mt-6 flex max-w-7xl justify-center">
        {children}
      </main>
    </div>
  );
}
