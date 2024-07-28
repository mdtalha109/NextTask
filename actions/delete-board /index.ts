"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { DeleteBoard } from "./schema";
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

  // const isPro = await checkSubscription();

  const { id, orgId } = data;
  let board;

  try {
    board = await db.board.delete({
      where: {
        id,
        // orgId,
      },
    });


  } catch (error) {
    return {
      error: "Failed to delete."
    }
  }

  revalidatePath(`/organization/${orgId}`);
  redirect(`/organization/${orgId}`);
};

export const deleteBoard = createSafeAction(DeleteBoard, handler);