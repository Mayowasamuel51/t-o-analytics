import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useStateContext } from "../context/ContextProvider"
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import COURSES from "../coursesAPI/api"



function HomeLayout() {
    const {  token } = useStateContext();
    const location = useLocation()
    if (token) {
        return <Navigate to="/dashboard"/>
    }
    return (
        <>
            <div>
                <NavBar/>
                <Outlet />
                {location.pathname === "/blog" || 
                location.pathname === "/contact" || 
                location.pathname === "/courses" ||
                COURSES.map((courses)=> location.pathname === `/courses/${courses.courseName.toLowerCase()}`) ? <Footer black="bg-black text-white" /> : <Footer />}
            </div>
        </>
    )
}

export default HomeLayout