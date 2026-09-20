"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useUiStore } from "@/store/use-ui-store";

const links = [
  { label: "Jewelry", items: ["Rings", "Necklaces", "Earrings", "Bracelets"] },
  { label: "Love and Engagement", items: ["Engagement Rings", "Wedding Bands", "Anniversary Gifts"] },
  { label: "Gifts", items: ["Gifts for Her", "Gifts for Him", "Gift Cards"] },
  { label: "Custom Jewelry" },
  { label: "About" },
  { label: "Contact us" },
];
const slug = (value: string) => value.toLowerCase().replaceAll(" ", "-");
const promo = "Exclusive Collection Launch: Discover Timeless Elegance Today";

export function Header() {
  const { isMenuOpen, isSearchOpen, setMenuOpen, setSearchOpen } = useUiStore();
  const [isScrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen) searchRef.current?.focus();
  }, [isSearchOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setSearchOpen(false);
      setMenuOpen(false);
      setOpenMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setMenuOpen, setSearchOpen]);

  return (
    <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
      <div className="desktop-only">
        <div className="topbar">
          <a className="topbar__book" href="#appointment">
            <Image src="/assets/header-calendar.svg" alt="" width={20} height={20} />
            <span>Book an appointment</span>
          </a>
          <p className="topbar__promo"><i /><span>{promo}</span><i /></p>
          <div className="topbar__icons">
            <a href="#account" aria-label="Account"><Image src="/assets/header-user.svg" alt="" width={17} height={17} /></a>
            <a href="#wishlist" aria-label="Wishlist"><Image src="/assets/header-heart.svg" alt="" width={17} height={17} /></a>
            <a href="#bag" aria-label="Shopping bag"><Image src="/assets/header-bag.svg" alt="" width={17} height={17} /></a>
          </div>
        </div>
        <div className="navbar">
          <a href="#" className="brand" aria-label="MyJewel home"><Image src="/assets/logo.svg" alt="MyJewel" width={133} height={35} priority /></a>
          <span className="navbar__rule navbar__rule--left" />
          <nav className="nav" aria-label="Primary navigation" onMouseLeave={() => setOpenMenu(null)}>
            {links.map(({ label, items }) => {
              const isOpen = openMenu === label;
              return (
                <div className={`nav__item${isOpen ? " is-open" : ""}`} key={label} onMouseEnter={() => setOpenMenu(items ? label : null)}>
                  <a
                    href={`#${slug(label)}`}
                    aria-haspopup={items ? "menu" : undefined}
                    aria-expanded={items ? isOpen : undefined}
                    onFocus={() => setOpenMenu(items ? label : null)}
                    onClick={(event) => { if (items) { event.preventDefault(); setOpenMenu(isOpen ? null : label); } }}
                  >
                    {label}
                    {items && <Image src="/assets/header-chevron.svg" alt="" width={13} height={13} />}
                  </a>
                  {items && (
                    <ul className="nav__menu" role="menu">
                      {items.map((item) => <li key={item} role="none"><a role="menuitem" href={`#${slug(item)}`}>{item}</a></li>)}
                    </ul>
                  )}
                </div>
              );
            })}
          </nav>
          <span className="navbar__rule navbar__rule--right" />
          <button className="search" type="button" aria-label="Search" aria-expanded={isSearchOpen} onClick={() => setSearchOpen(!isSearchOpen)}>
            <Image src="/assets/header-search.svg" alt="" width={19} height={19} />
          </button>
        </div>
      </div>

      <div className="mobile-only">
        <div className="m-header">
          <div className="m-topbar"><p className="m-topbar__promo"><i /><span>{promo}</span><i /></p></div>
          <button className={`m-header__menu${isMenuOpen ? " is-open" : ""}`} type="button" aria-label="Toggle navigation" aria-expanded={isMenuOpen} onClick={() => setMenuOpen(!isMenuOpen)}>
            <span className="m-header__bars" aria-hidden="true"><i /><i /><i /></span>
          </button>
          <a className="m-header__calendar" href="#appointment" aria-label="Book an appointment"><Image src="/assets/m-header-calendar.svg" alt="" width={18} height={18} /></a>
          <a href="#" className="m-header__brand" aria-label="MyJewel home"><Image src="/assets/logo.svg" alt="MyJewel" width={94} height={25} priority /></a>
          <a className="m-header__heart" href="#wishlist" aria-label="Wishlist"><Image src="/assets/m-header-heart.svg" alt="" width={18} height={18} /></a>
          <a className="m-header__bag" href="#bag" aria-label="Shopping bag, 1 item"><Image src="/assets/m-header-bag.svg" alt="" width={18} height={18} /></a>
          <span className="m-header__count" aria-hidden="true">1</span>
          <button className="m-header__search" type="button" aria-label="Search" aria-expanded={isSearchOpen} onClick={() => setSearchOpen(!isSearchOpen)}>
            <Image src="/assets/m-header-search.svg" alt="" width={12} height={12} />
          </button>
        </div>
        <nav className={`m-nav${isMenuOpen ? " is-open" : ""}`} aria-label="Primary navigation" aria-hidden={!isMenuOpen}>
          {links.map(({ label }) => <a key={label} tabIndex={isMenuOpen ? 0 : -1} onClick={() => setMenuOpen(false)} href={`#${slug(label)}`}>{label}</a>)}
        </nav>
      </div>

      <form className={`search-bar${isSearchOpen ? " is-open" : ""}`} role="search" aria-hidden={!isSearchOpen} onSubmit={(event) => { event.preventDefault(); setSearchOpen(false); }}>
        <label className="sr-only" htmlFor="site-search">Search the store</label>
        <input ref={searchRef} id="site-search" type="search" placeholder="Search rings, necklaces, gifts…" tabIndex={isSearchOpen ? 0 : -1} />
        <button type="submit" tabIndex={isSearchOpen ? 0 : -1}>Search</button>
      </form>
    </header>
  );
}
