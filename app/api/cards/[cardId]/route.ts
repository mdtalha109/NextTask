
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"

export async function GET(
  req: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    let userId: string | undefined;
    try {
      const decoded = jwt.verify(token.value, process.env.JWT_SECRET!) as { userId: string };
      userId = decoded.userId;
    } catch (error) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const card = await db.card.findUnique({
      where: {
        id: params.cardId,
        list: {
          board: {
            // orgId,
          },
        },
      },
      include: {
        list: {
          select: {
            title: true,
          },
        },
      },
    });

    return NextResponse.json(card);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}