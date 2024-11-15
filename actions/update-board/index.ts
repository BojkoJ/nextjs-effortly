"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateBoard } from "./schema";
import pusher from "@/lib/pusher";

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId, orgRole } = auth();

	if (!userId || !orgId) {
		return {
			error: "Unauthorized",
		};
	}

	if (orgRole !== "org:admin") {
		return {
			error: "Only administrator of organization can update board.",
		};
	}

	const { title, id } = data;

	let board;

	try {
		board = await db.board.update({
			where: {
				id: id,
				orgId: orgId,
			},
			data: {
				title: title,
			},
		});
	} catch (error) {
		return {
			error: "Failed to update",
		};
	}

	await pusher.trigger(`organization-${orgId}-channel`, "board-updated", {
		boardId: id,
	});

	revalidatePath(`/board/${id}`);

	return { data: board };
};

export const updateBoard = createSafeAction(UpdateBoard, handler);
