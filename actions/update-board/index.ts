"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { UpdateBoard } from "./schema";
import { InputType, ReturnType } from "./type";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const handler = async (data: InputType): Promise<ReturnType> => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
      return {
          error: "Unauthorized",
      };
  }

  let userId: string | undefined;
  try {
      const decoded = jwt.verify(token.value, process.env.JWT_SECRET!) as { userId: string };
      userId = decoded.userId;
  } catch (error) {
      return {
          error: "Unauthorized",
      };
  }

  const { title, id } = data;
  let board;

  try {
    board = await db.board.update({
      where: {
        id,
        
      },
      data: {
        title,
      },
    });

    // await createAuditLog({
    //   entityTitle: board.title,
    //   entityId: board.id,
    //   entityType: ENTITY_TYPE.BOARD,
    //   action: ACTION.UPDATE,
    // })
  } catch (error) {
    return {
      error: "Failed to update."
    }
  }

  revalidatePath(`/board/${id}`);
  return { data: board };
};

export const updateBoard = createSafeAction(UpdateBoard, handler);