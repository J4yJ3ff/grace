import Link from "next/link";

export default function Header() {
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
  ];

  return (
    <header className="px-8 py-4 sm:flex sm:justify-between sm:flex-row sm:items-center items-center text-center ">
      <div className="mb-4 sm:mb-0">
        <Link
          href="/"
          aria-label="Grace - Home"
          className="text-5xl font-semibold inline-block"
        >
          grace<span className="text-[#FF6250]">.</span>
        </Link>
      </div>
      <nav aria-label="Main navigation">
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
      </nav>
    </header>
  );
}
