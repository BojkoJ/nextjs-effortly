import { z } from "zod";

export const CreateBoard = z.object({
	title: z
		.string({
			error: "Title is required",
		})
		.min(3, "Title is too short."),
	image: z.string({
		error: "Image is required",
	}),
});
