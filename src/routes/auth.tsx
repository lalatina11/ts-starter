import SignInButton from "@/components/SignInButton";
import { authmiddleware } from "@/lib/server/middlewares/authMiddleware";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
  ssr: true,
  server: {
    middleware: [authmiddleware],
  },
  pendingComponent: () => <div>Loading...</div>,
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <span>Hello "/auth"!</span>
      <SignInButton />
    </div>
  );
}
