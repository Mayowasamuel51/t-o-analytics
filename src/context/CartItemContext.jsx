import { createContext, useState, useContext } from "react";
import COURSES from "../coursesAPI/api";
import { useParams, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useStateContext } from "./ContextProvider";

const CartItemContext = createContext();

export const CartItemProvider = ({ children }) => {
    const { token } = useStateContext();
    const { course } = useParams();
    const location = useLocation();
    const [cartItem, setCartItem] = useState(() => {
        if (localStorage.getItem("COURSE-CART"))
            return JSON.parse(localStorage.getItem("COURSE-CART")) || [];
    });
    const [stockOptionIndex, setStockOptionIndex] = useState(() => {
        if (location.pathname === "/courses/stock%20&%20options") return null;
        else return;
    });
    const singleCourse = COURSES?.find(
        (C) => C.courseName.toLowerCase() === course
    );
    const stockAndOptions = COURSES?.find(
        (C) =>
            C.courseName === singleCourse.courseName &&
            location.pathname === "/courses/stock%20&%20options"
    );
    const stockAndOptionsData =
        stockAndOptions?.otherSubCourses[stockOptionIndex];
    const addToCartItem = (id) => {
        if (!cartItem.some((item) => item.id === id) && singleCourse.id === id) {
            toast.success(`successfully added to cartItem`);
            setCartItem((prev) => [...prev, singleCourse]);
        }
        if (
            singleCourse?.otherSubCourses.some((item) => item.id === id) &&
            !cartItem.some((item) => item.id === id)
        ) {
            toast.success(`successfully added to cartItem`);
            setCartItem((prev) => [...prev, stockAndOptionsData]);
        }
    };
    console.log(course)
    return (
        <CartItemContext.Provider
            value={{
                singleCourse,
                stockAndOptionsData,
                token,
                cartItem,
                addToCartItem,
                location,
                stockOptionIndex,
                setStockOptionIndex,
            }}
        >
            {children}
        </CartItemContext.Provider>
    );
};

export const CARTCONTEXT = () => useContext(CartItemContext);
