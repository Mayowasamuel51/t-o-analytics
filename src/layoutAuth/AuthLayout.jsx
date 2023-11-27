import AuthNavBar from "../components/AuthNavBar";
import { Link, NavLink, Navigate, Outlet } from "react-router-dom"
import { useStateContext } from "../context/ContextProvider"
import { getIdToken, GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { app } from "../../firebase.config";

function AuthLayout() {
    const {  token ,setToken } = useStateContext();
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
            <AuthNavBar signout={signout} />
            <div className="py-32">
                <nav className="nav">
                    <ul>
                        <Link className="nav-link" to="/dashboard">dashboard</Link>
                        <Link className="nav-link" to="/users">users</Link>
                        <Link className="nav-link" to="/dashboard/post">post</Link>
                        <Link className="nav-link" to="/videos">videos</Link>
                        <Link className="nav-link" to="/views">views</Link>
                    </ul>
                </nav>
                <button className="border-2 border-red-600" onClick={signout}>signOut</button>
            </div>
            <Outlet />
        </>
    )
}

export default AuthLayout