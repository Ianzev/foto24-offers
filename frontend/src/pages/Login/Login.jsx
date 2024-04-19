import './style.css';
import React, { useState } from 'react';

function Login(){
    return(
        <div className="form-container sign-in">
            <form>
                <h1 className='h1-login'>Sign In</h1>
                <span>or use your email password</span>
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <a href="#">Forget Your Password?</a>
                <button>Sign In</button>
            </form>
        </div>
    );
};

export default Login;