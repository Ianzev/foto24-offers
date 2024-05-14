import React from "react";
import styles from "../pages/styles/pages.module.css";

export default function Table({ children }) {
  return <table className={styles["items-table"]}>{children}</table>;
}
