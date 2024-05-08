import React, { useState } from "react";
import styles from "./alert.module.css";

const Alert = ({ message, result }) => {
  const [showAlert, setShowAlert] = useState(true);

  // Hide the alert when the close button is clicked
  const handleClose = () => {
    setShowAlert(false);
  };

  return (
    <>
      <div
        className={`${styles["custom-alert"]} ${
          result ? styles.success : styles.error
        }`}
      >
        <span className={styles.close} onClick={handleClose}>
          &times;
        </span>
        {message}
      </div>
    </>
  );
};

export default Alert;
