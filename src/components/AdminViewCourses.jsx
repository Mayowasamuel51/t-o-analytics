import { NavLink, Outlet } from "react-router-dom";

const AdminViewCourses = () => {
  return (
    <div>
        <div className="p-2 md:p-5">
            <div className="flex justify-between items-center my-2">
                <h1 className="text-2xl font-bold">Courses</h1>
                <NavLink to="/gg" className="md:text-xl text-base bg-BLUE text-white px-2 py-2 md:px-5 md:py-2 rounded-md md:rounded-3xl font-semibold">UPLOAD VIDEO</NavLink>
            </div>
            <div className="bg-textColor p-2 md:p-5 rounded-md">
                <ul className="w-fit bg-white px-5 py-3 rounded-md md:rounded-3xl mx-auto flex justify-center gap-3 md:gap-10">
                    <li><NavLink className={({isActive})=> isActive ? "bg-BLUE text-white px-2 py-2 md:px-3 md:py-2 rounded-md md:rounded-3xl font-semibold" : "text-black px-2 py-2 md:px-3 md:py-2 font-semibold"} to="/ADMIN-DASHBOARD/viewcourses">All Courses</NavLink></li>
                    <li><NavLink className={({isActive})=> isActive ? "bg-BLUE text-white px-2 py-2 md:px-3 md:py-2 rounded-md md:rounded-3xl font-semibold" : "text-black px-2 py-2 md:px-3 md:py-2 font-semibold"} to="/ADMIN-DASHBOARD/viewcourses/published">Published</NavLink></li>
                    <li><NavLink className={({isActive})=> isActive ? "bg-BLUE text-white px-2 py-2 md:px-3 md:py-2 rounded-md md:rounded-3xl font-semibold" : "text-black px-2 py-2 md:px-3 md:py-2 font-semibold"} to="/ADMIN-DASHBOARD/viewcourses/draft">Draft</NavLink></li>
                </ul>
                <div className="my-4">
                    <input type="text" className="w-full md:w-1/2 h-10 rounded-lg md:rounded-2xl" />
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminViewCourses