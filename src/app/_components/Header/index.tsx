"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import classes from "./Header.module.css";

export const Header: React.FC = () => {
  return (
    <header className={classes.AppHeader}>
      <div className={classes.headerContent}>
        <Link href="/" className={classes.logoContainer}>
          <Image
            src="/logo.png"
            alt="logo"
            width={150}
            height={40}
            className={classes.logo}
          />
        </Link>
        <nav className={classes.nav}>
          <Link href="/" className={classes.navLink}>ホーム</Link>
          <Link href="/contact" className={classes.navLink}>お問い合わせ</Link>
        </nav>
      </div>
    </header>
  );
}; 