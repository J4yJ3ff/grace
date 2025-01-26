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
    <header className="px-8 py-4 gap-4 flex sm:justify-between items-center flex-col">
      <div className="text-5xl font-semibold ">
        grace<span className="text-[#FF6250]">.</span>
      </div>
      <nav className="space-x-6 max-w-sm:space-x-0 max-w-sm:flex max-w-sm:flex-col max-w-sm:items-center max-w-sm:space-y-2">
        {navLinks.map((link) => (
          <a
            key={link.title}
            href={link.href}
            className="text-gray-600 text-lg hover:text-[#FF6250] transition-colors max-w-sm:mb-2"
          >
            {link.title}
          </a>
        ))}
      </nav>
    </header>
  );
}
