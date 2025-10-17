import CreatePostForm from "@/components/forms/CreatePostForm";
import SignOutButton from "@/components/SignOutButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { getPostsWithUser, getSession } from "@/lib/server/loader";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/posts")({
  ssr: true,
  component: RouteComponent,
  loader: async () => {
    const session = await getSession();
    const posts = await getPostsWithUser();
    return { session, posts };
  },
});

function RouteComponent() {
  const { session, posts } = Route.useLoaderData();

  return (
    <div className="flex flex-col gap-3">
      <div>
        <div>hello {session?.user.name}</div>
        <SignOutButton />
      </div>
      <CreatePostForm />
      {posts.length ? (
        <div className="grid grid-cols-3 p-4 gap-3">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardContent>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
                <CardDescription>Author: {post.user?.name}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div>no posts available</div>
      )}
    </div>
  );
}
