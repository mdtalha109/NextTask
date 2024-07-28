import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getUserIdFromToken } from '@/lib/get-user-id-from-token';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { title } = await req.json();
  const userId = getUserIdFromToken(token);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const organization = await db.organization.create({
      data: {
        title,
        ownerId: userId,
      },
    });

    await db.user.update({
      where: { id: userId },
      data: { hasCreatedOrg: true },
    });

    return NextResponse.json({ id: organization.id });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create organization'}, { status: 500 });
  }
}
