import Link from "next/link";
import { Cart } from "./store/Cart";

import { getServerSideUser } from "@/lib/actions/Users.action";
import { User } from "lucide-react";
import { cookies } from "next/headers";

export default async function Header() {
  const cookie = await cookies();
  const { user } = await getServerSideUser(cookie);

  const navLinks = [
    {
      title: "Services",
      href: "#services",
    },
    {
      title: "Work",
      href: "#work",
    },
    {
      title: "Contact",
      href: "#contact",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "Store",
      href: "/store",
    },
  ];

  return (
    <header className="px-8 py-4 sm:flex sm:justify-between sm:flex-row sm:items-center items-center text-center">
      <div className="mb-4 sm:mb-0">
        <Link
          href="/"
          aria-label="Grace - Home"
          className="text-5xl font-semibold inline-block"
        >
          grace<span className="text-[#FF6250]">.</span>
        </Link>
      </div>
      <nav
        aria-label="Main navigation"
        className="flex max-sm:flex-col gap-4 items-center justify-center"
      >
        <ul className="space-x-6 flex flex-wrap justify-center">
          {navLinks.map((link) => (
            <li key={link.title}>
              <a
                href={link.href}
                className="text-gray-600 text-lg hover:text-[#FF6250] transition-colors inline-block"
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <Cart />
          {user ? (
            <Link
              href="/account"
              className="text-gray-600 hover:text-[#FF6250]"
            >
              <User className="h-5 w-5" />
            </Link>
          ) : (
            <Link
              href="/sign-in"
              className="text-gray-600 hover:text-[#FF6250]"
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
