import { useState, useEffect, useContext, useMemo } from "react";
import LOGO from "../assets/images/logo2.png";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import CartItemContext from "../context/CartItemContext";
import { useStateContext } from "../context/ContextProvider";
import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../../firebase.config";
import FetchAllStudents from "../hooks/FetchAllStudents";
import SearchCourseInput from "./SearchCourseInput";
import PropTypes from "prop-types";

const SCROLL_THRESHOLD = 20;
const HIDE_THRESHOLD = 150;

const headerVariant = {
  visible: { y: 0 },
  hidden: {
    y: "-100%",
    transition: { type: "linear", duration: 0.25 },
  },
};

// ===== User Avatar =====
const UserAvatar = ({ initial, animate = false }) => (
  <div
    className={`${
      animate ? "animate-bounce" : ""
    } flex justify-center items-center w-8 md:text-lg aspect-square text-white font-black bg-BLUE rounded-full`}
  >
    {initial}
  </div>
);

// ===== Cart Icon =====
const CartIcon = ({ itemCount }) => (
  <div className="relative cursor-pointer group">
    <MdOutlineAddShoppingCart size={30} />
    <p className="top-[-10px] group-hover:scale-[1.3] duration-200 ease-in-out right-[-10px] absolute text-white font-bold border-2 border-white px-2 rounded-full bg-BLUE z-10">
      {itemCount || "0"}
    </p>
    {itemCount > 0 && (
      <div className="top-[-6px] right-[-6px] animate-ping duration-200 ease-in-out absolute w-5 aspect-square rounded-full bg-BLUE z-[1]"></div>
    )}
  </div>
);

// ===== Authenticated User Nav =====
const AuthenticatedNav = ({ show, fullname, email, initial, signout }) => (
  <nav
    className={`transition-all ${
      show === "show" ? "block" : "hidden"
    } md:block py-4 md:py-0 text-center`}
  >
    <div className="pl-2 block md:hidden text-left mb-4">
      <Link to="/myProfile">
        <div className="flex items-center gap-3">
          <UserAvatar initial={initial} animate />
          <div>
            <p className="font-semibold text-md">{fullname}</p>
            <p className="font-semibold text-xs text-slate-400">{email}</p>
          </div>
        </div>
      </Link>
    </div>

    <ul className="flex flex-col md:flex-row items-center gap-3 md:gap-6 font-normal text-sm">
      <motion.li whileHover={{ scale: 1.1 }}>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-BLUE font-black" : "hover:text-BLUE"
          }
          to="/dashboard"
        >
          My Courses
        </NavLink>
      </motion.li>
      <motion.li whileHover={{ scale: 1.1 }}>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-BLUE font-black" : "hover:text-BLUE"
          }
          to="/courses"
        >
          All Courses
        </NavLink>
      </motion.li>
      <motion.li whileHover={{ scale: 1.1 }}>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-BLUE font-black" : "hover:text-BLUE"
          }
          to="/dashboard/comment"
        >
          Comment
        </NavLink>
      </motion.li>
      <motion.li whileHover={{ scale: 1.1 }}>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-BLUE font-black" : "hover:text-BLUE"
          }
          to="/mentorship"
        >
          Mentorship
        </NavLink>
      </motion.li>

      <button
        onClick={signout}
        className="w-full md:hidden block my-3 border-2 border-BLUE hover:bg-transparent hover:text-BLUE duration-300 bg-BLUE text-white px-2 py-1 md:px-3 md:py-2 rounded-md font-semibold"
      >
        Sign Out
      </button>
    </ul>
  </nav>
);

