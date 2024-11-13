import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { BoardListClient } from "./board-list-client";
import { Skeleton } from "@/components/ui/skeleton";

export const BoardListContainer = async () => {
	const { orgId } = auth();

	if (!orgId) {
		return redirect("/select-org");
	}

	const boards = await db.board.findMany({
		where: { orgId },
		orderBy: { createdAt: "desc" },
	});

	return <BoardListClient initialBoards={boards} orgId={orgId} />;
};

BoardListContainer.Skeleton = function SkeletonBoardList() {
	return (
		<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
			<Skeleton className='aspect-video h-full w-full p-2' />
			<Skeleton className='aspect-video h-full w-full p-2' />
			<Skeleton className='aspect-video h-full w-full p-2' />
			<Skeleton className='aspect-video h-full w-full p-2' />
			<Skeleton className='aspect-video h-full w-full p-2' />
			<Skeleton className='aspect-video h-full w-full p-2' />
			<Skeleton className='aspect-video h-full w-full p-2' />
			<Skeleton className='aspect-video h-full w-full p-2' />
		</div>
	);
};
