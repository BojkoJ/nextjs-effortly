import { Separator } from "@/components/ui/separator";
import { Info } from "./_components/info";
import { Suspense } from "react";
import { BoardListContainer } from "./_components/board-list-container";

const OrganizationIdPage = async () => {
	return (
		<div className='w-full mb-20'>
			<Info />
			<Separator className='my-4' />
			<div className='px-2 md:px-4'>
				<Suspense fallback={<BoardListContainer.Skeleton />}>
					<BoardListContainer />
				</Suspense>
			</div>
		</div>
	);
};

export default OrganizationIdPage;
