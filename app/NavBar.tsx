import Link from "next/link";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex space-x-6 items-center border-b mb-5 px-5 py-4">
      <Link href={"/"}>
        <AiFillBug />
      </Link>

      <ul className="flex space-x-6">
        <li>
          {links.map(({ label, href }) => (
            <Link
              className="text-zinc-500 hover:text-zinc-800 transition-colors"
              href={href}
              key={href}
            >
              {label}
            </Link>
          ))}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