// ===== Guest Nav =====
const GuestNav = ({ show, subMenu, displaySubMenu }) => (
  <nav
    className={`transition-all ${
      show === "show" ? "block" : "hidden"
    } md:block py-4 md:py-0 text-center`}
  >
    <ul className="px-4 flex flex-col md:flex-row items-center gap-4 md:gap-6 font-semibold">
      <motion.li whileHover={{ scale: 1.1 }}>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-BLUE font-black" : "hover:text-BLUE"
          }
          to="/courses"
        >
          Courses
        </NavLink>
      </motion.li>
      <motion.li whileHover={{ scale: 1.1 }}>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-BLUE font-black" : "hover:text-BLUE"
          }
          to="/about"
        >
          About
        </NavLink>
      </motion.li>

      <motion.li
        onClick={displaySubMenu}
        whileHover={{ scale: 1.1 }}
        className="group relative cursor-pointer"
      >
        <p className="flex gap-1 items-center justify-center">
          Company
          <FaChevronDown
            className={`duration-200 ${subMenu ? "rotate-180" : ""}`}
          />
        </p>
        {subMenu && (
          <ul className="bg-white p-4 rounded-md mt-2 flex flex-col gap-3 shadow-md absolute">
            <li>
              <NavLink
                to="/career"
                className={({ isActive }) =>
                  isActive ? "text-BLUE font-black" : "hover:text-BLUE"
                }
              >
                Career
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/partner"
                className={({ isActive }) =>
                  isActive ? "text-BLUE font-black" : "hover:text-BLUE"
                }
              >
                Partners
              </NavLink>
            </li>
          </ul>
        )}
      </motion.li>

      <motion.li whileHover={{ scale: 1.1 }}>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-BLUE font-black" : "hover:text-BLUE"
          }
          to="/blog"
        >
          Blog
        </NavLink>
      </motion.li>
      <motion.li whileHover={{ scale: 1.1 }}>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-BLUE font-black" : "hover:text-BLUE"
          }
          to="/contact"
        >
          Contact
        </NavLink>
      </motion.li>
      <Link to="/login" className="md:hidden block w-full">
        <button className="w-full border-2 border-BLUE hover:bg-transparent hover:text-BLUE duration-300 bg-BLUE text-white px-4 py-2 rounded-md font-semibold">
          Login
        </button>
      </Link>
    </ul>
  </nav>
);

// ===== User Dropdown (Desktop) =====
const UserDropdown = ({ initial, fullname, email, signout }) => (
  <div className="hidden md:block relative group">
    <UserAvatar initial={initial} />
    <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 duration-300 absolute rounded-lg w-[250px] right-0 top-12 bg-white shadow-lg z-[1000]">
      <div className="p-3 flex items-center gap-3 border-b border-gray-200">
        <UserAvatar initial={initial} animate />
        <div>
          <p className="font-semibold text-md">{fullname}</p>
          <p className="font-semibold text-xs text-slate-400">{email}</p>
        </div>
      </div>

      <ul className="font-semibold p-3 leading-[30px]">
        <li>
          <NavLink
            to="/myProfile"
            className={({ isActive }) =>
              isActive ? "text-BLUE font-black" : "hover:text-BLUE"
            }
          >
            My Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "text-BLUE font-black" : "hover:text-BLUE"
            }
          >
            My Courses
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              isActive ? "text-BLUE font-black" : "hover:text-BLUE"
            }
          >
            All Courses
          </NavLink>
        </li>
        <li
          onClick={signout}
          className="text-red-500 hover:text-BLUE cursor-pointer"
        >
          Sign Out
        </li>
      </ul>
    </div>
  </div>
);

