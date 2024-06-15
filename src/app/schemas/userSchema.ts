import { z } from "zod";

export const createUserSchema = z.object({
  user_name: z.string({ required_error: "Username majburiy!" }).min(6, "Username 6 yoki undan ko'p xarfdan iborat bo'lishi kerak!"),
  password: z.string({ required_error: "Password majburiy!" }).min(6, "Password 6 yoki undan ko'p xarfdan iborat bo'lishi kerak!"),
  permissions: z.array(z.string()),
});