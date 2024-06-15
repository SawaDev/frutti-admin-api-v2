import { z } from "zod";

export const createClientSchema = z.object({
  name: z.string({ required_error: "Ism majburiy!" }).min(6, "Ism 6 yoki undan ko'p xarfdan iborat bo'lishi kerak!"),
  balance: z.number({ required_error: "Hisob majburiy!" })
});