// ===== Main NavBar Component =====
const NavBar = () => {
  const { data } = FetchAllStudents();
  const [show, setShow] = useState("");
  const [subMenu, setSubMenu] = useState(false);
  const { cartItem } = useContext(CartItemContext);
  const { token, setToken, FullScreen } = useStateContext();
  const [localuser, setUser] = useState("");
  const auth = getAuth(app);
  const { scrollY } = useScroll();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        window.localStorage.removeItem("ACCESS_TOKEN");
        window.localStorage.removeItem("user");
        setToken(null);
      })
      .catch((err) => console.error("Sign out error:", err.message));
  };

  const currentUser = useMemo(() => {
    if (!data?.data?.response || !localuser) return null;
    const user = data.data.response.find((u) => u.email === localuser);
    if (!user) return null;

    return {
      fullname: user.name,
      email: user.email,
      initial: user.name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase())
        .join(""),
    };
  }, [data, localuser]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) setUser(loggedInUser);
  }, []);

  const toggleMenu = () => setShow((prev) => (prev === "show" ? "" : "show"));
  const toggleSubMenu = () => setSubMenu((prev) => !prev);

  return (
    <motion.header
      variants={headerVariant}
      animate="visible"
      className="z-[9999] fixed right-0 left-0 top-0 bg-white px-3 py-2 md:px-10 flex items-center justify-between shadow-sm"
    >
      <div>
        <Link to="/">
          <motion.img
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, duration: 2 }}
            src={LOGO}
            className="md:w-[200px] w-[130px]"
            alt="Logo"
          />
        </Link>
      </div>

      {token && <SearchCourseInput />}

      {token ? (
        currentUser && (
          <AuthenticatedNav
            {...currentUser}
            show={show}
            signout={handleSignOut}
          />
        )
      ) : (
        <GuestNav show={show} subMenu={subMenu} displaySubMenu={toggleSubMenu} />
      )}

      <div className="flex items-center gap-3">
        {!token && (
          <Link to="/login" className="hidden md:block">
            <button className="border-2 border-BLUE hover:bg-transparent hover:text-BLUE duration-300 bg-BLUE text-white px-4 py-2 rounded-3xl font-semibold">
              Login
            </button>
          </Link>
        )}

        <Link to="/checkout">
          <CartIcon itemCount={cartItem?.length} />
        </Link>

        <div className="md:hidden">
          {show === "show" ? (
            <FaXmark size={22} onClick={toggleMenu} />
          ) : (
            <FaBarsStaggered size={22} onClick={toggleMenu} />
          )}
        </div>

        {token && currentUser && (
          <UserDropdown {...currentUser} signout={handleSignOut} />
        )}
      </div>
    </motion.header>
  );
};

// ===== PropTypes =====
UserAvatar.propTypes = {
  initial: PropTypes.string.isRequired,
  animate: PropTypes.bool,
};

CartIcon.propTypes = {
  itemCount: PropTypes.number,
};

UserDropdown.propTypes = {
  initial: PropTypes.string.isRequired,
  fullname: PropTypes.string,
  email: PropTypes.string,
  signout: PropTypes.func,
};

GuestNav.propTypes = {
  show: PropTypes.string,
  subMenu: PropTypes.bool,
  displaySubMenu: PropTypes.func,
};

AuthenticatedNav.propTypes = {
  show: PropTypes.string,
  initial: PropTypes.string.isRequired,
  fullname: PropTypes.string,
  email: PropTypes.string,
  signout: PropTypes.func,
};

export default NavBar;



// import { useState, useEffect, useContext, useMemo } from 'react';
// import LOGO from "../assets/images/logo2.png";
// import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
// import CartItemContext from '../context/CartItemContext';
// import { useStateContext } from "../context/ContextProvider";
// import { Link, NavLink } from "react-router-dom";
// import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
// import { FaChevronDown } from "react-icons/fa";
// import { MdOutlineAddShoppingCart } from "react-icons/md";
// import { getAuth, signOut } from "firebase/auth";
// import { app } from "../../firebase.config";
// import FetchAllStudents from '../hooks/FetchAllStudents';
// import SearchCourseInput from './SearchCourseInput';
// import PropTypes from "prop-types";

// const SCROLL_THRESHOLD = 20;
// const HIDE_THRESHOLD = 150;

// const headerVariant = {
//     visible: { y: 0 },
//     hidden: {
//         y: "-100%",
//         transition: { type: "linear", duration: 0.25 }
//     }
// };

// const UserAvatar = ({ initial, animate = false }) => (
//     <div className={`${animate ? 'animate-bounce' : ''} flex justify-center items-center w-8 md:text-lg aspect-square text-white font-black bg-BLUE rounded-full`}>
//         {initial}
//     </div>
// );

