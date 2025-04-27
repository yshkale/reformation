"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  links: { name: string; href: string }[];
  className?: string;
}

export default function Breadcrumb({ links, className = "" }: BreadcrumbProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center text-sm ${className}`}
    >
      <ol className="flex items-center space-x-2">
        {links.map((link, index) => {
          const isLast = index === links.length - 1;
          const isActive = pathname === link.href;

          return (
            <li key={link.name} className="flex items-center text-xs">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 mr-1 text-neutral-400" />
              )}
              <Link
                href={link.href}
                className={`hover:text-primary transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-neutral-600 border-b border-neutral-600"
                }`}
                aria-current={isLast ? "page" : undefined}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
