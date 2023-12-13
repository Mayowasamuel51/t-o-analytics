import { NavLink, Outlet } from "react-router-dom"
import { MdDashboard, MdOutlineViewList, MdOutlineAnalytics } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaUserGroup, FaBarsStaggered } from "react-icons/fa6";
import { FaSearch, FaMicrophone } from "react-icons/fa";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navVariant = {
    initial: {
        y: "-100%"
    },
    final: {
        y: "40px",
        transition: {
            type:"spring", stiffness: 250, duration: 0.4, delayChildren: 0.3, staggerChildren: 0.3
        }
    }
}

const liVariant = {
    initial: {
        opacity: 0,
        y: "-50px"
    },
    final: {
        opacity: 1,
        y: 0
    }
}


const AdminLayout = () => {
    const [nav, showNav] = useState(false);
    const [FullScreen, setFullScreen] = useState(false)

    const displayNav = ()=> {
        showNav(prev=> !prev)
    }

    useEffect(()=> {
        const handleResize = ()=> {
            const size = window.innerWidth;
            size > 768 ? setFullScreen(true) : setFullScreen(false)
        }
        handleResize()

        window.addEventListener("resize", handleResize)

        return ()=> window.removeEventListener("resize", handleResize)
    }, [FullScreen])

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-5 md:min-h-screen">
                <div className="w-full flex justify-end md:hidden py-2 bg-white z-50"><FaBarsStaggered onClick={displayNav} size={30}/></div>
                <motion.div className="z-10  absolute w-full md:relative md:col-span-1 md:bg-BLUE md:flex justify-center md:pt-20 leading-[50px]">
                    <motion.ul variants={navVariant} animate={(nav && !FullScreen)? "final" : !FullScreen ? "initial" : "" } className="bg-BLUE font-semibold flex flex-col gap-1 md:gap-2 md:p-0 p-3">
                        <motion.li variants={liVariant} className="">
                            <NavLink className={({isActive})=> isActive ? "bg-white text-BLUE rounded-md flex gap-2 items-center md:px-3 px-1" : "text-white flex gap-2 items-center md:px-3 px-1"} to="/ADMIN-DASHBOARD">< MdDashboard size={20} />Dashboard</NavLink>
                        </motion.li>
                        <motion.li variants={liVariant}>
                            <NavLink className={({isActive})=> isActive ? "bg-white text-BLUE rounded-md flex gap-2 items-center md:px-3 px-1" : "text-white flex gap-2 items-center md:px-3 px-1"} to="viewcourses"><MdOutlineViewList size={20}/>Courses</NavLink>
                        </motion.li>
                        <motion.li variants={liVariant}>
                            <NavLink className={({isActive})=> isActive ? "bg-white text-BLUE rounded-md flex gap-2 items-center md:px-3 px-1" : "text-white flex gap-2 items-center md:px-3 px-1"} to="allStudents"><FaUsers size={20} /> Students</NavLink>
                        </motion.li>
                        <motion.li variants={liVariant}>
                            <NavLink className={({isActive})=> isActive ? "bg-white text-BLUE rounded-md flex gap-2 items-center md:px-3 px-1" : "text-white flex gap-2 items-center md:px-3 px-1"} to="vendors"><FaUserGroup size={20} /> Contacts</NavLink>
                        </motion.li>
                        <motion.li variants={liVariant}>
                            <NavLink className={({isActive})=> isActive ? "bg-white text-BLUE rounded-md flex gap-2 items-center md:px-3 px-1" : "text-white flex gap-2 items-center md:px-3 px-1"} to="analytics"><MdOutlineAnalytics size={20} />Contractors</NavLink>
                        </motion.li>
                    </motion.ul>
                </motion.div>
                <div className="col-span-1 md:col-span-4 md:p-0 p-2">
                    <div className="md:p-5 p-2 flex items-center gap-5 md:gap-32">
                        <h1 className="font-black text-base md:text-3xl">Dashboard</h1>
                        <div className="relative search-box flex-1">
                            <input type="text" className="pl-10 bg-textColor w-full h-10 rounded-2xl" placeholder="Search here" />
                            <FaMicrophone size={20} className="absolute" />
                            <FaSearch size={20} className="absolute" />
                        </div>
                        <div className="flex items-center gap-2 md:gap-3">
                            <div>
                                <p className="text-xs md:text-base">Vera Bassey</p>
                                <p className="text-md font-semibold">Admin</p>
                            </div>
                            <div className=" animate-bounce cursor-pointer bg-BLUE w-8 md:w-12 aspect-square rounded-full"></div>
                        </div>
                    </div>
                    <div className="">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminLayout