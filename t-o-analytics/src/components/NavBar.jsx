import React from 'react';
import { useState, useEffect } from 'react';
import LOGO from "../assets/images/logo.jpg";
import { motion } from 'framer-motion';
import { Outlet, Link, NavLink } from "react-router-dom";
import Footer from './Footer';

const NavBar = () => {
    const [fixed, setFixed] = useState("")
    useEffect(()=> {
        window.addEventListener('scroll', ()=> {
            const scrolldis = window.scrollY;
            if (scrolldis > 20) {
                setFixed("fixed")
            }
            else {
                setFixed("")
            }
        })
    }, [])
    return (
        <>
            <header className={`z-20 fixed w-full left-0 top-0 px-2 py-2 md:px-10 bg-white flex items-center justify-between`}>
                <div>
                    <Link to="/">
                        <img src={LOGO} className="md:w-[200px] w-[150px]" alt=""/>
                    </Link>
                </div>
                <nav className={`${fixed} md:relative md:left-0 duration-300 md:top-0 md:w-fit py-5 md:py-0 text-center`}>
                    <ul className="md:flex items-center gap-6 font-normal">
                        <motion.li whileHover={{scale: 1.2}} transition={{ stiffness:250}} className="hover:text-BLUE"><NavLink className={(isActive)=> isActive ? "scale-125" : "scale-100"} to="/courses">Courses</NavLink></motion.li>
                        <motion.li whileHover={{scale: 1.2}} transition={{ stiffness:250}} className="hover:text-BLUE"><NavLink className={(isActive)=> isActive ? "scale-125" : "scale-100"} href="about.html">About</NavLink></motion.li>
                        <motion.li whileHover={{scale: 1.2}} transition={{ stiffness:250}} className="hover:text-BLUE"><NavLink className={(isActive)=> isActive ? "scale-125" : "scale-100"} href="blog.html">Blog</NavLink></motion.li>
                        <motion.li whileHover={{scale: 1.2}} transition={{ stiffness:250}} className="hover:text-BLUE"><NavLink className={(isActive)=> isActive ? "scale-125" : "scale-100"} href="contact.html">Contact</NavLink></motion.li>
                    </ul>
                </nav>
                <div className="flex items-center gap-3">
                    <a href="createAccount.html">
                        <button className="hover:outline-2 hover:outline-offset-2 hover:outline-BLUE outline-2 hover:bg-transparent hover:text-BLUE duration-300 bg-BLUE text-white px-3 py-2 md:px-4 md:py-3 rounded-md md:rounded-2xl font-semibold">
                            Create Account
                        </button>
                    </a>
                    <div className="flex-1 block md:hidden hamburger">
                        <i className="fa-solid fa-bars text-2xl"></i>
                    </div>
                </div>
            </header>
            <Outlet />

            <Footer />
        </>
    )
}

export default NavBar