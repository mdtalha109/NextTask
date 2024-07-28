"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { DeleteCard } from "./schema";
import { InputType, ReturnType } from "./types";
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
  let card;

  try {
    card = await db.card.delete({
      where: {
        id,
        list: {
          board: {
            // orgId,
          },
        },
      },
    });

    // await createAuditLog({
    //   entityTitle: card.title,
    //   entityId: card.id,
    //   entityType: ENTITY_TYPE.CARD,
    //   action: ACTION.DELETE,
    // })
  } catch (error) {
    return {
      error: "Failed to delete."
    }
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const deleteCard = createSafeAction(DeleteCard, handler);