"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { GetBoards } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth();

	if (!userId || !orgId) {
		return {
			error: "Unauthorized",
		};
	}

	let boards;

	try {
		boards = await db.board.findMany({
			where: { orgId },
			orderBy: { createdAt: "desc" },
		});
	} catch (error) {
		return {
			error: "Failed to delete",
		};
	}

	revalidatePath(`/organization/${orgId}`);

	return { data: boards };
};
export const getBoards = createSafeAction(GetBoards, handler);
