"use client";

import { getBoard } from "@/actions/get-board";
import { updateBoard } from "@/actions/update-board";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Board } from "@prisma/client";
import { useRouter } from "next/navigation";
import Pusher from "pusher-js";
import { ElementRef, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface BoardTitleFormProps {
	data: Board;
	orgId: string | null | undefined;
}

export const BoardTitleForm = ({ data, orgId }: BoardTitleFormProps) => {
	const router = useRouter();

	const [board, setBoard] = useState(data);

	const { execute: getOneBoard } = useAction(getBoard);

	useEffect(() => {
		const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
			cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
		});

		const channel = pusher.subscribe(`organization-${orgId}-channel`);

		channel.bind("board-deleted", async () => {
			router.push(`/organization/${orgId}`);
		});

		channel.bind("board-updated", async () => {
			const result = await getOneBoard({});
			if (result.data) {
				setBoard(result.data);
				setTitle(result.data.title);
			} else if (result.error) {
				toast.error("Failed to refresh boards");
			}
		});

		return () => {
			channel.unbind_all();
			channel.unsubscribe();
		};
	}, [orgId, getOneBoard, router]);

	const { execute } = useAction(updateBoard, {
		onSuccess: (data) => {
			toast.success(`Board ${data?.title} updated`);
			setTitle(data!.title);
			disabledEditing();
		},
		onError: (error) => {
			setTitle(data.title);
			toast.error(error);
			if (inputRef.current) {
				inputRef.current.value = data.title;
			}
			disabledEditing();
		},
	});

	const formRef = useRef<ElementRef<"form">>(null);
	const inputRef = useRef<ElementRef<"input">>(null);

	const [title, setTitle] = useState(board.title);
	const [isEditing, setIsEditing] = useState(false);

	const enableEditing = () => {
		setIsEditing(true);

		setTimeout(() => {
			inputRef.current?.focus();
			inputRef.current?.select();
		});
	};

	const disabledEditing = () => {
		setIsEditing(false);
	};

	const onSubmit = (formData: FormData) => {
		const title = formData.get("title") as string;

		if (title === board.title) {
			return disabledEditing();
		}

		execute({
			title: title,
			id: board.id,
		});
	};

	const onBlur = () => {
		formRef.current?.requestSubmit();
	};

	if (isEditing) {
		return (
			<form
				action={onSubmit}
				className="flex items-center gap-x-2"
				ref={formRef}
			>
				<FormInput
					ref={inputRef}
					id="title"
					onBlur={onBlur}
					defaultValue={title}
					className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
				/>
			</form>
		);
	}

	return (
		<Button
			onClick={enableEditing}
			variant="transparent"
			className="font-bold text-lg h-auto w-auto p-1 px-2"
		>
			{title}
		</Button>
	);
};
