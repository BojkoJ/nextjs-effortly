"use client";

import { FormButton } from "./form-button";
import { UseAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board/index";
import { FormInput } from "@/components/form/form-input";

export const Form = () => {
	const { execute, fieldErrors } = UseAction(createBoard, {
		onSuccess: (data) => {
			console.log(data, "SUCCESS");
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const onSubmit = (formData: FormData) => {
		const title = formData.get("title") as string;

		console.log({ title });

		execute({ title });
	};

	return (
		<form action={onSubmit}>
			<div className="flex flex-col space-y-2">
				<FormInput
					id="title"
					errors={fieldErrors}
					label="Board Title"
				/>
			</div>
			<FormButton />
		</form>
	);
};
