"use client";
import { CSSProperties } from "react";
import { useCardModal } from "@/hooks/use-card-modal";
import { Draggable } from "@hello-pangea/dnd";
import type { Card } from "@/lib/generated/prisma/client";

interface CardItemProps {
	index: number;
	data: Card;
}

export const CardItem = ({ data, index }: CardItemProps) => {
	const cardModal = useCardModal();

	return (
		<Draggable draggableId={data.id} index={index}>
			{(provided) => {
				const { style, ...draggableProps } = provided.draggableProps;
				return (
					<div
						{...draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}
						style={style as CSSProperties}
						role="button"
						onClick={() => cardModal.onOpen(data.id)}
						className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm"
					>
						{data.title}
					</div>
				);
			}}
		</Draggable>
	);
};
