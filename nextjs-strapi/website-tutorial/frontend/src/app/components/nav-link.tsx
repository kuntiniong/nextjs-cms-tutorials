"use client"; // render in the client side because there're user interaction

import { usePathname } from "next/navigation"; // built0in nextjs hook function to fetch current url
import Link from "next/link"; // built-in nextjs component
import path from "path";

function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}

interface NavLinkProps { // typescript type declartion
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: Readonly<NavLinkProps>) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <li>
      <Link
        href={href}
        className={cn(
          isActive ? "opacity-100" : "opacity-50 hover:opacity-100"
        )}
      >
        {children}
      </Link>
    </li>
  );
}