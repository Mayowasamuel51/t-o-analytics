import NavBar from "./components/NavBar";
import errorPage from "./components/errorPage";
import HomePage from "./pages/HomePage";
import Courses from "./pages/Courses";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    errorElement: <errorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "/courses",
        element: <Courses />
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
  {
    path: "/createAccount",
    element: <CreateAccountForm />
  },
  {
    path: "/login",
    element: <LoginForm />
  },
  {
    path: "/contractors",
    element: <ConnectWithContractor />,
  },
]);


function App() {
  return (
    <AnimatePresence>
      <RouterProvider router={router} />
    </AnimatePresence>
  );
}

export default App;
