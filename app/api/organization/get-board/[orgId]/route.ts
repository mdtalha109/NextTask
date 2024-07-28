import { db } from "@/lib/db";
import { NextResponse } from "next/server";



export async function GET(
  req: Request,
  { params }: { params: { orgId: string } }
) {
  try {
   
    const boards = await db.board.findMany({
        where: {
          orgId: params.orgId
        }
      });

    return NextResponse.json(boards);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}