import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './alerts.css';

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
                    <div className="custom-alert success">
                        <span className="close" onClick={handleClose}>&times;</span>
                        {message}
                    </div>
                ) : (
                    <div className="custom-alert error">
                        <span className="close" onClick={handleClose}>&times;</span>
                        {message}
                    </div>
                )

            )}
        </>
    );
};

export default Alert;