// const CartIcon = ({ itemCount }) => (
//     <div className='relative cursor-pointer group'>
//         <MdOutlineAddShoppingCart size={30} />
//         <p className="top-[-10px] group-hover:scale-[1.3] duration-200 ease-in-out right-[-10px] absolute text-white font-bold border-2 border-white px-2 rounded-full bg-BLUE z-10">
//             {itemCount || "0"}
//         </p>
//         <div className="top-[-6px] group-hover:animate-ping duration-200 ease-in-out right-[-6px] absolute w-5 aspect-square rounded-full bg-BLUE z-[1]"></div>
//         {itemCount > 0 && (
//             <div className="top-[-6px] right-[-6px] animate-ping duration-200 ease-in-out absolute w-5 aspect-square rounded-full bg-BLUE z-[1]"></div>
//         )}
//     </div>
// );

// const AuthenticatedNav = ({ show, fixed, fullname, email, initial, signout }) => (
//     <nav className={`px-4 ${fixed} ${show} auth-nav md:relative md:left-0 md:right-0 duration-300 md:top-0 md:w-fit py-5 md:py-0 text-center`}>
//         <div className='pl-2 block md:hidden text-left mb-4'>
//             <Link to="/myProfile">
//                 <div className='flex items-center gap-3'>
//                     <UserAvatar initial={initial} animate />
//                     <div>
//                         <p className='font-semibold text-md'>{fullname}</p>
//                         <p className='font-semibold text-xs text-slate-400'>{email}</p>
//                     </div>
//                 </div>
//             </Link>
//         </div>

//         <ul className="md:hidden lg:flex flex lg:flex-row flex-col items-center gap-3 md:gap-6 font-normal text-sm">
//             <motion.li whileHover={{ scale: 1.1 }} transition={{ stiffness: 250 }}>
//                 <NavLink 
//                     className={({ isActive }) => isActive ? "text-BLUE font-black" : "hover:text-BLUE"}
//                     to="/dashboard"
//                 >
//                     My Courses
//                 </NavLink>
//             </motion.li>
//             <motion.li whileHover={{ scale: 1.1 }} transition={{ stiffness: 250 }}>
//                 <NavLink 
//                     className={({ isActive }) => isActive ? "text-BLUE font-black" : "hover:text-BLUE"}
//                     to="/courses">
//                     All Courses
//                 </NavLink>
//             </motion.li>
//             <motion.li whileHover={{ scale: 1.1 }} transition={{ stiffness: 250 }}>
//                 <NavLink 
//                     className={({ isActive }) => isActive ? "text-BLUE font-black" : "hover:text-BLUE"}
//                     to="/dashboard/comment"
//                 >
//                     Comment
//                 </NavLink>
//             </motion.li>
//             <motion.li whileHover={{ scale: 1.1 }} transition={{ stiffness: 250 }}>
//                 <NavLink 
//                     className={({ isActive }) => isActive ? "text-BLUE font-black" : "hover:text-BLUE"}
//                     to="/mentorship"
//                 >
//                     Mentorship
//                 </NavLink>
//             </motion.li>

//             <button 
//                 onClick={signout}
//                 className="w-full md:hidden block my-3 hover:outline-2 hover:outline-offset-2 border-2 border-BLUE hover:bg-transparent hover:text-BLUE duration-300 bg-BLUE text-white px-2 py-1 md:px-3 md:py-2 rounded-md md:rounded-xl font-semibold mx-auto"
//             >
//                 Sign Out
//             </button>
//         </ul>
//     </nav>
// );

// const GuestNav = ({ show, fixed, subMenu, displaySubMenu, FullScreen }) => (
//     <nav className={`${fixed} ${show} md:relative md:left-0 md:right-0 duration-300 md:top-0 md:w-fit py-5 md:py-0 text-center`}>
//         <ul className="px-4 flex flex-col md:flex-row items-center gap-4 md:gap-6 font-semibold">
//             <motion.li whileHover={{ scale: 1.1 }} transition={{ stiffness: 250 }}>
//                 <NavLink 
//                     className={({ isActive }) => isActive ? "font-black text-BLUE scale-110" : "hover:text-BLUE"}
//                     to="/courses">
//                     Courses
//                 </NavLink>
//             </motion.li>
//             <motion.li whileHover={{ scale: 1.1 }} transition={{ stiffness: 250 }}>
//                 <NavLink 
//                     className={({ isActive }) => isActive ? "font-black text-BLUE scale-110" : "hover:text-BLUE"}
//                     to="/about">
//                     About
//                 </NavLink>
//             </motion.li>
            
