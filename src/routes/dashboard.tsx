import SignOutButton from "@/components/SignOutButton";
import { auth } from "@/lib/auth";
import { authmiddleware } from "@/lib/server/middlewares/authMiddleware";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

const getSession = createServerFn()
  .middleware([authmiddleware])
  .handler(async () => {
    const request = getRequest();
    const session = await auth.api.getSession({ headers: request.headers });
    return session;
  });

export const Route = createFileRoute("/dashboard")({
  ssr: true,
  loader: async () => {
    const session = await getSession();
    return { session };
  },
  pendingComponent: () => <div>Loading...</div>,
  component: Dashboard,
});

function Dashboard() {
  const { session } = Route.useLoaderData();
  return (
    <div>
      <div>hello {session?.user.name}</div>
      <SignOutButton />
    </div>
  );
}
