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
      <main className="container mx-auto mt-6 flex min-h-full max-w-7xl justify-center">
        {children}
      </main>
    </>
  );
}
