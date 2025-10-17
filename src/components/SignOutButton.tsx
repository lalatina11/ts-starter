import { signOut } from "@/lib/authClient";
import { Button } from "./ui/button";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";

const SignOutButton = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Success to logout", {
            description: "You will redirected into Home Page",
            action: {
              label: "OK",
              onClick: () => {},
            },
          });
          router.navigate({ to: "/auth" });
        },
        onError: (err) => {
          console.log(err.error.message);
        },
      },
    });
  };
  return (
    <Button onClick={handleSignOut} className="w-fit" variant="destructive">
      Logout
    </Button>
  );
};

export default SignOutButton;
