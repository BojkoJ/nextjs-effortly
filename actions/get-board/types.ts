import { z } from "zod";
import { GetBoard } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Board } from "@prisma/client";

export type InputType = z.infer<typeof GetBoard>;
export type ReturnType = ActionState<InputType, Board>;
