import { user as userTable, post as postTable } from "@/db/schema";

export type User = typeof userTable.$inferSelect
export type Post = typeof postTable.$inferSelect