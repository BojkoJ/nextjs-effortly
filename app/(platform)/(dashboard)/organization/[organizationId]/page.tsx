import { Separator } from "@/components/ui/separator";
import { Info } from "./_components/info";
import { Suspense } from "react";
import { BoardListContainer } from "./_components/board-list-container";
import { auth } from "@clerk/nextjs/server";

const OrganizationIdPage = async () => {
	const { orgRole } = auth();

	return (
		<div className="w-full mb-20">
			<Info role={orgRole} />
			<Separator className="my-4" />
			<div className="px-2 md:px-4">
				<Suspense fallback={<BoardListContainer.Skeleton />}>
					<BoardListContainer />
				</Suspense>
			</div>
		</div>
	);
};

export default OrganizationIdPage;
