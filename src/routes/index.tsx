import { ModeToggle } from "@/components/ModeToggle";
import SignInButton from "@/components/SignInButton";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/authClient";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const session = useSession();
  return (
    <div>
      <span>Hello from Home</span>
      <Button
        onClick={() => {
          toast.success("Testing Toaster", {
            description: "Toast is working",
            action: {
              label: "OK",
              onClick: () => {},
            },
          });
        }}
      >
        Test
      </Button>

      <ModeToggle />
      {session.data ? <Link to="/dashboard">Dashboard</Link> : <SignInButton />}
    </div>
  );
}
