import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LOGO from "../assets/images/logo.jpg";
import GOOGLE from "../assets/images/google.png";
import FACEBOOK from "../assets/images/facebook.png";
// import APPLE from "../assets/images/apple.png";
import { FaXmark } from "react-icons/fa6";
import { FaApple } from "react-icons/fa";
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { app } from "../../firebase.config";
import { getIdToken, GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { useStateContext } from '../context/ContextProvider';

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
const LoginForm = () => {
    const { setToken, setUser } = useStateContext();
    const [error, setError] = useState(null)
    const [checkpassword, setCheckPassword] = useState(null)
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
    const schema = yup.object().shape({
        password: yup.string().required(),
        email: yup.string().required(),
    });
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
    })
    const onSubmit = (data) => {
        console.log(data)
        const payload = {
            password: data.password,
            email: data.email
        }
        fetch('https://to-backendapi-v1.vercel.app/api/login', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        }).then((res) => {
            // return res.json()
            if (res.status === 401) {
                console.log(res)
                console.log(res.data.message)
                setError(res.data.message)
            } else if (res.status === 403) {
                console.log(res)
                setCheckPassword(res.message)
                setError(res.message)
            }
        }).then((res) => {
            setUser(res.data)
            setToken(res.token)
            console.log(res)
        }).catch(err => {
            console.log(err)
            const response = err.response;
            if (response === 401) {
                console.log(response)
                console.log(response.data.message)
                setError(response.data.message)
            } else if (response === 403) {
                console.log(response)
                setCheckPassword(response.message)
                setError(response.message)
            }


        })
        // axios.post('https://to-backendapi-v1.vercel.app/api/login', payload, {
        //     headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json"
        //     }
        // }).then((res) => {
        //     setUser(res.data.data)
        //     console.log(res.data.token)
        //     setToken(res.data.token)
        // }).catch(err => {
        //     const response = err.response
        //     console.log(response)
        //     if (response.status === 401) {
        //         console.log(response)
        //         console.log(response.data.message)
        //         setError(response.data.message)
        //     } else if (response.status === 403) {
        //         console.log(response)
        //         setCheckPassword(response.data.message)
        //         setError(response.data.message)
        //     }

        // })

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
                        <Link to="/"><img src={LOGO} className="w-[150px] pl-0" alt="" /></Link>
                    </div>
                    <Link to="/">
                        <FaXmark size={30} />
                    </Link>
                </div>
                <p className="font-bold">Welcome Back!</p>
                <p className="text-sm md:text-base text-slate-400">Enter Your details to continue</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mt-8 flex flex-col gap-3 font-medium' >
                        {error ? <h2 className='text-red-600'>{error}</h2> : "    "}
                    </div>
                    <div className="my-4">
                        <label className="font-bold" htmlFor="email">Email Address
                            <input name="email"
                                {...register("email", { required: true })} type="text" id="" className="text-base pl-2 h-10 rounded-xl w-full border-2 border-inputColor bg-inputColor" />
                        </label>
                        <p className='text-red-600'>{errors.email?.message}</p>
                    </div>
                    <div className="my-4">
                        <label className="font-bold" htmlFor="password">Password
                            <input   {...register("password", { required: true })} type="password" name="password" id="" className="text-base pl-2 h-10 rounded-xl w-full border-2 border-inputColor bg-inputColor" />
                        </label>
                        <p className='text-red-600'>{errors.password?.message}</p>
                    </div>
                    <p className="text-right my-4 font-bold"><a href="forgotPassword.html" className="text-BLUE">Forgot Password?</a></p>
                    <button type="submit" className="w-full rounded-xl hover:text-BLUE border-2 hover:bg-transparent border-BLUE duration-300 bg-BLUE py-2 font-semibold text-white text-base md:text-xl">Login</button>
                    <p className='text-center font-extralight py-1'>or</p>
                </form>
                <div className='login-options flex flex-col gap-3 font-medium'>
                    <button onClick={loginwihGoogle} className='flex items-center justify-center gap-2 border-[1px] border-black rounded-3xl py-2 hover:bg-black hover:text-white duration-300'><img src={GOOGLE} alt="" className='w-5' />Continue with Google</button>
                    <button className='flex items-center justify-center gap-2 border-[1px] border-black rounded-3xl py-2 hover:text-white duration-300'><img src={FACEBOOK} alt="" className='w-5' />Continue with Facebook</button>
                    <button className='flex items-center justify-center gap-2 border-[1px] border-black rounded-3xl py-2 hover:text-white duration-300'><FaApple size={20} />Continue with Apple ID</button>
                </div>
                <p className="text-sm md:text-base mt-4 font-semibold ">Don't have an account? <Link className="underline underline-offset-2 text-BLUE" to="/createAccount">Create Account</Link></p>
            </motion.div>
        </section>
    )
}

export default LoginForm;