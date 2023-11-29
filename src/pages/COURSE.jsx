import { useParams, Link, useLocation } from "react-router-dom";
import { Toaster, toast } from 'sonner';
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import COURSES from "../coursesAPI/api"

const COURSE = () => {
  const location = useLocation()
  const [showModal, setShowModal] = useState("")
  const [stockOptionIndex, setStockOptionIndex] = useState(()=> {
    if (location.pathname === "/courses/stock%20&%20options") return 0
    else return;
  })
  const { course } = useParams();
  const [cartItem, setCartItem] = useState(()=> {
      let data = JSON.parse(localStorage.getItem("COURSE-CART")) || []
      return data
    }
  )
  const singleCourse = COURSES?.find((C)=> C.courseName.toLowerCase() === course)
  const stockAndOptions = COURSES?.find((course)=> course.courseName === singleCourse.courseName && location.pathname === "/courses/stock%20&%20options")
  const stockAndOptionsData = stockAndOptions?.otherSubCourses[stockOptionIndex]
  const addToCart = (id)=> {
    const item = cartItem.find((item)=> item.id === id)
    toast(`${item.courseName} successfully added to cart`)
    if (!cartItem.some((item)=> item.id === id)) {
      setCartItem(prev => [...prev, singleCourse])
    }
  }

  useEffect(()=> {
    localStorage.setItem("COURSE-CART", JSON.stringify(cartItem));
  },[cartItem]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("COURSE-CART")) || [];
    setCartItem(items);
  }, []);
  const showModalAction = ()=> {
    setShowModal("show")
  }
  const removeModalAction = ()=> {
    setShowModal("")
  }
  const stockAndOptionsFn = (index)=> {
    setStockOptionIndex(index)
  }
  return (
    <div className="">
      <section className="pt-10">
        <h1 className="font-bold text-center text-2xl md:text-4xl py-10 md:py-20">
          {singleCourse.courseName.toUpperCase()}
        </h1>
        <div className="px-2 md:px-10 py-10 md:py-16 grid grid-cols-1 gap-16 md:gap-0 md:grid-cols-2 bg-[#2d2065] text-white">
          <div className="w-full">
            <div className={`course-hover cursor-pointer`}>
              <h1 className={`font-semibold text-2xl md:text-4xl my-4 md:w-2/3`}>
                {singleCourse.intro}
                <AnimatePresence>
                    <motion.div onClick={()=> removeModalAction()} className={`${showModal} border-2 border-BLUE absolute text-black md:w-[500px] w-[350px] z-50 bg-white p-4 rounded-xl shadow-3xl`}>
                      <h1 className="text-center font-black text-md md:text-2xl">
                        {singleCourse.courseName}
                      </h1>
                      <p className="font-semibold text-sm md:text-md my-2">
                        {singleCourse.intro}
                      </p>
                      <div className="modal-learn learn">
                        <ul className="text-sm">
                          {singleCourse.whatToLearn.map((whatToLearn, index)=> (
                            <li className="text-md md:text-base" key={index}>{whatToLearn}</li>
                          ))}
                        </ul>
                      </div>
                      {cartItem.some((item)=> item.id === singleCourse.id) ? 
                      <Link to="/createAccount">
                        <button className="text-sm md:text-lg font-bold text-white bg-BLUE w-full my-4 px-2 py-1 md:py-2 rounded-lg hover:text-BLUE border-2 hover:bg-transparent border-BLUE duration-300">
                          BUY COURSE
                        </button>
                      </Link>
                      :
                      <button onClick={()=> addToCart(singleCourse.id)} className="text-sm md:text-lg font-bold text-white bg-BLUE w-full my-4 px-2 py-1 md:py-2 rounded-lg hover:text-BLUE border-2 hover:bg-transparent border-BLUE duration-300">
                        ADD TO CART
                      </button>
                      }  
                    </motion.div>
                </AnimatePresence>
              </h1>
            </div>
            <p className="md:w-1/2 w-full">
              {singleCourse.description}
            </p>
            <p className="my-6 font-bold md:text-3xl">${singleCourse.price}</p>
            <div className="flex md:block items-center md:gap-5 gap-2">
              <button onClick={()=>showModalAction()} className="md:hidden block hover:bg-transparent border-2 hover:text-BLUE border-textColor duration-300 hover:bg-white w-fit md:mx-auto text-md md:text-xl font-semibold bg-BLUE text-white px-3 py-2 md:px-4 md:py-3 rounded-md">
                View More
              </button>
              <Link className="block" to="/createAccount">
                <button className="hover:bg-transparent border-2 hover:text-BLUE border-textColor duration-300 hover:bg-white w-fit md:mx-auto text-md md:text-xl font-semibold bg-BLUE text-white px-3 py-2 md:px-4 md:py-3 rounded-md">
                  Buy Course
                </button>
              </Link>
            </div>
          </div>
          <div className="perks">
            <ul className="text-base md:text-xl md:font-medium">
              <li>BEGINNER FRIENDLY</li>
              <li>LIFETIME ACCESS</li>
              <li>EXERCISES</li>
              <li>ACCESS ON MOBILE & DESKTOP</li>
              <li>CERTIFICATION</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="px-2 md:px-10 py-10 md:py-20">
        <h1 className="font-bold text-2xl md:text-4xl">WHAT YOU’LL LEARN</h1>
        <div className="relative learn grid grid-cols-1 md:grid-cols-2 py-5">
          <ul className="md:text-base text-sm">
            {singleCourse.whatToLearn.map((whatToLearn, index)=> index < 6 && (
              <li onMouseEnter={()=> stockAndOptionsFn(index)} className="relative w-fit flex" key={index}>{whatToLearn}
                <div>
                  {location.pathname === "/courses/stock%20&%20options" && (
                    <p>{stockAndOptionsData.price}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <ul className="md:text-base text-sm">
            {singleCourse.whatToLearn.map((whatToLearn, index)=> index > 5 && (
              <li onMouseEnter={()=> stockAndOptionsFn(index)} className="w-fit" key={index}>{whatToLearn}</li>
            ))}
          </ul>
          {location.pathname === "/courses/stock%20&%20options" && (
            <div className="stock-and-options absolute w-[300px] md:w-[500px] bg-white shadow-lg rounded-lg p-3">
              <h2 className="font-black text-base">{stockAndOptionsData.name}</h2>
              <div>
                <p className="font-bold">${stockAndOptionsData.price}</p>
              </div>
              <div className="flex items-center gap-3 font-md text-xs">
                <p>{stockAndOptionsData.duration} course</p>
                <p className="">All levels</p>
              </div>
              <div className="my-3 text-sm">
                <p className="text-slate-400">{stockAndOptionsData.description}</p>
              </div>
              <div className="learn">
                <ul className="text-sm">
                  {stockAndOptionsData.whatToLearn.map((whatToLearn, index)=> (
                    <li key={index}>{whatToLearn}</li>
                  ))}
                </ul>
              </div>
              <div>
                <button className="w-full border-2 border-BLUE hover:bg-transparent hover:text-BLUE duration-300 bg-BLUE text-white px-1 py-1 md:px-2 md:py-2 rounded-md md:rounded-xl font-semibold">ADD TO CART</button>
              </div>
            </div>
          )}
        </div>
        <div className="py-5">
          <h1 className="font-bold text-2xl md:text-4xl my-8">
            No prior knowledge needed!
          </h1>
          <p>
            You do not need familiarity with {singleCourse.courseName} to take this course.
            Everything you need to know will be thought from scratch and step by
            step too.
          </p>
        </div>
      </section>

      <Toaster position="top-center" />
    </div>
  );
};

export default COURSE;
