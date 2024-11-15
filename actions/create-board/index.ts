"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";
import pusher from "@/lib/pusher";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId, orgRole } = auth();

	if (!userId || !orgId) {
		return {
			error: "Unathorized",
		};
	}

	if (orgRole !== "org:admin") {
		return {
			error: "Only administrator of organization can create boards.",
		};
	}

	const { title, image } = data;

	const [imageId, imageThumbUrl, imageFullUrl, imageLinkHtml, imageUserName] =
		image.split("|");

	if (
		!imageId ||
		!imageThumbUrl ||
		!imageFullUrl ||
		!imageLinkHtml ||
		!imageUserName
	) {
		return {
			error: "Missing fields. Failed to create board",
		};
	}

	let board;

	try {
		board = await db.board.create({
			data: {
				title: title,
				orgId: orgId,
				imageId: imageId,
				imageThumbUrl: imageThumbUrl,
				imageFullUrl: imageFullUrl,
				imageUserName: imageUserName,
				imageLinkHTML: imageLinkHtml,
			},
		});

		await createAuditLog({
			entityTitle: board.title,
			entityId: board.id,
			entityType: ENTITY_TYPE.BOARD,
			action: ACTION.CREATE,
		});
	} catch (error) {
		return {
			error: "Failed to create.",
		};
	}

	await pusher.trigger(`organization-${orgId}-channel`, "board-created", {
		boardId: board.id,
	});

	revalidatePath(`/board/${board.id}`);

	return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);
