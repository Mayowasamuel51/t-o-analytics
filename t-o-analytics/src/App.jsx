import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import Courses from "./pages/Courses";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "/courses",
        element: <Courses />
      }
    ]
  },
]);


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
