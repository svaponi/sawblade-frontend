'use server';
import { AppUser, countUsers, findUsers } from '@/db/users';
import { PageResult } from '@/app/components/PageList';

const PAGE_SIZE = 6;

export async function getUsers(
  query?: string,
  page?: number,
): Promise<PageResult<AppUser>> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log('getUsers', query, page);
  const offset = PAGE_SIZE * Math.max(0, (page ?? 1) - 1);
  const res = await findUsers(query, offset, PAGE_SIZE, true);
  const totalPages = res.total
    ? Math.ceil(res.total / PAGE_SIZE)
    : res.data.length
      ? 1
      : 0;
  return { data: res.data, totalPages };
}

export async function getUsersCount(): Promise<number> {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return await countUsers();
}
