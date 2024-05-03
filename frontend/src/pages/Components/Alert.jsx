import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './alerts.module.css';

const Alert = ({ message, result }) => {
    const [showAlert, setShowAlert] = useState(true);

    // Hide the alert when the close button is clicked
    const handleClose = () => {
        setShowAlert(false);
    };

    const location = useLocation();

    return (
        <>
            {(showAlert) && (
                result ? (
                    <div className={`${styles["custom-alert"]} ${styles.success}`}>
                        <span className={styles.close} onClick={handleClose}>&times;</span>
                        {message}
                    </div>
                ) : (
                    <div className={`${styles["custom-alert"]} ${styles.error}`}>
                        <span className={styles.close} onClick={handleClose}>&times;</span>
                        {message}
                    </div>
                )

            )}
        </>
    );
};

export default Alert;
