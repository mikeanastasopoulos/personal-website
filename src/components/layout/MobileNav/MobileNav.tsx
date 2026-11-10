"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useMobileNav } from "@/hooks/useMobileNav";
import styles from "./MobileNav.module.css";

type NavLink = {
  href: string;
  target: string;
  label: string;
};

type MobileNavProps = {
  links: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
  navigationLabel: string;
  openMenuLabel: string;
  closeMenuLabel: string;
};

const MobileNav = ({
  links,
  ctaLabel,
  ctaHref,
  navigationLabel,
  openMenuLabel,
  closeMenuLabel,
}: MobileNavProps) => {
  const { isOpen, toggle, close } = useMobileNav();

  return (
    <>
      <button
        type="button"
        className={styles.hamburger}
        onClick={toggle}
        aria-label={isOpen ? closeMenuLabel : openMenuLabel}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={16} /> : <Menu size={16} />}
      </button>

      {isOpen && (
        <nav className={styles.panel} aria-label={navigationLabel} data-lenis-prevent>
          {links.map((link) => (
            // A plain in-page anchor, not next/link: MobileExperience stacks every
            // section on one page, so navigating between them is just scrolling to
            // the matching id - there is no route to push here.
            <a
              key={link.target}
              href={`#${link.target}`}
              className={styles.link}
              onClick={close}
            >
              {link.label}
            </a>
          ))}
          {ctaLabel && ctaHref ? (
            <Link href={ctaHref} className={styles.cta} onClick={close}>
              {ctaLabel}
            </Link>
          ) : null}
        </nav>
      )}
    </>
  );
};

export default MobileNav;
