import { verify } from 'jsonwebtoken';

export function getUserIdFromToken(token: string): string | null {
  try {
    const decoded = verify(token, process.env.JWT_SECRET!);
    return (decoded as { userId: string }).userId || null;
  } catch (error) {
    return null;
  }
}