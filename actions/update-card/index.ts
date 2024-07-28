"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { UpdateCard } from "./schema";
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

  const { id, boardId, ...values } = data;
  let card;

  try {
    card = await db.card.update({
      where: {
        id,
        list: {
          board: {
            
          },
        },
      },
      data: {
        ...values,
      },
    });

    // await createAuditLog({
    //   entityTitle: card.title,
    //   entityId: card.id,
    //   entityType: ENTITY_TYPE.CARD,
    //   action: ACTION.UPDATE,
    // })
  } catch (error) {
    return {
      error: "Failed to update."
    }
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const updateCard = createSafeAction(UpdateCard, handler);