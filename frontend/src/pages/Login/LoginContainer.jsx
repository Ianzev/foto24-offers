import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LoginContainer = ({isLoginForm, isActiveProp}) => {
    const [isActive, setIsActive] = useState(isActiveProp);

    const toggleForm = () => {
        setIsActive(!isActive); // Toggle the isActive state
    };
    
    return (
        <>
        <div className='wrapper'>
        <div className={`container ${isActive ? 'active' : ''} main-container`}>
            {isLoginForm ? (
                <>
                <Login />
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-right">
                            <h1 className='h1-login'>Hello, Friend!</h1>
                            <p>You don't have an account? Register with your personal details to use all of site features</p>
                            <Link to='/register'><button className="button-form" id="register" onClick={toggleForm}>Sign Up</button></Link>
                        </div>
                    </div>
                </div>
                </>
            ) : (
                <>
                <Register />
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1 className='h1-login'>Welcome Back!</h1>
                            <p>You already have an account? Enter your personal details to use all of site features</p>
                            <Link to='/login'><button className="button-form" id="login" onClick={toggleForm} >Sign In</button></Link>
                        </div>
                    </div>
                </div>
                </>
            )}
        </div>
        </div>
        </>
       
    );
};

export default LoginContainer;
