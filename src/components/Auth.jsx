import React, { useState } from 'react';

import Cookies from 'universal-cookie';
import axios from 'axios';
import signInImage from '../assets/signup.jpg';

const initState = {
    fullName: '',
    username: '',
    password: '',
    confirmedPassword: '',
    phoneNumber: '',
    avatarURL: '',
}

const Auth = () => {
    const [form, setForm] = useState(initState);
    const [isSignup, setIsSignup] = useState(true);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const switchMode = () => {
        setIsSignup((previousIsSignup) => !previousIsSignup);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { fullName, username, password, phoneNumber, avatarURL } = form;

        const URL = "http://localhost:4000/auth/" + [isSignup ? "signup" : "login"];

        const { data } = await axios.post(`${URL}/`, {
            username, password, fullName, phoneNumber, avatarURL
        });

        console.log(data)


    }

    return (
        <div className='auth__form-container'>
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{isSignup ? 'Signup' : 'Signin'}</p>
                    <form action="" onSubmit={handleSubmit} >
                        {
                            isSignup && (
                                <div className="auth__form-container_fields-content_input">
                                    <input name="fullName" type="text" placeholder='Full Name' onChange={handleChange} />
                                </div>
                            )
                        }
                        <div className="auth__form-container_fields-content_input">
                            <input name="username" type="text" placeholder='Username' required onChange={handleChange} />
                        </div>
                        {
                            isSignup && (
                                <div className="auth__form-container_fields-content_input">
                                    <input name="phoneNumber" type="text" placeholder='Phone Number' onChange={handleChange} />
                                </div>
                            )
                        }
                        {
                            isSignup && (
                                <div className="auth__form-container_fields-content_input">
                                    <input name="avatarURL" type="text" placeholder='Avatar ' onChange={handleChange} />
                                </div>
                            )
                        }
                        <div className="auth__form-container_fields-content_input">
                            <input name="password" type="password" placeholder='Password' required onChange={handleChange} />
                        </div>
                        {
                            isSignup && (
                                <div className="auth__form-container_fields-content_input">
                                    <input name="confirmedPassword" type="password" placeholder='Confirm Password' onChange={handleChange} />
                                </div>
                            )
                        }
                        <div className="auth__form-container_fields-content_button">
                            <button>
                                {
                                    isSignup ? "Sign up" : "Signin"
                                }
                            </button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignup ? 'Already have an account?' : 'Do not have an account?'}
                            <span onClick={switchMode}>
                                {isSignup ? ' Sign in' : ' Sign up'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="auth__form-container_image">
                <img src={signInImage} alt="sign in" />
            </div>
        </div>
    )
}

export default Auth