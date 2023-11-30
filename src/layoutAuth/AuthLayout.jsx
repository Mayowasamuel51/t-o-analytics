import NavBar from "../components/NavBar";
import { Link, NavLink, Navigate, Outlet } from "react-router-dom"
import { useStateContext } from "../context/ContextProvider"
import { getIdToken, GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { app } from "../../firebase.config";

function AuthLayout() {
    const {  token ,  setToken , user, setUser } = useStateContext();
    if (!token) {
        return <Navigate to="/" />
    }
    const auth = getAuth(app);
    const signout = () => {
        signOut(auth).then((user) => {
            // window.localStorage.removeItem("ACCESS_TOKEN");
            setToken(null)
        }).catch((err) => console.log(err.message))
    }
    return (
        <>
            <NavBar />
            <div className="mt-28">
                {/* <nav className="nav">
                    <ul className="dashboard-links flex items-center gap-5">
                        {user.email}
                        <Link className="hover:text-red-500" to="/dashboard">dashboard</Link>
                        <Link className="hover:text-red-500" to="/users">users</Link>
                        <Link className="hover:text-red-500" to="/dashboard/post">post</Link>
                        <Link className="hover:text-red-500" to="/videos">videos</Link>
                        <Link className="hover:text-red-500" to="/views">views</Link>
                    </ul>
                </nav> */}
            </div>
            <Outlet />
        </>
    )
}

export default AuthLayout