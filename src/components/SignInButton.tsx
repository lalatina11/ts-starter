import { Button } from "./ui/button";
import { toast } from "sonner";
import { signIn } from "@/lib/authClient";

const SignInButton = () => {
  const signInGithub = async () => {
    try {
      await signIn.social({
        provider: "github",
        callbackURL: "/dashboard",
        fetchOptions: {
          redirect: "manual",
          onSuccess: () => {
            toast.success("Login Successfull", {
              description: "You will redirecting into Dashboard Page",
              action: {
                label: "OK",
                onClick: () => {},
              },
            });
          },
          onError: ({ error }) => {
            throw error;
          },
        },
      });
    } catch (error) {
      const { message } = error as Error;
      toast.error("Login failed", {
        description: message,
      });
    }
  };
  return <Button onClick={signInGithub}>Login</Button>;
};

export default SignInButton;
