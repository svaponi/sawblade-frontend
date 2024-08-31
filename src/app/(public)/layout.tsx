import Header from '@/app/(public)/header';
import React from 'react';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="mx-auto my-6 flex max-w-7xl justify-center">
        {children}
      </main>
    </>
  );
}
