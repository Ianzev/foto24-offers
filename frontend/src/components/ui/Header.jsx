import React from "react";
import styles from "../../pages/styles/pages.module.css";

export default function Header({ text, children }) {
  return (
    <div className={styles["container-title"]}>
      <h1>{text}</h1>
      {children}
    </div>
  );
}
