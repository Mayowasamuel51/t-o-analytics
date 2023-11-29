import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useStateContext } from "../context/ContextProvider"

const CheckOut = () => {
  const [cartItem, setCartItem] = useState([])
  const { token } = useStateContext();
  const navigate = useNavigate();
  const checkOut = ()=> {
    if (!token) {
      navigate("/createAccount")
    }
    else {
      navigate("/dashboard/makePayment")
    }
  }
    useEffect(()=> {
      const data = JSON.parse(localStorage.getItem("COURSE-CART")) || []
      setCartItem(data)
    }, [])
    const removeCourse = (id) => {
      const updatedCart = cartItem.filter((item) => item.id !== id);
      setCartItem(updatedCart);
      localStorage.setItem("COURSE-CART", JSON.stringify(updatedCart));
    };
    useEffect(() => {
      const data = JSON.parse(localStorage.getItem("COURSE-CART")) || [];
      setCartItem(data);
    }, []);
    
    
  return (
    <div className="md:px-10 px-2 pt-32 pb-20">
      <h1 className="text-xl md:text-4xl font-black my-4">SHOPPING CART</h1>
      <div>
        <p className="font-semibold text-md">{cartItem.length} {cartItem.length > 1 ? "COURSES" : "COURSE"} in cart </p>
      </div>
      <section className="grid md:grid-cols-3 grid-cols-1 gap-10">
        <div className="cart-items md:col-span-2">
          {cartItem.map((item)=> (
            <div key={item.id} className="py-4 px-2">
              <div className="flex items-start gap-2 md:gap-10">
                <div>
                  <img src={item.image} className="w-14 aspect-square object-cover" alt="" />
                </div>
                <div className="grow-[3]">
                  <p className="font-black">{item.courseName}</p>
                  <p className="text-xs">{item.intro}</p>
                  <p className="text-sm font-medium line-clamp-1">{item.description}</p>
                </div>
                <div>
                  <button onClick={()=> removeCourse(item.id)} className="font-bold text-xs text-BLUE">REMOVE</button>
                </div>
                <div>
                  <p className="font-black">${item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-2 mb-3">
          <div className="my-8">
            <h1 className="text-slate-600 text-sm font-bold">TOTAL:</h1>
            <p className="font-black text-2xl">${cartItem.map((price)=> price.price).reduce((acc, cur)=> acc + cur , 0)}</p>
          </div>
          <button onClick={checkOut} className="bg-BLUE hover:bg-white border-2 border-BLUE hover:text-BLUE w-full text-white font-bold py-3">CHECKOUT</button>
        </div>
      </section>
    </div>
  )
}

export default CheckOut