import { Outlet, useLocation } from "react-router-dom"
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import COURSES from "../coursesAPI/api";


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
                    location.pathname === "/checkout" ||
                    COURSES.map((course) => location.pathname === `/courses/${course.courseName}`) 
                    ? <Footer black="bg-black text-white" /> : <Footer />
                }
            </div>
        </>
    )
}

export default HomeLayout