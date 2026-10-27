'use client';

// Uses React state for the mobile menu toggle, so this stays a Client Component.
// Links point to `/#anchor` instead of bare `#anchor` so navigation still works
// correctly from the new /daily-specials and /reservations routes, not just "/".
import React, { useState } from 'react';
import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import images from '../../constants/images';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Menu', href: '/#menu' },
  { label: 'Awards', href: '/#awards' },
  { label: 'Contact', href: '/#contact' },
];

const Navbar: React.FC = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <Link href="/">
          <img src={images.gericht} alt="app logo" />
        </Link>
      </div>
      <ul className="app__navbar-links">
        {NAV_LINKS.map((link) => (
          <li className="p__opensans" key={link.label}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
        <li className="p__opensans">
          <Link href="/daily-specials">Daily Menu</Link>
        </li>
        <li className="p__opensans">
          <Link href="/reservations">Reservations</Link>
        </li>
      </ul>
      <div className="app__navbar-login">
        <a href="#login" className="p__opensans">Log in / Register</a>
        <div />
        <Link href="/reservations" className="p__opensans">Book Table</Link>
      </div>
      <div className="app__navbar-smallscreen">
        <GiHamburgerMenu color="#fff" fontSize={27} onClick={() => setToggleMenu(true)} />
        {toggleMenu && (
          <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
            <MdOutlineRestaurantMenu fontSize={27} className="overlay__close" onClick={() => setToggleMenu(false)} />
            <ul className="app__navbar-smallscreen_links">
              {NAV_LINKS.map((link) => (
                <li className="p__opensans" key={link.label}>
                  <Link href={link.href} onClick={() => setToggleMenu(false)}>{link.label}</Link>
                </li>
              ))}
              <li className="p__opensans">
                <Link href="/daily-specials" onClick={() => setToggleMenu(false)}>Daily Menu</Link>
              </li>
              <li className="p__opensans">
                <Link href="/reservations" onClick={() => setToggleMenu(false)}>Reservations</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
