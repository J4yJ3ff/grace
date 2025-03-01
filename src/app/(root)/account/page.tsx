import { getServerSideUser } from "@/lib/actions/Users.action";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag, User, CreditCard, LogOut } from "lucide-react";

export default async function AccountPage() {
  const cookie = await cookies();
  const { user } = await getServerSideUser(cookie);

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="container mx-auto px-4 py-14">
      <section className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">My Account</h1>
        <p className="text-lg text-gray-600">
          Welcome back, {user.name || user.email}
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <Link href="/account/profile">
          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <User className="h-8 w-8 text-gray-700" />
              <h2 className="text-xl font-semibold">Profile</h2>
            </div>
            <p className="text-gray-600">
              Update your personal information and preferences
            </p>
          </div>
        </Link>

        <Link href="/account/orders">
          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <ShoppingBag className="h-8 w-8 text-gray-700" />
              <h2 className="text-xl font-semibold">Orders</h2>
            </div>
            <p className="text-gray-600">
              View your order history and track current orders
            </p>
          </div>
        </Link>

        <Link href="/account/downloads">
          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <CreditCard className="h-8 w-8 text-gray-700" />
              <h2 className="text-xl font-semibold">Downloads</h2>
            </div>
            <p className="text-gray-600">
              Access your purchased digital products
            </p>
          </div>
        </Link>

        <form action="/api/users/logout" method="POST">
          <button type="submit" className="w-full">
            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow text-left">
              <div className="flex items-center gap-4 mb-4">
                <LogOut className="h-8 w-8 text-gray-700" />
                <h2 className="text-xl font-semibold">Sign Out</h2>
              </div>
              <p className="text-gray-600">Log out of your account</p>
            </div>
          </button>
        </form>
      </div>

      {user.role === "admin" && (
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">Admin Controls</h2>
          <p className="text-gray-600 mb-6">
            As an admin, you have access to additional controls for managing the
            website.
          </p>
          <Link href="/admin">
            <Button className="px-8 py-6 rounded-none bg-gray-900 hover:bg-gray-800">
              Go to Admin Dashboard
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
