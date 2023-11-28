import { useState, useEffect } from 'react';
import LOGO from "../assets/images/logo.jpg";
import { motion } from 'framer-motion';
import { Outlet, Link, NavLink, useLocation } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import { MdOutlineAddShoppingCart } from "react-icons/md"
import { FaSearch } from "react-icons/fa";
import { HiMiniXMark } from "react-icons/hi2";
// import Footer from './Footer';

const AuthNavBar = ({ signout }) => {
    
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
        <header className={`z-20 fixed w-full left-0 top-0 px-2 py-2 md:px-10 bg-white flex items-center gap-10`}>
            <div>
                <Link to="/">
                    <motion.img initial={{x: -100, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{type:"spring", stiffness: 260, duration: 2000}} src={LOGO} className="md:w-[200px] w-[150px]" alt=""/>
                </Link>
            </div>
            <div className='relative search-box'>
                <FaSearch className='absolute' />
                <input type="text" placeholder='Search for anything ' name="search" id="search" className='border-2 border-black w-full h-10 rounded-3xl flex-grow-[3]' />
            </div>
            <nav className={`${fixed} md:relative md:left-0 duration-300 md:top-0 md:w-fit py-5 md:py-0 text-center`}>
                <ul className="md:flex items-center gap-6 font-normal">
                    <motion.li whileHover={{scale: 1.1}} transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "text-black" : "scale-100 hover:text-BLUE"} to="">My Learning</NavLink></motion.li>
                    {/* <motion.li whileHover={{scale: 1.1}} transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "text-black" : "scale-100 hover:text-BLUE"} to="">Rules</NavLink></motion.li> */}
                    <motion.li whileHover={{scale: 1.1}} transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "text-black" : "scale-100 hover:text-BLUE"} to="">Mentorship</NavLink></motion.li>
                    <motion.li whileHover={{scale: 1.1}} transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "text-black" : "scale-100 hover:text-BLUE"} to="">Link</NavLink></motion.li>
                    {/* <motion.li whileHover={{scale: 1.1}} transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "text-black" : "scale-100 hover:text-BLUE"} to="">Payment History</NavLink></motion.li> */}
                    <button onClick={signout} className="my-3 hover:outline-2 hover:outline-offset-2 border-2 border-BLUE hover:bg-transparent hover:text-BLUE duration-300 bg-BLUE text-white px-2 py-1 md:px-3 md:py-2 rounded-md md:rounded-xl font-semibold">
                        Sign Out
                    </button>
                </ul>
            </nav>
            <div className="flex flex-1 items-center gap-3">
                <MdOutlineAddShoppingCart size={30} />
                <div className="flex-1 block md:hidden hamburger">
                    {fixed === "show" ? <HiMiniXMark size={20} onClick={()=> setFixed("")} /> : <FaBarsStaggered size={20} onClick={navBar} />}
                </div>
            </div>
        </header>
  )
}

export default AuthNavBar