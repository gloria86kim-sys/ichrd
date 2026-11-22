"use client";
import Link from "next/link";
import { useState } from "react";
import { nav, site } from "@/data/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <Link href="/" className="brand" onClick={() => setOpen(false)}>
        <span className="brand-mark">ICHRD</span>
        <span className="brand-name">{site.name}</span>
      </Link>
      <button className="menu-btn" aria-expanded={open} aria-label="메뉴" onClick={() => setOpen(!open)}>
        <span /><span />
      </button>
      <nav className={open ? "nav open" : "nav"}>
        {nav.map((n) => (
          <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</Link>
        ))}
      </nav>
    </header>
  );
}
