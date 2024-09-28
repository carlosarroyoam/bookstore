import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().min(8).max(50),
  password: z.string().min(8).max(16),
});

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;
