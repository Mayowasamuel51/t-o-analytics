import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LOGO from "../assets/images/logo.jpg";
import GOOGLE from "../assets/images/google.png";
import FACEBOOK from "../assets/images/facebook.png";
import APPLE from "../assets/images/apple.png";
import { HiMiniXMark } from "react-icons/hi2";
import { app } from "../../firebase.config";
import { useForm } from "react-hook-form"
import { getIdToken, GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { useStateContext } from '../context/ContextProvider';
import axiosclinet from "../layoutAuth/axios/axios-clinet"
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"



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
    const [error, setError] = useState(null)
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
        name: yup.string().required(),
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
            name: data.name,
            password: data.password,
            email: data.email
        }
        fetch('https://to-backendapi-v1.vercel.app/api/sighup', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json",
            },
        }).then((res) => {
            return res.json()
        }).then((res) => {
            setUser(res.data)
            setToken(res.token)
            console.log(res)
        }).catch(err => {
            console.log(err)
            const response = err.response
            if (response === 422) {
                console.log(response)
                console.log(response.message)
                setError(response.message)
            }

        })
        // axios.post('https://to-backendapi-v1.vercel.app/api/sighup', payload, {
        //     headers: {
        //         "Accept":"application/json",
        //         "Content-Type":"application/json",
        //     },
        // }).then((res) => {
        //     setUser(res.data.data)
        //     console.log(res.data.token)
        //     setToken(res.data.token)
        // }).catch(err => {
        //     const response = err.response
        //     if (response.status === 422) {
        //         console.log(response)
        //         console.log(response.data.message)
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
                        <Link to="/"><img src={LOGO} className="w-[150px] h-[50px] object-cover" alt="" /></Link>
                    </div>
                    <Link to="/">
                        <HiMiniXMark size={30} />
                    </Link>
                </div>
                <p className="font-bold">Please fill in your details to get started</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="my-4">
                        <label className="font-bold" htmlFor="name">Name
                            <input name="name"
                                {...register("name", { required: true })} type="text" id="name" className="text-base pl-2 h-10 rounded-xl w-full border-2 border-inputColor bg-inputColor" />
                        </label>
                        <p className='text-red-600'>{errors.name?.message}</p>
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
                            <input name="password"
                                {...register("password", { required: true })} type="password" id="" className="text-base pl-2 h-10 rounded-xl w-full border-2 border-inputColor bg-inputColor" />
                        </label>
                        <p className='text-red-600'>{errors.password?.message}</p>
                    </div>
                    <button type="submit" className="w-full rounded-xl hover:text-BLUE border-2 hover:bg-transparent border-BLUE duration-300 bg-BLUE py-2 font-semibold text-white text-base md:text-xl">Create Account</button>
                    <p className='text-center font-extralight py-1'>or</p>

                </form>
                <div className='flex flex-col gap-3 font-medium'>
                    <button onClick={loginwihGoogle} className='flex items-center justify-center gap-2 border-[1px] border-black rounded-2xl py-1'><img src={GOOGLE} alt="" className='w-5' />Continue with Google</button>
                    <button className='flex items-center justify-center gap-2 border-[1px] border-black rounded-2xl py-1'><img src={FACEBOOK} alt="" className='w-5' />Continue with Facebook</button>
                    <button className='flex items-center justify-center gap-2 border-[1px] border-black rounded-2xl py-1'><img src={APPLE} alt="" className='w-5' />Continue with Apple ID</button>
                </div>
                <p className="text-sm md:text-base mt-4 font-semibold ">Already have an account? <Link className="underline underline-offset-2 text-BLUE" to="/login">Log In</Link></p>
            </motion.div>
        </section>
    )
}

export default CreateAccountForm