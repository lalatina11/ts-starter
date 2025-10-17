import { auth } from "@/lib/auth";
import { createMiddleware } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";
import { getRequest } from "@tanstack/react-start/server";

export const authmiddleware = createMiddleware({ type: "request" }).server(
  async ({ request, next }) => {
    const { pathname } = new URL(request.url);
    const session = await auth.api.getSession({ headers: request.headers });
    if (pathname.startsWith("/dashboard")) {
      if (!session) {
        throw redirect({ to: "/auth" });
      }
      return await next();
    }
    if (pathname.startsWith("/auth")) {
      if (session) {
        throw redirect({ to: "/dashboard" });
      }
    }
    return await next();
  },
);

export const authMiddlewareFunc = createMiddleware({
  type: "function",
}).server(async ({ next }) => {
  const request = getRequest();
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    throw new Error("Not Authorized!");
  }

  return await next();
});
