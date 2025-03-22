import Link from "next/link"; // all the performance-intensive blocks will have built-in optimized components from nextjs
import NavLink from "./nav-link"; // import back the nav-link component we created

const links = [ // store the pages slugs in an object for scalability
  { href: "/", label: "Home" },
  { href: "/our-team", label: "Our Team" },
  { href: "/about-us", label: "About Us" },
];

export default function Header() {
  return (
    <header className="bg-white/50">
      <nav className="container mx-auto flex justify-between items-center py-4">
        <Link href="/">Our Cool Project</Link>

        <ul className="flex gap-4">
          {links.map((link) => ( // use map function to iterate all the slugs in "links"
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </ul>
      </nav>
    </header>
  );
}