//             <motion.li 
//                 onClick={displaySubMenu}
//                 whileHover={{ scale: 1.1 }}
//                 transition={{ stiffness: 250 }}
//                 className='group relative'
//             >
//                 <p className='flex gap-1 items-center justify-center cursor-pointer'>
//                     Company 
//                     <FaChevronDown className={`duration-200 ${subMenu ? "rotate-180" : ""} ${FullScreen ? "group-hover:rotate-180" : ""}`} />
//                 </p>
//                 {(subMenu && !FullScreen) ? (
//                     <ul className="bg-white md:p-4 rounded-md duration-200 mt-2 flex flex-col gap-3">
//                         <li><NavLink to="/career" className={({ isActive }) => isActive ? "font-black text-BLUE" : "hover:text-BLUE"}>Career</NavLink></li>
//                         <li><NavLink to="/partner" className={({ isActive }) => isActive ? "font-black text-BLUE" : "hover:text-BLUE"}>Partners</NavLink></li>
//                     </ul>
//                 ) : FullScreen && (
//                     <ul className="absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible bg-white md:p-2 rounded-md duration-200 shadow-md text-left min-w-[120px]">
//                         <li className="hover:bg-gray-50 px-2 py-1">
//                             <NavLink to="/career" className={({ isActive }) => isActive ? "font-black text-BLUE" : "hover:text-BLUE"}>Career</NavLink>
//                         </li>
//                         <li className="hover:bg-gray-50 px-2 py-1">
//                             <NavLink to="/partner" className={({ isActive }) => isActive ? "font-black text-BLUE" : "hover:text-BLUE"}>Partners</NavLink>
//                         </li>
//                     </ul>
//                 )}
//             </motion.li>

//             <motion.li whileHover={{ scale: 1.1 }} transition={{ stiffness: 250 }}>
//                 <NavLink 
//                     className={({ isActive }) => isActive ? "font-black text-BLUE scale-110" : "hover:text-BLUE"}
//                     to="/blog"
//                 >
//                     Blog
//                 </NavLink>
//             </motion.li>
//             <motion.li whileHover={{ scale: 1.1 }} transition={{ stiffness: 250 }}>
//                 <NavLink 
//                     className={({ isActive }) => isActive ? "font-black text-BLUE scale-110" : "hover:text-BLUE"}
//                     to="/contact"
//                 >
//                     Contact
//                 </NavLink>
//             </motion.li>
//             <motion.li whileHover={{ scale: 1.1 }} transition={{ stiffness: 250 }}>
//                 <NavLink 
//                     className={({ isActive }) => isActive ? "font-black text-BLUE scale-110" : "hover:text-BLUE"}
//                     to="/sessions"
//                 >
//                     Comment
//                 </NavLink>
//             </motion.li>

//             <Link to="/login" className='md:hidden block w-full'>
//                 <button className="w-full border-2 border-BLUE hover:bg-transparent hover:text-BLUE duration-300 bg-BLUE text-white px-4 py-1 md:px-6 md:py-3 rounded-md md:rounded-3xl font-semibold">
//                     Login
//                 </button>
//             </Link>
//         </ul>
//     </nav>
// );

// const UserDropdown = ({ initial, fullname, email, signout, FullScreen }) => (
//     <div className='flex-1 md:block hidden group'>
//         <UserAvatar initial={initial} />
//         <div className='invisible opacity-0 group-hover:visible group-hover:opacity-100 duration-300 absolute rounded-lg w-[250px] right-[20px] top-16 bg-white shadow-lg'>
//             {/* Profile Header */}
//             <div className='p-3 flex items-center gap-3 border-b-2 border-textColor'>
//                 <UserAvatar initial={initial} animate />
//                 <div>
//                     <p className='font-semibold text-md'>{fullname}</p>
//                     <p className='font-semibold text-xs text-slate-400'>{email}</p>
//                 </div>
//             </div>

