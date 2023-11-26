import NavBar from "./components/NavBar";
import ErrorPage from "./components/errorPage";
import HomePage from "./pages/HomePage";
import Courses from "./pages/Courses";
import AllCourses from "./components/AllCourses";
import Splunk from "./components/Splunk";
import Linux from "./components/Linux";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import ConnectWithContractor from "./pages/ConnectWithContractor";
import CreateAccountForm from "./pages/CreateAccountForm";
import LoginForm from "./pages/LoginForm";
import { AnimatePresence } from "framer-motion";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomeLayout from "./layoutAuth/HomeLayout";
import AuthLayout from "./layoutAuth/AuthLayout";
import Dashboard from "./dashboard/components/Dashboard";

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
            path: "splunk",
            element: <Splunk />
          },
          {
            path: "linux",
            element: <Linux />
          }
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
    ]
  },
  // {
  //   path: "splunk",
  //   element: <Splunk />
  // },
  // {
  //   path: "linux",
  //   element: <Linux />
  // },
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
    element:<CreateAccountForm/>
  },
  {
    path: "/dashboard",
    element: <AuthLayout />,
    children: [
      {
        path: "/dashboard/post",
        element: <Dashboard />
      }
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
