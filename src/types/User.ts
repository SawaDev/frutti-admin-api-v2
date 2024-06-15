import { createUserSchema } from "app/schemas/userSchema";
import { z } from "zod";

export type CreateUserType = z.infer<typeof createUserSchema> 