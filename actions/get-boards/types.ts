import { z } from "zod";
import { GetBoards } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import type { Board } from "@/lib/generated/prisma/client";

export type InputType = z.infer<typeof GetBoards>;
export type ReturnType = ActionState<InputType, Board[]>;
