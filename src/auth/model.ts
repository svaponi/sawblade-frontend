const roles = ['admin', 'user'];

export type UserRole = (typeof roles)[number];

export function toUserRole(role?: string | null): UserRole | null {
  return role && roles.includes(role) ? (role as UserRole) : null;
}
