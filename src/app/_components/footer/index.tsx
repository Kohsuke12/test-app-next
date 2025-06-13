import React from "react";
import classes from "./footer.module.css";

export const Footer: React.FC = () => {
  return (
    <footer className={classes.footer}>
      <p className={classes.footerParagraph}>&copy; 2024 My Blog</p>
    </footer>
  );
}; 