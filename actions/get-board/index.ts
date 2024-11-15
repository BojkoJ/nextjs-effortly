"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { GetBoard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth();

	if (!userId || !orgId) {
		return {
			error: "Unauthorized",
		};
	}

	let board;

	try {
		board = await db.board.findFirst({
			where: { orgId },
		});
	} catch (error) {
		return {
			error: "Failed to delete",
		};
	}

	revalidatePath(`/organization/${orgId}`);

	return { data: board ?? undefined };
};
export const getBoard = createSafeAction(GetBoard, handler);
