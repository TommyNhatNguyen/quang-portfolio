"use client";
import { useHeader } from "@/app/lib/hooks/use-header";
import Link from "next/link";
import { useState } from "react";
import "./styles/social-menu.scss";

export default function SocialMenu() {
  const [open, setOpen] = useState(false);
  const { header } = useHeader();
  const socials = header?.socials ?? [];

  return (
    <>
      <div className="social-menu__desktop">
        {socials.map((s) => (
          <Link
            key={s.id}
            href={s.link}
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
          {socials.map((s) => (
            <Link
              key={s.id}
              href={s.link}
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
