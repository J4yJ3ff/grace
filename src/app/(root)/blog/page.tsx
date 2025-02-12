import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getPost } from "@/lib/actions/Posts.action";
import NewsletterSection from "@/components/NewsletterSection";

const BlogPage = async () => {
  const result = await getPost();
  const posts = result?.docs || [];

  if (!posts || posts.length === 0) {
    return <div>No posts found.</div>;
  }

  const NewsletterProps = {
    title: "Stay Updated",
    description:
      "Subscribe to our newsletter for the latest design insights and tips.",
  };

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-14">
        <section className="mb-20">
          <h1 className="text-6xl md:text-6xl text-[8vw] font-bold mb-4 text-center">
            Blog
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
            Insights, tips, and trends in visual design, branding, and creative
            strategy.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map((post) => (
            <article key={post.id} className="flex flex-col">
              <Link href={`/blog/${post.slug}`}>
                <Image
                  src={
                    post.featuredImage.url ||
                    "/placeholder.svg?height=400&width=600"
                  }
                  alt={post.title}
                  width={600}
                  height={400}
                  className="aspect-video object-cover mb-4"
                />
              </Link>

              <div className="flex-grow">
                <span className="text-sm text-[#FF6250] font-semibold mb-2 block">
                  {post.category.name || "Uncategorized"}
                </span>
                <Link href={`/blog/${post.slug}`}>
                  {" "}
                  <h2 className="text-2xl font-bold mb-2">{post.title}</h2>{" "}
                </Link>
                <p className="text-gray-600 mb-4">
                  {post.excerpt || "No excerpt available."}
                </p>
              </div>
              <div className="mt-auto">
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>{post.author || "Anonymous"}</span>
                  <time>
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString()
                      : "Date not available"}
                  </time>
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <Button
                    variant="default"
                    className="w-full py-6 rounded-none bg-gray-900 hover:bg-gray-800"
                  >
                    Read More
                  </Button>
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>

      <NewsletterSection
        title={NewsletterProps.title}
        description={NewsletterProps.description}
      />
    </div>
  );
};

export default BlogPage;
