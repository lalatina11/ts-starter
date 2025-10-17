import { createServerFn } from "@tanstack/react-start";
import { authmiddleware } from "./middlewares/authMiddleware";
import { getRequest } from "@tanstack/react-start/server";
import { auth } from "../auth";
import db from "@/db";
import { post as postsTable, user as usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getSession = createServerFn()
    .middleware([authmiddleware])
    .handler(async () => {
        try {
            const request = getRequest();
            const session = await auth.api.getSession({ headers: request.headers });
            return session;
        } catch (error) {
            return null;
        }
    });

export const getPostsWithUser = createServerFn({ method: "GET" }).handler(
    async () => {
        return await db
            .select({
                id: postsTable.id,
                title: postsTable.title,
                description: postsTable.description,
                userId: postsTable.userId,
                createdAt: postsTable.createdAt,
                updatedAt: postsTable.updatedAt,
                user: {
                    id: usersTable.id,
                    name: usersTable.name,
                },
            })
            .from(postsTable)
            .leftJoin(usersTable, eq(usersTable.id, postsTable.userId))
    }
);
