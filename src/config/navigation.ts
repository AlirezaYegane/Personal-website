export interface NavItem {
    href: string;
    label: string;
}

export const mainNav: NavItem[] = [
    { href: "/", label: "Home" },
    { href: "/narrative", label: "Story" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Notes" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];
