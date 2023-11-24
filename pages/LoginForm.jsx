import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LOGO from "../assets/images/logo.jpg";

const formVariant = {
    initial: {
        scale: 0,
        opacity: 0
    },
    animate: {
        scale: 1,
        opacity: 1,
        transition:{
            type: "spring", stiffness: 180, duration: 1000
        }
    },
    exit: {
        x: "-1000px",
        opacity: 0,
    }
}

const LoginForm = () => {
  return (
    <section class="min-h-screen flex justify-center items-center bg-black opacity-80">
        <motion.div variants={formVariant} initial="initial" animate="animate" exit={{ x:-100,}} class="border-2 border-black md:w-[400px] p-5 bg-white rounded-3xl">
            <div class="flex items-center justify-between">
                <div>
                    <img src={LOGO} class="w-[150px] pl-0" alt=""/>
                </div>
                <a href="index.html">
                    <i class="fa-solid fa-xmark text-2xl"></i>
                </a>
            </div>
            <p class="font-bold">Welcome Back!</p>
            <p class="text-sm md:text-base text-slate-400">Enter Your details to continue</p>
            <form action="">
                <div class="my-4">
                    <label class="font-bold" for="email">Email Address
                        <input type="text" name="email" id="" class="text-base pl-2 h-10 rounded-xl w-full border-2 border-inputColor bg-inputColor"/>
                    </label>
                </div>
                <div class="my-4">
                    <label class="font-bold" for="password">Password
                        <input type="password" name="password" id="" class="text-base pl-2 h-10 rounded-xl w-full border-2 border-inputColor bg-inputColor"/>
                    </label>
                </div>
                <p class="text-right my-4 font-bold"><a href="forgotPassword.html" class="text-BLUE">Forgot Password?</a></p>
                <button type="submit" class="w-full rounded-xl hover:text-BLUE border-2 hover:bg-transparent border-BLUE duration-300 bg-BLUE py-2 font-semibold text-white text-base md:text-xl">Login</button>
            </form>
            <p class="text-sm md:text-base mt-4 font-semibold ">Don't have an account? <Link class="underline underline-offset-2 text-BLUE" to="/createAccount">Create Account</Link></p>
        </motion.div>
    </section>
  )
}

export default LoginForm