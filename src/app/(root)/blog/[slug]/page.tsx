import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getPostBySlug } from "@/lib/actions/Posts.action";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

interface PageProps {
  params: {
    slug: string;
  };
}

const PostDetailsPage = async ({ params }: PageProps) => {
  const param = await params;
  const result = await getPostBySlug(param.slug);

  const post = result.docs?.[0];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2>Post not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-14">
        <article className="max-w-3xl mx-auto">
          <header className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-sm text-[#FF6250] font-semibold mb-2 block">
                {post.category.name || "Uncategorized"}
              </span>
              {post.title}{" "}
            </h1>
            <div className="flex items-center text-gray-600 mb-6">
              <time className="mr-4">
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>By {post.author?.name || "Anonymous"}</span>{" "}
            </div>
            {post.featuredImage && (
              <Image
                src={post.featuredImage.url || "/placeholder.svg"}
                alt={post.title}
                width={1200}
                height={630}
                className="w-full h-auto object-cover rounded-lg"
                priority
              />
            )}
          </header>

          <div className="prose prose-lg max-w-none">
            {post.content && (
              <RichText data={post.content as SerializedEditorState} />
            )}
          </div>

          <footer className="mt-10 pt-10 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <Link href="/blog">
                <Button
                  variant="outline"
                  className="rounded-none border-gray-900 text-gray-900 hover:bg-gray-100"
                >
                  ← Back to Blog
                </Button>
              </Link>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  className="rounded-none border-gray-900 text-gray-900 hover:bg-gray-100"
                >
                  Share
                </Button>
                <Button className="rounded-none bg-gray-900 hover:bg-gray-800 text-white">
                  Subscribe
                </Button>
              </div>
            </div>
          </footer>
        </article>
      </main>
    </div>
  );
};

export default PostDetailsPage;
