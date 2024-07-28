"use server"

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";
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


    const { title, description, orgId } = data;
    let board;

    console.log("description: ", description)

    try {
        board = await db.board.create({
            data: {
                title,
                orgId,
                description
            }
        })
    } catch (error) {
        return {
            error: "Failed to create."
        }
    }

    revalidatePath(`/board/${board.id}`);
    return { data: board };
}

export const createBoard = createSafeAction(CreateBoard, handler)