import { cookies } from 'next/headers';

export function getToken() {
  const cookieStore = cookies();
  return cookieStore.get("token")?.value || null;
}