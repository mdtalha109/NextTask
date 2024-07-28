"use server";

import { revalidatePath } from "next/cache";


import { db } from "@/lib/db";

import { createSafeAction } from "@/lib/create-safe-action";

import { CreateCard } from "./schema";
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

  const { title, description, boardId, listId } = data;
  let card;

  try {
    const list = await db.list.findUnique({
      where: {
        id: listId,

      },
    });

    if (!list) {
      return {
        error: "List not found",
      };
    }

    const lastCard = await db.card.findFirst({
      where: { listId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastCard ? lastCard.order + 1 : 1;

    card = await db.card.create({
      data: {
        title,
        listId,
        description,
        order: newOrder,
      },
    });


  } catch (error) {
    return {
      error: "Failed to create."
    }
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const createCard = createSafeAction(CreateCard, handler);