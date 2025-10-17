import { createServerFn } from "@tanstack/react-start";
import { authmiddleware } from "./middlewares/authMiddleware";
import { getRequest } from "@tanstack/react-start/server";
import { auth } from "../auth";

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
