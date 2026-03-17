import Link from "next/link";

type SiteHeaderProps = {
  active: "shelters" | "map" | "register" | "about";
};

const navItems = [
  { href: "/", label: "쉼터", key: "shelters" },
  { href: "/map", label: "지도", key: "map" },
  { href: "/register", label: "보호소 등록", key: "register" },
  { href: "/about", label: "About", key: "about" },
] as const;

export function SiteHeader({ active }: SiteHeaderProps) {
  return (
    <header className="catalog-header">
      <div className="topbar">
        <Link className="brand-mark" href="/" aria-label="홈으로 이동">
          <svg viewBox="0 0 64 64" aria-hidden="true">
            <ellipse cx="20" cy="18" rx="7" ry="10" />
            <ellipse cx="32" cy="12" rx="7" ry="10" />
            <ellipse cx="44" cy="18" rx="7" ry="10" />
            <ellipse cx="25" cy="37" rx="7" ry="9" />
            <path d="M32 28C22 28 15 36 15 45C15 53 22 58 32 58C42 58 49 53 49 45C49 36 42 28 32 28Z" />
          </svg>
        </Link>
        <Link className="brand" href="/">
          Pet Shelter Archive
        </Link>
      </div>

      <nav className="catalog-nav" aria-label="주요 메뉴">
        {navItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={`catalog-tab ${active === item.key ? "is-active" : ""}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
