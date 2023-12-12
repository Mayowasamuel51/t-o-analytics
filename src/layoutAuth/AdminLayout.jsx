import { NavLink, Outlet } from "react-router-dom"
import { MdDashboard, MdOutlineViewList, MdOutlineAnalytics } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaUserGroup, FaBarsStaggered } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";


const AdminLayout = () => {
    // const [nav, showNav] = useState(false);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-5 md:min-h-screen">
                <div className="ml-auto md:hidden block "><FaBarsStaggered size={30}/></div>
                <div className="hidden md:col-span-1 bg-BLUE md:flex justify-center md:pt-20 leading-[50px]">
                    <ul className="font-semibold flex flex-col gap-1 md:gap-2">
                        <li className="">
                            <NavLink className={({isActive})=> isActive ? "bg-white text-BLUE rounded-md flex gap-2 items-center md:px-3 px-1" : "text-white flex gap-2 items-center md:px-3 px-1"} to="/ADMIN-DASHBOARD">< MdDashboard size={20} />Dashboard</NavLink>
                        </li>
                        <li>
                            <NavLink className={({isActive})=> isActive ? "bg-white text-BLUE rounded-md flex gap-2 items-center md:px-3 px-1" : "text-white flex gap-2 items-center md:px-3 px-1"} to="viewcourses"><MdOutlineViewList size={20}/>Courses</NavLink>
                        </li>
                        <li>
                            <NavLink className={({isActive})=> isActive ? "bg-white text-BLUE rounded-md flex gap-2 items-center md:px-3 px-1" : "text-white flex gap-2 items-center md:px-3 px-1"} to="allStudents"><FaUsers size={20} /> Students</NavLink>
                        </li>
                        <li>
                            <NavLink className={({isActive})=> isActive ? "bg-white text-BLUE rounded-md flex gap-2 items-center md:px-3 px-1" : "text-white flex gap-2 items-center md:px-3 px-1"} to="vendors"><FaUserGroup size={20} /> Contacts</NavLink>
                        </li>
                        <li>
                            <NavLink className={({isActive})=> isActive ? "bg-white text-BLUE rounded-md flex gap-2 items-center md:px-3 px-1" : "text-white flex gap-2 items-center md:px-3 px-1"} to="analytics"><MdOutlineAnalytics size={20} />Contractors</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="col-span-1 md:col-span-4 md:p-0 p-2">
                    <div className="md:p-5 p-2 flex items-center gap-5 md:gap-20">
                        <h1 className="font-black text-base md:text-3xl">Dashboard</h1>
                        <div className="relative search-box flex-1">
                            <input type="text" className="border-[1px] border-black w-full h-10 rounded-2xl" />
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