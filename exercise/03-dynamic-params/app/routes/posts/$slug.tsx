import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getPost } from "~/models/post.server";

export async function loader({ params }: LoaderArgs) {
  const { slug } = params;
  invariant(slug, "Missing slug");
  const post = await getPost(slug);
  if (!post) {
    throw new Error("Post not found");
  }
  return json({ post });
}

export default function Post() {
  const { post } = useLoaderData<typeof loader>();
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{post.title}</h1>
    </main>
  );
}
