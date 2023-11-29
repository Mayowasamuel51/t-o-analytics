import { useState, useEffect } from "react";


const PaymentPage = () => {
    const [cartItem, setCartItem] = useState([])
    useEffect(()=> {
        const data = JSON.parse(localStorage.getItem("COURSE-CART")) || []
        setCartItem(data)
    }, [])

  return (
    <section className="min-h-screen payment-page">
        <div className="p-2 md:p-10">
            <h1 className="font-bold md:text-lg">Checkout</h1>
            <p className="my-5 text-slate-500">billing Address</p>

            <h1 className="font-bold md:text-lg my-6">PAYMENT METHOD</h1>
            <button className="font-bold w-full border-[1px] border-BLUE py-2 text-BLUE bg-white rounded-2xl">Pay With Paypal</button>

            <h1 className="font-bold md:text-lg my-6">Order Details</h1>
            <div className="md:col-span-2">
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
                  <p className="font-black">${item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
        <div className="md:p-10">
            <h1 className="font-bold md:text-lg">Summary</h1>
            <div className="flex items-center justify-between my-5">
                <p className="font-bold md:text-md">Original Price</p>
                <p>${cartItem.map((price)=> price.price).reduce((acc, cur)=> acc + cur , 0)}</p>
            </div>
            <div className="flex items-center justify-between my-5">
                <p className="font-bold md:text-md">Total</p>
                <p className="font-black md:text-lg">${cartItem.map((price)=> price.price).reduce((acc, cur)=> acc + cur , 0)}</p>
            </div>
        </div>
    </section>
  )
}

export default PaymentPage