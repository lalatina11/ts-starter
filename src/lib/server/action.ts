import { createServerFn } from "@tanstack/react-start";
import { addPostSchema } from "../schemas/post";
import { post as postsTable } from "@/db/schema";
import { v4 as uuidv4 } from "uuid"; // Import uuid to generate id
import { getSession } from "./loader";
import db from "@/db";
import { eq } from "drizzle-orm";

export const handleAddPosts = createServerFn({ method: "POST" })
    .inputValidator(addPostSchema)
    .handler(async ({ data }) => {
        const { title, description } = data;
        const session = await getSession();
        if (!session) throw new Error("Not Authorized");
        const takenTitle = await db.$count(postsTable, eq(postsTable.title, title))
        if (takenTitle > 0) throw new Error("Title sudah digunakan, tolong ganti!")
        await db.insert(postsTable).values({
            id: uuidv4(),
            title,
            description,
            userId: session.user.id,
        });
    });