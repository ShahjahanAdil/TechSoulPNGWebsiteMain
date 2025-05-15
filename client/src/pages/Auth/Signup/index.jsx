import React, { useEffect, useState } from 'react'
import './signup.css'
import { Link, useNavigate } from 'react-router-dom'
import { MdOutlinePrivacyTip } from 'react-icons/md'
import { FcGoogle } from "react-icons/fc";
import Loader from '../../../components/Loader'
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios'
import { useAuthContext } from '../../../contexts/AuthContext';

const initialState = { username: "", email: "", password: "" }
const generateRandomID = () => Math.random().toString(36).slice(3)

export default function Signup() {

    const { user, isAuthenticated, loginWithPopup } = useAuth0()
    const { dispatch } = useAuthContext()
    const [state, setState] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const [triggerGoogleLogin, setTriggerGoogleLogin] = useState(false)
    const navigate = useNavigate()

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleSignup = async (e) => {
        e.preventDefault()

        const { username, email, password } = state
        if (!username || !email || !password) { return window.toastify("Please fill all fields", "warning") }

        if (username.trim().length < 3) { return window.toastify("Username must be atleast 3 characters long", "error") }
        if (!window.isEmail(email)) { return window.toastify("Please enter a valid email address", "error") }
        if (password.trim().length < 6) { return window.toastify("Password must be atleast 6 characters long", "error") }

        const newUserData = {
            userID: generateRandomID(),
            username,
            email,
            password,
            status: 'active',
            role: 'user',
            plan: 'free',
            address: '',
            phone: '',
            downloads: 0,
            uploads: 0,
            points: 0
        }

        setLoading(true)
        await axios.post(`${import.meta.env.VITE_HOST}/auth/signup`, newUserData)
            .then(res => {
                const { status, data } = res
                if (status === 201) {
                    window.toastify(data.message, "success")
                    navigate('/auth/login')
                }
            })
            .catch(err => {
                const { status, data } = err.response
                console.error('Frontend POST error', err.message)
                if (status === 403) {
                    return window.toastify(data.message, "info")
                }
                window.toastify("Something went wrong while creating user", "error")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleLoginWithGoogle = async () => {
        try {
            setLoading(true);
            setTriggerGoogleLogin(true);
            await loginWithPopup({ authorizationParams: { connection: 'google-oauth2' } });
        } catch (err) {
            console.error("Google login error:", err);
            window.toastify("Google login failed", "error");
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleAuth0Login = async () => {
            if (!triggerGoogleLogin || !user || !isAuthenticated) return;

            const googleUserData = {
                userID: generateRandomID(),
                username: user.name || user.email?.split('@')[0],
                email: user.email,
                status: 'active',
                role: 'user',
                plan: 'free',
                address: '',
                phone: '',
                downloads: 0,
                uploads: 0,
                points: 0
            };

            try {
                const res = await axios.post(`${import.meta.env.VITE_HOST}/auth/google`, googleUserData);
                const { status, data } = res;
                if (status === 200 || status === 201) {
                    localStorage.setItem("pngjwt", data.token);
                    dispatch({ type: "SET_LOGGED_IN", payload: { user: data.user } });
                    window.toastify(data.message, "success");
                    navigate('/');
                }
            } catch (err) {
                console.error("Backend error:", err);
                window.toastify("Error processing Google login", "error");
            } finally {
                setLoading(false);
                setTriggerGoogleLogin(false);
            }
        };

        handleAuth0Login();
    }, [user, isAuthenticated, triggerGoogleLogin]);

    if (loading) {
        return <Loader />
    }

    return (
        <div className="auth-container w-full h-screen p-5 flex flex-col justify-center items-center bg-[#f8f8f8]">
            <div className="auth-box w-full max-w-[450px] min-h-[300px] rounded-[5px] p-5 sm:p-8 bg-white">
                <form onSubmit={handleSignup}>
                    {/* <div className='flex items-center justify-center mb-5'>
                        <img src={logo} alt="logo" className='w-[175px] sm:w-[200px]' />
                    </div> */}

                    <h2 className='!text-[22px] sm:!text-[26px] font-bold'>Register Account</h2>
                    <p className='mb-5'>Create user to continue</p>

                    <div>
                        <label className='font-bold mb-2 inline-block'>Username:</label>
                        <input type="text" name="username" id="username" placeholder='john_paul' className='w-full px-[10px] py-[8px] rounded-[5px] mb-4'
                            value={state.username} onChange={handleChange} />
                    </div>
                    <div>
                        <label className='font-bold mb-2 inline-block'>Email:</label>
                        <input type="text" name="email" id="email" placeholder='johnpaul@gmail.com' className='w-full px-[10px] py-[8px] rounded-[5px] mb-4'
                            value={state.email} onChange={handleChange} />
                    </div>
                    <div>
                        <label className='font-bold mb-2 inline-block'>Password:</label>
                        <input type="password" name="password" id="password" placeholder='Enter password' className='w-full px-[10px] py-[8px] rounded-[5px] mb-4'
                            value={state.password} onChange={handleChange} />
                    </div>

                    <button className='bg-[var(--md-dark)] text-[#fff] cursor-pointer w-full px-[10px] py-[8px] rounded-[5px] mt-5 hover:bg-[var(--dark)]' onClick={handleSignup}>SIGNUP</button>

                    <p className='text-center my-5'>- OR -</p>

                    <button type="button" className='!text-[#333] w-full flex gap-3 items-center justify-center px-[10px] py-[8px] border-2 rounded-[5px] border-gray-200 hover:!bg-[#efefefa8]' onClick={() => handleLoginWithGoogle()}>
                        <FcGoogle className='text-[18px]' /> Continue With Google
                    </button>

                    <p className='mt-4 flex items-center gap-1'><MdOutlinePrivacyTip className='text-green-600' /> Your information is secure</p>

                    <p className='mt-5'>Already have an account? <Link to='/auth/login' className='text-[var(--primary)] font-bold hover:underline'>Login now</Link></p>
                </form>
            </div>
        </div>
    )
}