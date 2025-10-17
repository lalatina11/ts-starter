import SignOutButton from "@/components/SignOutButton";
import { getSession } from "@/lib/server/loader";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/posts")({
  component: RouteComponent,
  loader: async () => {
    const session = await getSession();
    return { session };
  },
});

function RouteComponent() {
  const { session } = Route.useLoaderData();
  return (
    <div>
      <div>hello {session?.user.name}</div>
      <SignOutButton />
    </div>
  );
}
