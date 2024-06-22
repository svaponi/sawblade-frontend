'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { UserMenuDropdown } from '@/app/components/UserMenuDropdown';
import { User } from 'next-auth';

interface Props {
  user: User;
}

export function UserMenu({ user }: Props) {
  return user ? (
    <Button className="rounded-full" size="icon" variant="ghost">
      <UserMenuDropdown>
        <Image
          alt="Avatar"
          className="rounded-full"
          height="32"
          src={user?.image ?? '/placeholder.svg'}
          style={{
            aspectRatio: '32/32',
            objectFit: 'cover',
          }}
          width="32"
        />
      </UserMenuDropdown>
      <span className="sr-only">View profile</span>
    </Button>
  ) : null;
}
