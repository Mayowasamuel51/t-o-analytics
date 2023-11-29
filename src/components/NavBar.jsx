import { useState, useEffect } from 'react';
import LOGO from "../assets/images/logo.jpg";
import { motion } from 'framer-motion';
import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import { MdOutlineAddShoppingCart } from "react-icons/md"


const NavBar = () => {
    const [fixed, setFixed] = useState("")

    const [cartItemNo, setCartItemNo] = useState([])
    useEffect(()=> { 
        window.addEventListener('scroll', ()=> {
            const scrolldis = window.scrollY;
            scrolldis > 20 ? setFixed("fixed") : setFixed("")
        })
    }, [])
    useEffect(()=> {
        const data = JSON.parse(localStorage.getItem("COURSE-CART")) || []
        setCartItemNo(data)
    }, [cartItemNo])
    const navBar = ()=> {
        setFixed("show")
    }
    return (
        <>
            <header className={`z-20 fixed w-full left-0 top-0 bg-white px-2 py-2 md:px-10 flex items-center justify-between`}>
                <div>
                    <Link to="/">
                        <motion.img initial={{x: -100, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{type:"spring", stiffness: 260, duration: 2000}} src={LOGO} className="md:w-[200px] w-[130px]" alt=""/>
                    </Link>
                </div>
                <nav className={`navlinks ${fixed} md:relative md:left-0 duration-300 md:top-0 md:w-fit py-5 md:py-0 text-center`}>
                    <ul className="md:flex items-center gap-6 font-normal">
                        <motion.li whileHover={{scale: 1.2}} transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "font-black text-BLUE" : "scale-100 hover:text-BLUE"} to="/courses">Courses</NavLink></motion.li>
                        <motion.li whileHover={{scale: 1.2}} transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "font-black text-BLUE" : "scale-100 hover:text-BLUE"} to="/about">About</NavLink></motion.li>
                        <motion.li whileHover={{scale: 1.2}} transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "font-black text-BLUE" : "scale-100 hover:text-BLUE"} to="/blog">Blog</NavLink></motion.li>
                        <motion.li whileHover={{scale: 1.2}} transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "font-black text-BLUE" : "scale-100 hover:text-BLUE"} to="/contact">Contact</NavLink></motion.li>
                    </ul>
                </nav>
                <div className="flex items-center gap-3">
                    <Link to="/createAccount">
                        <button className="hover:outline-2 hover:outline-offset-2 border-2 border-BLUE hover:bg-transparent hover:text-BLUE duration-300 bg-BLUE text-white px-1 py-1 md:px-4 md:py-3 rounded-md md:rounded-xl font-semibold">
                            Create Account
                        </button>
                    </Link>
                    <div className="flex flex-1 items-center gap-3">
                        <Link to="/checkout">
                            <div className='relative cursor-pointer group'>
                                <MdOutlineAddShoppingCart size={30} />
                                <p className="top-[-10px] group-hover:scale-[1.3] duration-200 ease-in-out right-[-10px] absolute text-white font-bold border-2 border-white px-2 rounded-full bg-BLUE" >{cartItemNo.length}</p>
                            </div>
                        </Link>
                        <div className="flex-1 block md:hidden hamburger">
                            {fixed === "show" ? <FaXmark size={20} onClick={()=> setFixed("")} /> : <FaBarsStaggered size={20} onClick={navBar} />}
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default NavBar