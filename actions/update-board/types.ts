import { z } from "zod";
import { UpdateBoard } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import type { Board } from "@/lib/generated/prisma/client";

export type InputType = z.infer<typeof UpdateBoard>;
export type ReturnType = ActionState<InputType, Board>;
