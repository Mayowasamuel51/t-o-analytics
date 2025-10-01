import { useState, useEffect, useContext } from 'react';
import LOGO from "../assets/images/logo2.png";
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import CartItemContext from '../context/CartItemContext';
import { useStateContext } from "../context/ContextProvider"
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import { MdOutlineAddShoppingCart } from "react-icons/md"
import { getAuth, signOut } from "firebase/auth";
import { app } from "../../firebase.config";
import FetchAllStudents from '../hooks/FetchAllStudents';
import SearchCourseInput from './SearchCourseInput';

const headerVariant = {
    visible: { y: 0},
    hidden: { y: "-100%",
        transition:{ type: "linear", duration: .25}
    }
}


const NavBar = () => {
    const { data } = FetchAllStudents()
    const [show, setShow] = useState("")
    const [hidden, setHidden] = useState(false)
    const [subMenu, setSubMenu] = useState(false)
    const [fixed, setFixed] = useState("")
    const location = useLocation()
    const { cartItem } = useContext(CartItemContext);
    const { token, setToken, FullScreen } = useStateContext();
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
    const displaySubMenu = ()=> {
        setSubMenu(prev=> !prev)
    }
    const { scrollY } = useScroll()
    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious()
        if (latest > previous && latest > 150) {
            setHidden(true)
        }
        else {
        }
    })
    return (
        <>
            <motion.header variants={headerVariant} animate={(hidden && !FullScreen) ? "hidden" : "visible"} className={`z-[9999] fixed right-0 left-0 top-0 bg-white ${!token && "md:bg-opacity-50"} px-2 py-2 md:px-10 flex items-center ${token ? "gap-10" : "justify-between"}`}>
                <div>
                    <Link to="/">
                        <motion.img initial={{x: -100, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{type:"spring", stiffness: 260, duration: 2000}} src={LOGO} className="md:w-[200px] w-[130px]" alt=""/>
                    </Link>
                </div>
                {token && (<SearchCourseInput />)}
                {token ? 
                <nav className={`navlinks ${show} auth-nav md:relative md:left-0 md:right-0 duration-300 md:top-0 md:w-fit py-5 md:py-0 text-center`}>
                    <div className='pl-2 block md:hidden text-left'>
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
                    <ul className="md:hidden lg:flex flex lg:flex-row flex-col items-center gap-3 md:gap-6 font-normal text-sm">
                        <motion.li whileHover={{scale: 1.1}} transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive && location.pathname === "/dashboard" ? "text-BLUE font-black" : "scale-100 hover:text-BLUE"} to="/dashboard">My Courses</NavLink></motion.li>
                        <motion.li whileHover={{scale: 1.1}} transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "text-BLUE font-black" : "scale-100 hover:text-BLUE"} to="/courses">All Courses</NavLink></motion.li>
                        <motion.li whileHover={{scale: 1.1}} transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "text-BLUE font-black" : "scale-100 hover:text-BLUE"} to="/dashboard/comment">Comment</NavLink></motion.li>
                        <motion.li whileHover={{scale: 1.1}} transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "text-BLUE font-black" : "scale-100 hover:text-BLUE"} to="mentorship">Mentorship</NavLink></motion.li>
                        <motion.li whileHover={{scale: 1.1}} transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "text-BLUE font-black" : "scale-100 hover:text-BLUE"} to="/dashboard/links">Links</NavLink></motion.li>

                         <motion.li transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "text-black font-black" : "scale-100 hover:text-BLUE"} to="/dashboard/classmaterials">Assignment Portal</NavLink></motion.li> 


                        <button onClick={signout} className="md:hidden block my-3 hover:outline-2 hover:outline-offset-2 border-2 border-BLUE hover:bg-transparent hover:text-BLUE duration-300 bg-BLUE text-white px-2 py-1 md:px-3 md:py-2 rounded-md md:rounded-xl font-semibold mx-auto">
                            Sign Out
                        </button>
                    </ul>
                </nav>
                :
                <nav className={`navlinks ${fixed} ${show} md:relative md:left-0 md:right-0 duration-300 md:top-0 md:w-fit py-5 md:py-0 text-center`}>
                    <ul className="md:flex items-center gap-3 md:gap-6 font-semibold">
                        <motion.li whileHover={{scale: 1.1}} transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "font-black text-BLUE scale-110" : "scale-100 hover:text-BLUE"} to="/courses">Courses</NavLink></motion.li>
                        <motion.li whileHover={{scale: 1.1}} transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "font-black text-BLUE scale-110" : "scale-100 hover:text-BLUE"} to="/about">About</NavLink></motion.li>
                        <motion.li onClick={displaySubMenu} whileHover={{scale: 1.1}} transition={{ stiffness:250}} className='group' ><p className='flex gap-1 items-center justify-center'>Company <FaChevronDown className={`duration-200 ${subMenu && "group-hover:rotate-180"} ${FullScreen && "group-hover:rotate-180"}`} /></p>
                           {(subMenu && !FullScreen) ?
                           <ul className={`bg-white md:p-2 rounded-md duration-200`}>
                                <li><NavLink to="/career" className={({isActive})=> isActive ? "font-black text-BLUE scale-110" : "scale-100 hover:text-BLUE"}>Career</NavLink></li>
                                <li><NavLink to="/partner" className={({isActive})=> isActive ? "font-black text-BLUE scale-110" : "scale-100 hover:text-BLUE"}>Partners</NavLink></li>
                            </ul>
                            :
                            (FullScreen && 
                            <ul className={`absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible bg-white md:p-2 rounded-md duration-200 shadow-md text-left`}>
                                <li><NavLink to="/career" className={({isActive})=> isActive ? "font-black text-BLUE scale-110" : "scale-100 hover:text-BLUE"}>Career</NavLink></li>
                                <li><NavLink to="/partner" className={({isActive})=> isActive ? "font-black text-BLUE scale-110" : "scale-100 hover:text-BLUE"}>Partners</NavLink></li>
                            </ul>)}
                        </motion.li>
                        <motion.li whileHover={{scale: 1.1}} transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "font-black text-BLUE scale-110" : "scale-100 hover:text-BLUE"} to="/blog">Blog</NavLink></motion.li>
                        <motion.li whileHover={{scale: 1.1}} transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "font-black text-BLUE scale-110" : "scale-100 hover:text-BLUE"} to="/contact">Contact</NavLink></motion.li>

                         <motion.li whileHover={{scale: 1.1}} transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "font-black text-BLUE scale-110" : "scale-100 hover:text-BLUE"} to="/sessions">Sessions</NavLink></motion.li>
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
                                {cartItem && cartItem.length > 0 && <div className="top-[-6px] right-[-6px] animate-ping duration-200 ease-in-out absolute w-5 aspect-square rounded-full bg-BLUE z-[1]" ></div>}
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
                                {FullScreen ? 
                                <ul className='font-semibold p-3 leading-[30px]'>
                                    <motion.li transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "text-black font-black" : "scale-100 hover:text-BLUE"} to="/myProfile">My Profile</NavLink></motion.li>
                                    <li onClick={signout} className="hover:bg-transparent hover:text-BLUE duration-300 text-red-500 rounded-md md:rounded-xl font-semibold cursor-pointer">
                                        Sign Out
                                    </li>
                                </ul>
                                :
                                <ul className='font-semibold p-3 leading-[30px]'>
                                    <motion.li transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "text-black font-black" : "scale-100 hover:text-BLUE"} to="/myProfile">My Profile</NavLink></motion.li>
                                    <motion.li transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "text-black font-black" : "scale-100 hover:text-BLUE"} to="/dashboard">My Courses</NavLink></motion.li>
                                    <motion.li transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "text-black font-black" : "scale-100 hover:text-BLUE"} to="/courses">All Courses</NavLink></motion.li>
                                    <motion.li transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "text-black font-black" : "scale-100 hover:text-BLUE"} to="/mentorship">Mentorship</NavLink></motion.li>
                                    <motion.li transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "text-black font-black" : "scale-100 hover:text-BLUE"} to="/dashboard/links">Links</NavLink></motion.li>

                                     <motion.li transition={{ stiffness:250}} ><NavLink className={({isActive})=> isActive ? "text-black font-black" : "scale-100 hover:text-BLUE"} to="/dashboard/links">Class Materials </NavLink></motion.li>


                                    <li onClick={signout} className="hover:bg-transparent hover:text-BLUE duration-300 text-red-500 rounded-md md:rounded-xl font-semibold cursor-pointer">
                                        Sign Out
                                    </li>
                                </ul>
                                }
                                
                            </div>
                        </div>}
                    </div>
                </div>
            </motion.header>
        </>
    )
}

export default NavBar