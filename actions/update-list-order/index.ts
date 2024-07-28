"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { UpdateListOrder } from "./schema";
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

  const { items, boardId } = data;
  let lists;

  try {
    const transaction = items.map((list) => 
      db.list.update({
        where: {
          id: list.id,
        //   board: {
        //     orgId,
        //   },
        },
        data: {
          order: list.order,
        },
      })
    );

    lists = await db.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to reorder."
    }
  }

  revalidatePath(`/board/${boardId}`);
  return { data: lists };
};

export const updateListOrder = createSafeAction(UpdateListOrder, handler);