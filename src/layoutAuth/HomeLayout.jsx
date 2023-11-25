import { Navigate, Outlet } from "react-router-dom"
import { useStateContext } from "../context/ContextProvider"
import NavBar from "../components/NavBar";




function HomeLayout() {
    const {  token } = useStateContext();
    if (token) {
        return <Navigate to="/dashboard"/>
    }
    return (
        <>
            <div>
                {/* <NavBar/> */}
                <Outlet />
            </div>
        </>
    )
}

export default HomeLayout