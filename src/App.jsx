import ErrorPage from "./components/errorPage";
import HomePage from "./pages/HomePage";
import Courses from "./pages/Courses";
import AllCourses from "./components/AllCourses";
import COURSE from "./pages/COURSE";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import ConnectWithContractor from "./pages/ConnectWithContractor";
import MyCourses from "./pages/MyCourses";
import Mentorship from "./pages/Mentorship";
import LiveCourses from "./pages/LiveCourses";
import CreateAccountForm from "./pages/CreateAccountForm";
import LoginForm from "./pages/LoginForm";
import CheckOut from "./pages/CheckOut";
import { AnimatePresence } from "framer-motion";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomeLayout from "./layoutAuth/HomeLayout";
import AuthLayout from "./layoutAuth/AuthLayout";
import Dashboard from "./dashboard/components/Dashboard";
import DashboardCourses from "./dashboard/components/DashboardCourses";
import PaymentPage from "./pages/PaymentPage";
import { element } from "prop-types";
// import { ContextProvider } from "./context/ContextProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "/courses",
        element: <Courses />,
        children: [
          {
            index: true,
            element: <AllCourses />,
          },
          {
            path: ":course",
            element: <COURSE />
          },
        ]
      },
      {
        path: "/about",
        element: <AboutPage />
      },
      {
        path: "/blog",
        element: <BlogPage />
      },
      {
        path: "/contact",
        element: <ContactPage />
      },
      {
        path: "/checkout",
        element: <CheckOut />
      },
      {
        path: "/mentorship",
        element: <Mentorship />
      },
      {
        path: "/liveCourses",
        element: <LiveCourses />
      },
    ]
  },  
  {
    path: "/createAccount",
    element: <CreateAccountForm />
  },
  {
    path: "/contractors",
    element: <ConnectWithContractor />,
  },
  {
    path: "/login",
    element: <LoginForm />
  },
  {
    path: "/createAccount",
    element: <CreateAccountForm />
  },
  {
    path: "/dashboard",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <DashboardCourses />
      },
      {
        path: "checkout",
        element: <CheckOut />
      },
      {
        path: "myCourses",
        element: <MyCourses />
      },
      {
        path: "mentorship",
        element: <Mentorship />
      },
      {
        path: "links",
        element: <h1 className="min-h-screen flex justify-center items-center font-bold text-3xl">LINKS PAGE</h1>
      },
      {
        path: "makePayment",
        element: <PaymentPage />
      },
      {
        path: "/dashboard/post",
        element: <Dashboard />
      },
    ]
  }
]);


function App() {
  return (
    <AnimatePresence>
      <RouterProvider router={router} />
    </AnimatePresence>
  );
}

export default App;
