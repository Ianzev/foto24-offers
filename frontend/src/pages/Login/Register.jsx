import './style.css';
import React, { useState } from 'react';

function Register(){
    return(
        <div className="form-container sign-up">
            <form>
                <h1 className='h1-login'>Create Account</h1>
                <span>or use your email for registeration</span>
                <input type="text" placeholder="Name"/>
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <button>Sign Up</button>
            </form>
        </div>
    );
};

export default Register;