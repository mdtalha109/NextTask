"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { DeleteList } from "./schema";
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

  const { id, boardId } = data;
  let list;

  try {
    list = await db.list.delete({
      where: {
        id,
        boardId,
        // board: {
        //   orgId,
        // },
      },
    });

    // await createAuditLog({
    //   entityTitle: list.title,
    //   entityId: list.id,
    //   entityType: ENTITY_TYPE.LIST,
    //   action: ACTION.DELETE,
    // })
  } catch (error) {
    return {
      error: "Failed to delete."
    }
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const deleteList = createSafeAction(DeleteList, handler);