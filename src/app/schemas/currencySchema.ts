import { z } from "zod";

export const createCurrencySchema = z.object({
  name: z.string({ required_error: "Nomi majburiy!" }),
  distribution: z.number({ required_error: "Hisob majburiy!" }).min(0, "0 dan katta bo'lishi kerak!")
});