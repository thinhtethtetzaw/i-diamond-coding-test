"use client";

import Image from "next/image";
import { useUiStore } from "@/store/use-ui-store";

const links = [
  { label: "Jewelry", dropdown: true },
  { label: "Love and Engagement", dropdown: true },
  { label: "Gifts", dropdown: true },
  { label: "Custom Jewelry", dropdown: false },
  { label: "About", dropdown: false },
  { label: "Contact us", dropdown: false },
];
const slug = (value: string) => value.toLowerCase().replaceAll(" ", "-");
const promo = "Exclusive Collection Launch: Discover Timeless Elegance Today";

export function Header() {
  const { isMenuOpen, setMenuOpen } = useUiStore();
  return (
    <header className="site-header">
      <div className="desktop-only">
        <div className="topbar">
          <a className="topbar__book" href="#appointment">
            <Image src="/assets/header-calendar.svg" alt="" width={20} height={20} />
            <span>Book an appointment</span>
          </a>
          <p className="topbar__promo"><i /><span>{promo}</span><i /></p>
          <div className="topbar__icons">
            <Image src="/assets/header-user.svg" alt="Account" width={17} height={17} />
            <Image src="/assets/header-heart.svg" alt="Wishlist" width={17} height={17} />
            <Image src="/assets/header-bag.svg" alt="Shopping bag" width={17} height={17} />
          </div>
        </div>
        <div className="navbar">
          <a href="#" className="brand" aria-label="MyJewel home"><Image src="/assets/logo.svg" alt="MyJewel" width={133} height={35} priority /></a>
          <span className="navbar__rule navbar__rule--left" />
          <nav className="nav" aria-label="Primary navigation">
            {links.map(({ label, dropdown }) => (
              <a key={label} href={`#${slug(label)}`}>{label}{dropdown && <Image src="/assets/header-chevron.svg" alt="" width={13} height={13} />}</a>
            ))}
          </nav>
          <span className="navbar__rule navbar__rule--right" />
          <a className="search" href="#search" aria-label="Search"><Image src="/assets/header-search.svg" alt="" width={19} height={19} /></a>
        </div>
      </div>

      <div className="mobile-only">
        <div className="m-header">
          <div className="m-topbar"><p className="m-topbar__promo"><i /><span>{promo}</span><i /></p></div>
          <button className="m-header__menu" aria-label="Toggle navigation" aria-expanded={isMenuOpen} onClick={() => setMenuOpen(!isMenuOpen)}>
            <Image src="/assets/m-header-menu.svg" alt="" width={13} height={9} />
          </button>
          <a className="m-header__calendar" href="#appointment" aria-label="Book an appointment"><Image src="/assets/m-header-calendar.svg" alt="" width={18} height={18} /></a>
          <a href="#" className="m-header__brand" aria-label="MyJewel home"><Image src="/assets/logo.svg" alt="MyJewel" width={94} height={25} priority /></a>
          <a className="m-header__heart" href="#wishlist" aria-label="Wishlist"><Image src="/assets/m-header-heart.svg" alt="" width={18} height={18} /></a>
          <a className="m-header__bag" href="#bag" aria-label="Shopping bag, 1 item"><Image src="/assets/m-header-bag.svg" alt="" width={18} height={18} /></a>
          <span className="m-header__count" aria-hidden="true">1</span>
          <a className="m-header__search" href="#search" aria-label="Search"><Image src="/assets/m-header-search.svg" alt="" width={12} height={12} /></a>
        </div>
        {isMenuOpen && (
          <nav className="m-nav" aria-label="Primary navigation">
            {links.map(({ label }) => <a key={label} onClick={() => setMenuOpen(false)} href={`#${slug(label)}`}>{label}</a>)}
          </nav>
        )}
      </div>
    </header>
  );
}
