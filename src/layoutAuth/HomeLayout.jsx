import { Outlet, useLocation } from "react-router-dom"
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import COURSES from "../coursesAPI/api";
import Messages from "../components/Messages";


function HomeLayout() {
    const location = useLocation()
    return (
        <>
            <div>
                <NavBar />
                <Outlet />
                {
                    location.pathname === "/blog" || 
                    location.pathname === "/contact" || 
                    location.pathname === "/courses" ||
                    location.pathname === "/checkout"
                    // COURSES.map((course,index) => location.pathname  == `/courses/${course.courseName[index]}`)
                    ? <Footer black="bg-black text-white" /> : <Footer />
                }
                <Messages />
            </div>
        </>
    )
}

export default HomeLayout