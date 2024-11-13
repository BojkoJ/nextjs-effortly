"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteBoard } from "./schema";
import { redirect } from "next/navigation";
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
			error: "Only administrator of organization can delete board",
		};
	}

	const { id } = data;

	let board;

	try {
		board = await db.board.delete({
			where: {
				id: id,
				orgId: orgId,
			},
		});
	} catch (error) {
		return {
			error: "Failed to delete",
		};
	}

	await pusher.trigger(`organization-${orgId}-channel`, "board-deleted", {
		boardId: id,
	});

	revalidatePath(`/organization/${orgId}`);
	redirect(`/organization/${orgId}`);
};

export const deleteBoard = createSafeAction(DeleteBoard, handler);
