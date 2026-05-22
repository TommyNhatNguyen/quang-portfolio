"use client";
import Link from "next/link";
import { useState } from "react";
import "./styles/social-menu.scss";

const SOCIALS = [
  { label: "Behance", href: "https://www.behance.net/quanglaam" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/quanglaam" },
  { label: "Instagram", href: "https://www.instagram.com/quanglaam" },
];

export default function SocialMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="social-menu__desktop">
        {SOCIALS.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="social-menu__desktop-item"
          >
            {s.label}
          </Link>
        ))}
      </div>

      <button
        className={`social-menu__trigger${open ? " --open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle social links"
      >
        <span className="social-menu__dash" />
        <span className="social-menu__dash" />
        <span className="social-menu__dash" />
      </button>

      <div
        className={`social-menu__overlay${open ? " --open" : ""}`}
        aria-hidden={!open}
      >
        <nav className="social-menu__links">
          {SOCIALS.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-menu__link"
              onClick={() => setOpen(false)}
            >
              {s.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