//             <ul className='font-semibold p-3 leading-[30px]'>
//                 <motion.li transition={{ stiffness: 250 }}>
//                     <NavLink 
//                         className={({ isActive }) => isActive ? "text-black font-black" : "hover:text-BLUE"}
//                         to="/myProfile">
//                         My Profile
//                     </NavLink>
//                 </motion.li>
                
//                 {!FullScreen && (
//                     <>
//                         <motion.li transition={{ stiffness: 250 }}>
//                             <NavLink 
//                                 className={({ isActive }) => isActive ? "text-black font-black" : "hover:text-BLUE"}
//                                 to="/dashboard"
//                             >
//                                 My Courses
//                             </NavLink>
//                         </motion.li>
//                         <motion.li transition={{ stiffness: 250 }}>
//                             <NavLink 
//                                 className={({ isActive }) => isActive ? "text-black font-black" : "hover:text-BLUE"}
//                                 to="/courses">
//                                 All Courses
//                             </NavLink>
//                         </motion.li>
//                         <motion.li transition={{ stiffness: 250 }}>
//                             <NavLink 
//                                 className={({ isActive }) => isActive ? "text-black font-black" : "hover:text-BLUE"}
//                                 to="/mentorship"
//                             >
//                                 Mentorship
//                             </NavLink>
//                         </motion.li>
//                         <motion.li transition={{ stiffness: 250 }}>
//                             <NavLink 
//                                 className={({ isActive }) => isActive ? "text-black font-black" : "hover:text-BLUE"}
//                                 to="/dashboard/links"
//                             >
//                                 Class Materials
//                             </NavLink>
//                         </motion.li>
//                     </>
//                 )}

//                 <motion.li transition={{ stiffness: 250 }}>
//                     <NavLink 
//                         className={({ isActive }) => isActive ? "text-black font-black" : "hover:text-BLUE"}
//                         to="/result"
//                     >
//                         My Results
//                     </NavLink>
//                 </motion.li>

//                 <li 
//                     onClick={signout}
//                     className="hover:bg-transparent hover:text-BLUE duration-300 text-red-500 rounded-md md:rounded-xl font-semibold cursor-pointer"
//                 >
//                     Sign Out
//                 </li>
//             </ul>
//         </div>
//     </div>
// );

// const NavBar = () => {
//     const { data } = FetchAllStudents();
//     const [show, setShow] = useState("");
//     const [hidden, setHidden] = useState(false);
//     const [subMenu, setSubMenu] = useState(false);
//     const [fixed, setFixed] = useState("");
//     const { cartItem } = useContext(CartItemContext);
//     const { token, setToken, FullScreen } = useStateContext();
//     const [localuser, setUser] = useState("");
//     const auth = getAuth(app);
//     const { scrollY } = useScroll();

//     // Handle sign out
//     const handleSignOut = () => {
//         signOut(auth)
//             .then(() => {
//                 window.localStorage.removeItem("ACCESS_TOKEN");
//                 window.localStorage.removeItem("user");
//                 setToken(null);
//             })
//             .catch((err) => console.error("Sign out error:", err.message));
//     };

//     // Memoize current user data
//     const currentUser = useMemo(() => {
//         if (!data?.data?.response || !localuser) return null;
        
//         const user = data.data.response.find((u) => u.email === localuser);
//         if (!user) return null;

//         return {
//             fullname: user.name,
//             email: user.email,
//             initial: user.name
//                 .split(" ")
//                 .map((word) => word.charAt(0).toUpperCase())
//                 .join("")
//         };
//     }, [data, localuser]);

