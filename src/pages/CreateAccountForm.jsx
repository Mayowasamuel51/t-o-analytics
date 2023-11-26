import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LOGO from "../assets/images/logo.jpg";
import GOOGLE from "../assets/images/google.png";
import FACEBOOK from "../assets/images/facebook.png";
import APPLE from "../assets/images/apple.png";
import { app } from "../../firebase.config";
import { getIdToken, GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { useStateContext } from '../context/ContextProvider';
import axiosclinet from "../layoutAuth/axios/axios-clinet"
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
const formVariant = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            type: "spring", stiffness: 180, duration: 1000
        }
    },
    exit: {
        x: "-1000px",
        opacity: 0,
    }
}

const CreateAccountForm = () => {
    const { setToken, setUser } = useStateContext();
    const nameRef = useRef();
    const [error, setError] = useState(null)
    const emailRef = useRef();
    const passwordRef = useRef();
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const loginwihGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                setToken(loggedInUser)
            }).catch(error => {
                console.log('error', error.message);
            })
    }
    const formSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name: nameRef.current.value,
            password: passwordRef.current.value,
            email: emailRef.current.value
        }
        axios.post('http://localhost:8000/api/sighup',payload,{
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }).then((res) => {
            setUser(res.data.data)
            console.log(res.data.token)
            setToken(res.data.token)
        }).catch(err => {
            console.log(payload)
            console.log(err.message)
            const response = err.response;
            console.log(response)
            if (response && response.status === 422) {
                // response.data.errors
                console.log(response.data.errors)
                setError(response.data.errors)
            }
        })

    }
    useEffect(() => {
        auth.onAuthStateChanged((loggedInUser) => {
            if (loggedInUser) {
                loggedInUser.getIdToken().then((token) => {
                    console.log(token)
                    window.localStorage.setItem("ACCESS_TOKEN", token)
                    setToken(token)
                }).catch((err) => console.log(err.message))
            }
        })
    }, [])

    return (
        <section className="min-h-screen flex justify-center items-center bg-black opacity-80">
            <motion.div variants={formVariant} initial="initial" animate="animate" exit={{ x: -100, }} className="border-2 border-black md:w-[400px] p-5 bg-white rounded-3xl">
                <div className="flex items-center justify-between">
                    <div>
                        <Link to="/"><img src={LOGO} className="w-[150px] h-[50px] object-cover" alt="" /></Link>
                    </div>
                    <a href="index.html">
                        <i className="fa-solid fa-xmark text-2xl"></i>
                    </a>
                </div>
                <p className="font-bold">Please fill in your details to get started</p>
                <form onSubmit={formSubmit}>
                    <div className="my-4">
                        <label className="font-bold" htmlFor="name">Name
                            <input ref={nameRef} type="text" name="" id="name" className="text-base pl-2 h-10 rounded-xl w-full border-2 border-inputColor bg-inputColor" />
                        </label>
                    </div>
                    <div className="my-4">
                        <label className="font-bold" htmlFor="email">Email Address
                            <input ref={emailRef} type="text" name="email" id="" className="text-base pl-2 h-10 rounded-xl w-full border-2 border-inputColor bg-inputColor" />
                        </label>
                    </div>
                    <div className="my-4">
                        <label className="font-bold" htmlFor="password">Password
                            <input ref={passwordRef} type="password" name="password" id="" className="text-base pl-2 h-10 rounded-xl w-full border-2 border-inputColor bg-inputColor" />
                        </label>
                    </div>
                    <button type="submit" className="w-full rounded-xl hover:text-BLUE border-2 hover:bg-transparent border-BLUE duration-300 bg-BLUE py-2 font-semibold text-white text-base md:text-xl">Create Account</button>
                    <p className='text-center font-extralight py-1'>or</p>

                </form>
                <div className='flex flex-col gap-3 font-medium'>
                    <button onClick={loginwihGoogle} className='flex items-center justify-center gap-2 border-[1px] border-black rounded-3xl py-2'><img src={GOOGLE} alt="" className='w-5' />Continue with Google</button>
                    <button className='flex items-center justify-center gap-2 border-[1px] border-black rounded-3xl  py-2'><img src={FACEBOOK} alt="" className='w-5' />Continue with Facebook</button>
                    <button className='flex items-center justify-center gap-2 border-[1px] border-black rounded-3xl  py-2'><img src={APPLE} alt="" className='w-5' />Continue with Apple ID</button>
                </div>
                <p className="text-sm md:text-base mt-4 font-semibold ">Already have an account? <Link className="underline underline-offset-2 text-BLUE" to="/login">Log In</Link></p>
            </motion.div>
        </section>
    )
}

export default CreateAccountForm