import { useState, useEffect } from 'react';
import LOGO from "../assets/images/logo.jpg";
import { FaSearch } from "react-icons/fa";
import { motion } from 'framer-motion';
import { useStateContext } from "../context/ContextProvider"
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import { MdOutlineAddShoppingCart } from "react-icons/md"
import { getAuth, signOut } from "firebase/auth";
import { app } from "../../firebase.config";
import FetchAllStudents from '../hook/FetchAllStudents';


const NavBar = () => {
    const { data } = FetchAllStudents()
    // const navigate = useNavigate()
    const [fixed, setFixed] = useState("")
    const [show, setShow] = useState("")
    const [cartItem, setCartItem] = useState(()=> {
        let data = JSON.parse(localStorage.getItem("COURSE-CART")) ?? []
        return data
    })
    const { token, setToken } = useStateContext();
    const [localuser, setUser] = useState("")
    const auth = getAuth(app);
    const signout = () => {
        signOut(auth).then((user) => {
            window.localStorage.removeItem("ACCESS_TOKEN")
            window.localStorage.removeItem("user")
            setToken(null)
        }).catch((err) => console.log(err.message))
    }
    useEffect(()=> {
        const data = JSON.parse(localStorage.getItem("COURSE-CART")) || []
        setCartItem(data)
    }, [])
    useEffect(()=> {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            scrollY > 20 ? setFixed("fixed") : setFixed("");
          };
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])
    useEffect(()=> {
        const loggedinUuser = (localStorage.getItem("user"))
        if (loggedinUuser) {
          setUser(loggedinUuser);
        }
        else return
    }, [])

    const currentlyLoggedInUSer = data?.data?.response.find((user)=> user.email === localuser)
    const fullname = currentlyLoggedInUSer?.name
    const email = currentlyLoggedInUSer?.email

    const initial = currentlyLoggedInUSer?.name.split(" ").map((word)=> word.charAt(0).toUpperCase()).join("")
    
    const navBar = ()=> {
        setShow("show")
    }
    return (
        <>
            <header className={`z-20 fixed w-[100%] right-0 left-0 top-0 bg-white px-2 py-2 md:px-10 flex items-center ${token ? "gap-10" : "justify-between"}`}>
                <div>
                    <Link to="/">
                        <motion.img initial={{x: -100, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{type:"spring", stiffness: 260, duration: 2000}} src={LOGO} className="md:w-[200px] w-[130px]" alt=""/>
                    </Link>
                </div>
                {token && <div className='relative search-box'>
                    <FaSearch className='absolute' />
                    <input type="text" name="search" id="search" className='border-[1px] md:border-2 border-black w-full h-10 rounded-sm md:rounded-xl placeholder:font-semibold' placeholder='Search for anything' />
                </div>}
                {token ? 
                <nav className={`navlinks ${show} auth-nav md:relative md:left-0 md:right-0 duration-300 md:top-0 md:w-fit py-5 md:py-0 text-center`}>
                    <div className='pl-2 block lg:hidden text-left'>
                        <Link to="/myProfile">
                            <div className='flex items-center gap-3'>
                                <div className='animate-bounce flex justify-center items-center w-8 md:text-lg aspect-square text-white font-black bg-BLUE rounded-full'>{initial}</div>
                                <div>
                                    <p className='font-semibold text-md'>{fullname}</p>
                                    <p className='font-semibold text-xs text-slate-400'>{email}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <ul className="md:flex items-center gap-3 md:gap-6 font-normal text-sm">
                        <motion.li whileHover={{scale: 1.1}} transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "text-BLUE font-black" : "scale-100 hover:text-BLUE"} to="/dashboard">My Courses</NavLink></motion.li>
                        <motion.li whileHover={{scale: 1.1}} transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "text-BLUE font-black" : "scale-100 hover:text-BLUE"} to="/courses">All Courses</NavLink></motion.li>
                        <motion.li whileHover={{scale: 1.1}} transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "text-BLUE font-black" : "scale-100 hover:text-BLUE"} to="mentorship">Mentorship</NavLink></motion.li>
                        <motion.li whileHover={{scale: 1.1}} transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "text-BLUE font-black" : "scale-100 hover:text-BLUE"} to="/dashboard/links">Links</NavLink></motion.li>
                        <button onClick={signout} className="md:hidden block my-3 hover:outline-2 hover:outline-offset-2 border-2 border-BLUE hover:bg-transparent hover:text-BLUE duration-300 bg-BLUE text-white px-2 py-1 md:px-3 md:py-2 rounded-md md:rounded-xl font-semibold mx-auto">
                            Sign Out
                        </button>
                    </ul>
                </nav>
                :
                <nav className={`navlinks ${fixed} ${show} md:relative md:left-0 md:right-0 duration-300 md:top-0 md:w-fit py-5 md:py-0 text-center`}>
                    <ul className="md:flex items-center gap-6 font-semibold">
                        <motion.li whileHover={{scale: 1.2}} transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "font-black text-BLUE" : "scale-100 hover:text-BLUE"} to="/courses">Courses</NavLink></motion.li>
                        <motion.li whileHover={{scale: 1.2}} transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "font-black text-BLUE" : "scale-100 hover:text-BLUE"} to="/about">About</NavLink></motion.li>
                        <motion.li whileHover={{scale: 1.2}} transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "font-black text-BLUE" : "scale-100 hover:text-BLUE"} to="/blog">Blog</NavLink></motion.li>
                        <motion.li whileHover={{scale: 1.2}} transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "font-black text-BLUE" : "scale-100 hover:text-BLUE"} to="/contact">Contact</NavLink></motion.li>
                        <Link to="/createAccount" className='md:hidden block'>
                            <button className="border-2 border-BLUE hover:bg-transparent hover:text-BLUE duration-300 bg-BLUE text-white px-1 py-1 md:px-4 md:py-3 rounded-md md:rounded-3xl font-semibold">
                                Create Account
                            </button>
                        </Link>
                    </ul>
                </nav>}
                <div className="flex items-center gap-3">
                    {!token &&
                    <Link to="/createAccount" className='md:block hidden'>
                        <button className="border-2 border-BLUE hover:bg-transparent hover:text-BLUE duration-300 bg-BLUE text-white px-1 py-1 md:px-4 md:py-3 rounded-md md:rounded-3xl font-semibold">
                            Create Account
                        </button>
                    </Link>}
                    <div className="flex items-center gap-3">
                        <Link to="/checkout">
                            <div className='relative cursor-pointer group'>
                                <MdOutlineAddShoppingCart size={30} />
                                <p className="top-[-10px] group-hover:scale-[1.3] duration-200 ease-in-out right-[-10px] absolute text-white font-bold border-2 border-white px-2 rounded-full bg-BLUE z-10" >
                                    {cartItem ? cartItem?.length : "0" }</p>
                                <div className="top-[-6px] group-hover:animate-ping duration-200 ease-in-out right-[-6px] absolute w-5 aspect-square rounded-full bg-BLUE z-[1]" ></div>
                                {cartItem.length > 0 && <div className="top-[-6px] right-[-6px] animate-ping duration-200 ease-in-out absolute w-5 aspect-square rounded-full bg-BLUE z-[1]" ></div>}
                            </div>
                        </Link>
                        <div className="flex-1 block md:hidden hamburger">
                            {show === "show" ? <FaXmark size={20} onClick={()=> setShow("")} /> : <FaBarsStaggered size={20} onClick={navBar} />}
                        </div>
                        {token && 
                        <div className=' flex-1 md:block hidden group'>
                            <div className='w-8 md:text-lg aspect-square text-white flex justify-center items-center font-black bg-BLUE rounded-full'>{initial}</div>
                            <div className='invisible opacity-0 group-hover:visible group-hover:opacity-100 duration-300 absolute rounded-lg w-[250px] right-[20px] top-16 bg-white shadow-lg'>
                                <div className='p-3 flex items-center gap-3 border-b-2 border-textColor'>
                                    <div className='group-hover:animate-bounce w-8 aspect-square text-white flex justify-center items-center font-black  border-2 bg-BLUE rounded-full'>{initial}</div>
                                    <div>
                                        <p className='font-semibold text-md'>{fullname}</p>
                                        <p className='font-semibold text-xs text-slate-400'>{email}</p>
                                    </div>
                                </div>
                                <ul className='font-semibold p-3 leading-[30px]'>
                                    <motion.li transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "text-black font-black" : "scale-100 hover:text-BLUE"} to="/myProfile">My Profile</NavLink></motion.li>
                                    <motion.li transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "text-black font-black" : "scale-100 hover:text-BLUE"} to="/dashboard">My Courses</NavLink></motion.li>
                                    <motion.li transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "text-black font-black" : "scale-100 hover:text-BLUE"} to="/courses">All Courses</NavLink></motion.li>
                                    <motion.li transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "text-black font-black" : "scale-100 hover:text-BLUE"} to="/mentorship">Mentorship</NavLink></motion.li>
                                    <motion.li transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "text-black font-black" : "scale-100 hover:text-BLUE"} to="/links">Links</NavLink></motion.li>
                                    <li onClick={signout} className="hover:bg-transparent hover:text-BLUE duration-300 text-red-500 rounded-md md:rounded-xl font-semibold cursor-pointer">
                                        Sign Out
                                    </li>
                                </ul>
                            </div>
                        </div>}
                    </div>
                </div>
            </header>
        </>
    )
}

export default NavBar