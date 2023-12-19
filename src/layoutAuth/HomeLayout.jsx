import { Outlet, useLocation } from "react-router-dom"
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import COURSES from "../coursesAPI/api";
import Messages from "../components/Messages";


function HomeLayout() {
    const location = useLocation()
    console.log(location.pathname)
    const paths = COURSES.map((course) => `/courses/${course.courseName}`)
    console.log(COURSES.map((course) => `/courses/${course.courseName}`));
    return (
        <>
            <div>
                <NavBar />
                <Outlet />
                {
                    location.pathname === "/blog" || 
                    location.pathname === "/contact" || 
                    location.pathname === "/courses" ||
                    location.pathname === "/checkout" ||
                    COURSES.map((course,index) => location.pathname  == `/courses/${paths[index]}`) &&
                    location.pathname !== "/"
                    ? <Footer black="bg-black text-white" /> : <Footer />
                }
                <Messages />
            </div>
        </>
    )
}

export default HomeLayout