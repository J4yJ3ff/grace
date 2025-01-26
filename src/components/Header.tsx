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
    <header className="px-8 py-4 flex justify-between items-center">
      <div className="text-5xl font-semibold ">
        grace<span className="text-[#FF6250]">.</span>
      </div>
      <nav className="space-x-6">
        {navLinks.map((link) => (
          <a
            key={link.title}
            href={link.href}
            className="text-gray-600 text-lg hover:text-[#FF6250] transition-colors"
          >
            {link.title}
          </a>
        ))}
      </nav>
    </header>
  );
}
