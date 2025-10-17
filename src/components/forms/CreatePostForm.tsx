import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addPostSchema } from "@/lib/schemas/post";
import { handleAddPosts } from "@/lib/server/action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Textarea } from "../ui/textarea";

const CreatePostForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof addPostSchema>>({
    resolver: zodResolver(addPostSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof addPostSchema>) {
    try {
      await handleAddPosts({ data: values });
      router.invalidate();
      toast.success("Berhasil!", {
        description: "Postingan berhasil ditambahkan",
        action: {
          label: "OK",
          onClick: () => {},
        },
      });
      form.reset();
    } catch (error) {
      const { message } = error as Error;
      toast.error("Gagal!", {
        description: message,
        action: {
          label: "OK",
          onClick: () => {},
        },
      });
      form.setError("root", { message });
    }
  }
  return (
    <Card className="w-sm mx-auto">
      <CardHeader>
        <CardTitle>Create Posts</CardTitle>
        <CardDescription>Create a new posts</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {form.formState.errors.root?.message && (
              <span className="text-xs text-destructive flex justify-center items-center">
                {form.formState.errors.root.message}
              </span>
            )}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="My Title" {...field} />
                  </FormControl>
                  <FormDescription>
                    This will be your post title.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="My Description" />
                  </FormControl>
                  <FormDescription>
                    This will be your post description.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={form.formState.isLoading || form.formState.isSubmitting}
              type="submit"
              className="w-full"
            >
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="text-muted-foreground">
        copyright 2025 @candra
      </CardFooter>
    </Card>
  );
};

export default CreatePostForm;