//     useEffect(() => {
//         const handleScroll = () => {
//             setFixed(window.scrollY > SCROLL_THRESHOLD ? "fixed" : "");
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     useEffect(() => {
//         const loggedInUser = localStorage.getItem("user");
//         if (loggedInUser) {
//             setUser(loggedInUser);
//         }
//     }, []);

//     useMotionValueEvent(scrollY, "change", (latest) => {
//         const previous = scrollY.getPrevious();
//         setHidden(latest > previous && latest > HIDE_THRESHOLD);
//     });

//     const toggleMenu = () => setShow(prev => prev === "show" ? "" : "show");
//     const toggleSubMenu = () => setSubMenu(prev => !prev);

//     return (
//         <motion.header 
//             variants={headerVariant}
//             animate={(hidden && !FullScreen) ? "hidden" : "visible"}
//             className={`z-[9999] fixed right-0 left-0 top-0 bg-white ${!token && "md:bg-opacity-50"} px-2 py-2 md:px-10 flex items-center ${token ? "gap-10" : "justify-between"}`}>
//             <div>
//                 <Link to="/">
//                     <motion.img 
//                         initial={{ x: -100, opacity: 0 }}
//                         animate={{ x: 0, opacity: 1 }}
//                         transition={{ type: "spring", stiffness: 260, duration: 2 }}
//                         src={LOGO}
//                         className="md:w-[200px] w-[130px]"
//                         alt="Logo"
//                     />
//                 </Link>
//             </div>

//             {token && <SearchCourseInput />}

//             {token ? (
//                 currentUser && (
//                     <AuthenticatedNav 
//                         {...currentUser}
//                         show={show}
//                         fixed={fixed}
//                         signout={handleSignOut}
//                         FullScreen={FullScreen}
//                     />
//                 )
//             ) : (
//                 <GuestNav 
//                     show={show}
//                     fixed={fixed}
//                     subMenu={subMenu}
//                     displaySubMenu={toggleSubMenu}
//                     FullScreen={FullScreen}
//                 />
//             )}

//             <div className="flex items-center gap-3">
//                 {/* Login Button (Guest only) */}
//                 {!token && (
//                     <Link to="/login" className='md:block hidden'>
//                         <button className="border-2 border-BLUE hover:bg-transparent hover:text-BLUE duration-300 bg-BLUE text-white px-1 py-1 md:px-4 md:py-3 rounded-md md:rounded-3xl font-semibold">
//                             Login
//                         </button>
//                     </Link>
//                 )}

//                 <div className="flex items-center gap-6">
//                     <Link to="/checkout">
//                         <CartIcon itemCount={cartItem?.length} />
//                     </Link>

//                     <div className="flex-1 block md:hidden hamburger">
//                         {show === "show" ? (
//                             <FaXmark size={20} onClick={toggleMenu} />
//                         ) : (
//                             <FaBarsStaggered size={20} onClick={toggleMenu} />
//                         )}
//                     </div>

//                     {token && currentUser && (
//                         <UserDropdown 
//                             {...currentUser}
//                             signout={handleSignOut}
//                             FullScreen={FullScreen}
//                         />
//                     )}
//                 </div>
//             </div>
//         </motion.header>
//     );
// };



// UserAvatar.propTypes = {
//     initial: PropTypes.string.isRequired,
//     animate: PropTypes.bool,
// };

// CartIcon.propTypes = {
//     itemCount: PropTypes.number,
// };

// UserDropdown.propTypes = {
//     initial: PropTypes.string.isRequired,
//     fullname: PropTypes.string,
//     email: PropTypes.string,
//     signout: PropTypes.func,
//     FullScreen: PropTypes.bool
// };

// GuestNav.propTypes = {
//     show: PropTypes.string,
//     fixed: PropTypes.string,
//     subMenu: PropTypes.bool,
//     displaySubMenu: PropTypes.func,
//     FullScreen: PropTypes.bool
// };

// AuthenticatedNav.propTypes = {
//     show: PropTypes.string,
//     fixed: PropTypes.string,
//     initial: PropTypes.string.isRequired,
//     fullname: PropTypes.string,
//     email: PropTypes.string,
//     signout: PropTypes.func,
// };

// export default NavBar;