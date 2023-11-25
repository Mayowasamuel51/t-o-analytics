import { useState, useEffect } from 'react';
import LOGO from "../assets/images/logo.jpg";
import { motion } from 'framer-motion';
import { Outlet, Link, NavLink, useLocation } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import { HiMiniXMark } from "react-icons/hi2";
import Footer from './Footer';

const NavBar = () => {
    const location = useLocation()
    const [fixed, setFixed] = useState("")
    useEffect(()=> {
        window.addEventListener('scroll', ()=> {
            const scrolldis = window.scrollY;
            scrolldis > 20 ? setFixed("fixed") : setFixed("")
        })
    }, [])
    const navBar = ()=> {
        setFixed("show")
    }
    return (
        <>
            <header className={`z-20 fixed w-full left-0 top-0 px-2 py-2 md:px-10 bg-white flex items-center justify-between`}>
                <div>
                    <Link to="/">
                        <motion.img initial={{x: -100, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{type:"spring", stiffness: 260, duration: 2000}} src={LOGO} className="md:w-[200px] w-[150px]" alt=""/>
                    </Link>
                </div>
                <nav className={`${fixed} md:relative md:left-0 duration-300 md:top-0 md:w-fit py-5 md:py-0 text-center`}>
                    <ul className="md:flex items-center gap-6 font-normal">
                        <motion.li whileHover={{scale: 1.2}} transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "font-black text-BLUE" : "scale-100 hover:text-BLUE"} to="/courses">Courses</NavLink></motion.li>
                        <motion.li whileHover={{scale: 1.2}} transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "font-black text-BLUE" : "scale-100 hover:text-BLUE"} to="/about">About</NavLink></motion.li>
                        <motion.li whileHover={{scale: 1.2}} transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "font-black text-BLUE" : "scale-100 hover:text-BLUE"} to="/blog">Blog</NavLink></motion.li>
                        <motion.li whileHover={{scale: 1.2}} transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "font-black text-BLUE" : "scale-100 hover:text-BLUE"} to="/contact">Contact</NavLink></motion.li>
                    </ul>
                </nav>
                <div className="flex items-center gap-3">
                    <Link to="/createAccount">
                        <button className="hover:outline-2 hover:outline-offset-2 border-2 border-BLUE hover:bg-transparent hover:text-BLUE duration-300 bg-BLUE text-white px-3 py-2 md:px-4 md:py-3 rounded-md md:rounded-xl font-semibold">
                            Create Account
                        </button>
                    </Link>
                    <div className="flex-1 block md:hidden hamburger">
                        {fixed === "show" ? <HiMiniXMark size={20} onClick={()=> setFixed("")} /> : <FaBarsStaggered size={20} onClick={navBar} />}
                    </div>
                </div>
            </header>
            <Outlet />

            {location.pathname === "/blog" || 
            location.pathname === "/contact" || 
            location.pathname === "/courses" ||
            location.pathname === "/courses/splunk" ? <Footer black="bg-black text-white" /> : <Footer />}
        </>
    )
}

export default NavBar