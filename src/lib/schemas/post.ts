import z from "zod";

export const addPostSchema = z.object({
    title: z.string().min(2).max(64),
    description: z.string().optional(),
});
