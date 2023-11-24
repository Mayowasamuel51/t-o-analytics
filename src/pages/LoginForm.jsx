import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LOGO from "../assets/images/logo.jpg";
import GOOGLE from "../assets/images/google.png";
import FACEBOOK from "../assets/images/facebook.png";
import APPLE from "../assets/images/apple.png";

const formVariant = {
    initial: {
        opacity: 0
    },
    animate: {
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
    <section className="min-h-screen flex justify-center items-center bg-black opacity-80">
        <motion.div variants={formVariant} initial="initial" animate="animate" exit={{ x:-100,}} className="border-2 border-black md:w-[400px] p-5 bg-white rounded-3xl">
            <div className="flex items-center justify-between">
                <div>
                    <img src={LOGO} className="w-[150px] pl-0" alt=""/>
                </div>
                <a href="index.html">
                    <i className="fa-solid fa-xmark text-2xl"></i>
                </a>
            </div>
            <p className="font-bold">Welcome Back!</p>
            <p className="text-sm md:text-base text-slate-400">Enter Your details to continue</p>
            <form action="">
                <div className="my-4">
                    <label className="font-bold" htmlFor="email">Email Address
                        <input type="text" name="email" id="" className="text-base pl-2 h-10 rounded-xl w-full border-2 border-inputColor bg-inputColor"/>
                    </label>
                </div>
                <div className="my-4">
                    <label className="font-bold" htmlFor="password">Password
                        <input type="password" name="password" id="" className="text-base pl-2 h-10 rounded-xl w-full border-2 border-inputColor bg-inputColor"/>
                    </label>
                </div>
                <p className="text-right my-4 font-bold"><a href="forgotPassword.html" className="text-BLUE">Forgot Password?</a></p>
                <button type="submit" className="w-full rounded-xl hover:text-BLUE border-2 hover:bg-transparent border-BLUE duration-300 bg-BLUE py-2 font-semibold text-white text-base md:text-xl">Login</button>
                <p className='text-center font-extralight py-1'>or</p>
                <div className='flex flex-col gap-3 font-medium'>
                    <button className='flex items-center justify-center gap-2 border-[1px] border-black rounded-3xl py-2'><img src={GOOGLE} alt="" className='w-5' />Continue with Google</button>
                    <button className='flex items-center justify-center gap-2 border-[1px] border-black rounded-3xl  py-2'><img src={FACEBOOK} alt="" className='w-5' />Continue with Facebook</button>
                    <button className='flex items-center justify-center gap-2 border-[1px] border-black rounded-3xl  py-2'><img src={APPLE} alt="" className='w-5' />Continue with Apple ID</button>
                </div>
            </form>
            <p className="text-sm md:text-base mt-4 font-semibold ">Don't have an account? <Link className="underline underline-offset-2 text-BLUE" to="/createAccount">Create Account</Link></p>
        </motion.div>
    </section>
  )
}

export default LoginForm