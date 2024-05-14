import React from "react";
import styles from "../../pages/styles/pages.module.css";

export default function TitleHeader({ text, children }) {
  return (
    <div className={styles["container-title"]}>
      <h1>{text}</h1>
      <div className="flex">{children}</div>
    </div>
  );
}
