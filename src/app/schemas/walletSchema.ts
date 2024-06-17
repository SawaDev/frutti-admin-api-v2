import { z } from "zod";

export const createWalletSchema = z.object({
  name: z.string({ required_error: "Nomi majburiy!" }).min(1, "Nomi 1 yoki undan ko'p xarfdan iborat bo'lishi kerak!"),
  balance: z.number({ required_error: "Balans majburiy!" })
});