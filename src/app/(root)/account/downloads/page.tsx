import { getServerSideUser } from "@/lib/actions/Users.action";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPayloadClient } from "@/lib/payload";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

export default async function DownloadsPage() {
  const cookie = await cookies();
  const { user } = await getServerSideUser(cookie);

  if (!user) {
    redirect("/sign-in");
  }

  // Get purchased product files
  const payload = await getPayloadClient();
  const { docs: orders } = await payload.find({
    collection: "orders",
    where: {
      user: {
        equals: user.id,
      },
      _isPaid: {
        equals: true,
      },
    },
    depth: 2,
  });

  // Extract product files from orders
  const productFiles = orders
    .flatMap((order) =>
      order.products.map((product) => {
        if (typeof product === "string") return null;
        return product.product_files;
      })
    )
    .filter(Boolean);

  // Remove duplicates
  const uniqueProductFiles = Array.from(
    new Set(
      productFiles.map((file) => (typeof file === "string" ? file : file.id))
    )
  ).map((fileId) => {
    const file = productFiles.find((f) =>
      typeof f === "string" ? f === fileId : f.id === fileId
    );
    return typeof file === "string" ? { id: file } : file;
  });

  return (
    <div className="container mx-auto px-4 py-14">
      <section className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Downloads</h1>
        <p className="text-lg text-gray-600">
          Access your purchased digital products
        </p>
      </section>

      {uniqueProductFiles.length === 0 ? (
        <div className="text-center py-10">
          <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold mb-4">
            No downloads available
          </h2>
          <p className="text-gray-600 mb-6">
            You haven't purchased any digital products yet. Check out our store
            to find something you'll love!
          </p>
          <Link href="/store">
            <Button className="px-8 py-6 rounded-none bg-gray-900 hover:bg-gray-800">
              Browse Store
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {uniqueProductFiles.map((file) => (
            <div
              key={typeof file === "string" ? file : file.id}
              className="border rounded-lg p-6 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-lg">
                  {typeof file === "string" ? "Product File" : file.filename}
                </h3>
                {typeof file !== "string" && file.description && (
                  <p className="text-gray-600">{file.description}</p>
                )}
              </div>
              <a
                href={
                  typeof file === "string"
                    ? "#"
                    : `${process.env.NEXT_PUBLIC_SERVER_URL}/product_files/${file.filename}`
                }
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
