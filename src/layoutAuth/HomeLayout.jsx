import { Outlet, useLocation } from "react-router-dom"
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import COURSES from "../coursesAPI/api";
import { useParams } from "react-router-dom";


function HomeLayout() {
    const location = useLocation()
    const { course } = useParams();
    return (
        <>
            <div>
                <NavBar />
                <Outlet />
                {location.pathname === "/blog" || 
                location.pathname === "/contact" || 
                location.pathname === "/courses" ||
                location.pathname === "/checkout" ||
                COURSES.map((course) => location.pathname === `/courses/${course.courseName}`) 
  
                ? <Footer black="bg-black text-white" /> : <Footer />}
            </div>
        </>
    )
}

export default HomeLayout