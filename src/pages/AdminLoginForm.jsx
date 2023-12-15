import { Link, Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LOGO from "../assets/images/logo.jpg";
import GOOGLE from "../assets/images/google.png";
import { FaXmark } from "react-icons/fa6";
import { useEffect, useRef, useState } from 'react';

const AdminLoginForm = () => {
  return (
    <section className="min-h-screen flex justify-center items-center bg-black opacity-80">
            <motion.div initial="initial" animate="animate" exit={{ x: -100, }} className="border-2 border-black md:w-[400px] p-5 bg-white rounded-3xl">
                <div className="flex items-center justify-between">
                    <div>
                        <Link to="/"><img src={LOGO} className="w-[150px] pl-0" alt="" /></Link>
                    </div>
                    <Link to="/">
                        <FaXmark size={30} />
                    </Link>
                </div>
                <p className="font-bold">Welcome Admin!</p>
                <p className="text-sm md:text-base text-slate-400">Enter Your details to continue</p>
                <form>
                    <div className="my-4">
                        <label className="font-bold" htmlFor="email">Email Address
                            <input name="email" type="text" id="" className="text-base pl-2 h-10 rounded-xl w-full border-2 border-inputColor bg-inputColor" />
                        </label>
                    </div>
                    <div className="my-4">
                        <label className="font-bold" htmlFor="password">Password
                            <input type="password" name="password" id="" className="text-base pl-2 h-10 rounded-xl w-full border-2 border-inputColor bg-inputColor" />
                        </label>
                    </div>
                    <button type="submit" className="w-full rounded-xl hover:text-BLUE border-2 hover:bg-transparent border-BLUE duration-300 bg-BLUE py-2 font-semibold text-white text-base md:text-xl">Login</button>
                </form>
            </motion.div>
        </section>
  )
}

export default AdminLoginForm;