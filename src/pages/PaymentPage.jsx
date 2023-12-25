import { useState, useEffect, useContext } from "react";
import React from "react";
import { Navigate } from "react-router-dom"
import { ReactDOM } from "react";
import { PayPalScriptProvider, PayPalButtons, } from "@paypal/react-paypal-js";
import axios from "axios";
const api = import.meta.env.VITE_BACKEND_PAY
import CartItemContext from "../context/CartItemContext";
import { useStateContext } from "../context/ContextProvider";

const PaymentPage = () => {
  const { token } = useStateContext();
  const {cartItem, setCartItem} = useContext(CartItemContext);
  const studentName = window.localStorage.getItem('user')
  const [message, setMessage] = useState("");
  const [totalcart, setTotalCart] = useState([])
  var totalcartitem = 110;
  let totalFinalPayment;
  let courseName;
  let orderDetail = []
  const checkoutfunction = () => {
    // when users trys to pay only one course it works
    if (cartItem.length === 1) {
      const singleCourse = cartItem[0];
      totalFinalPayment = singleCourse.price;
      courseName = singleCourse.courseName;

      orderDetail.push({courseName, totalFinalPayment, completelyPaid: false, isPending: true})
      console.log('only one course ' + courseName + totalFinalPayment)
      alert(`${studentName} is trying to buy ${cartItem.length} ${courseName} courses with a total of $${totalFinalPayment}.`)
    }

    else if (cartItem.length > 1) {
      totalFinalPayment = cartItem.reduce((acc, cur) => acc + cur.price, 0);
      const allCourses = cartItem.map(course => course.courseName)
      if (cartItem.length <= 3) {
        courseName = cartItem.map(course => course.courseName || course.name).join(', ');
      } else {
        const firstCourses = cartItem.slice(0, cartItem.length - 1).map(course => course.courseName || course.name).join(', ');
        const lastCourse = cartItem[cartItem.length - 1].courseName || cartItem[cartItem.length - 1].name;
        courseName = `${firstCourses} and ${lastCourse}`;
      }
      alert(`${studentName} is trying to buy ${courseName} courses with a total of $${totalFinalPayment}.`)
      console.log('more than one course' + cartItem)
    }

    // when users trys to pay many course at once it still works 
    // const totalcart = cartItem.reduce((acc, value) => {
    //   return acc + value.price
    // }, 0)

    // console.log(totalcart)
  }
  // const createOrder = (data, actions) => {
  //   const totalPrice = cartItem.reduce((acc, item) => {
  //     return acc + item.price;
  //   }, 0);


  //   return actions.order.create({
  //     purchase_units: [
  //       {
  //         amount: {
  //           value:totalPrice
  //           // value: "0.1"
  //         }
  //       }
  //     ]
  //   })
  // }
  const orderdata = {
    courseName: '',
    studentName: studentName,
    payment_mode: 'Paypal',
    payment_id: '',
  }

  // const onApprove = () => {
  //   return actions.order.capture().then((details) => {
  //     console.log(details)
  //     orderdata.payment_id = details.id
  //     axios.post(`${api}api/order`, orderdata).then((res) => {
  //       if (res.status === 201) {
  //         alert("payment is done")
  //       }
  //     }).catch((err) => alert(err.message))
  //   })
  // }

  const initialOptions = {
    "client-id": import.meta.env.VITE_clientId,
    "enable-funding": "paylater,venmo,card",
    "disable-funding": "",
    "data-sdk-integration-source": "integrationbuilder_sc",
  };
  const createOrder = async () => {
    // always remove the the cart infomation after sending to the backend for payment 
    if (cartItem.length === 1) {
      cartItem.forEach((item) => {
        totalFinalPayment += item.price
        courseName += item.courseName
        console.log(courseName, totalFinalPayment)
      })

    } else if (cartItem.length > 1) {
      // we use a map 
      // const test = cartItem.map((items) => {
      //   totalFinalPayment += items.price;
      //   courseName = items.courseName
      //   return courseName 
      // })
      // console.log(test)
      const test =  cartItem.forEach((item) => {
          totalFinalPayment = item.price
          courseName = item.courseName
          console.log(courseName, totalFinalPayment)
      })
      console.log(test)
      // console.log('more than one course   ' + cartItem)
    }
    try {
      const response = await fetch(`${api}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // use the "body" param to optionally pass additional order information
        // like product ids and quantities

        // grab the courseName , coursePrice , studentgmail, 
        body: JSON.stringify({
          cart: [
            {
              courseName: courseName,
              price: totalFinalPayment
            },
          ],
        }),
      });

      const orderData = await response.json();

      if (orderData.id) {
        return orderData.id;
      } else {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);

        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(error.message);
      setMessage(`Could not initiate PayPal Checkout...${error}`);
    }
  }


  const onApprove = async (data, actions) => {

    try {
      const response = await fetch(
        `${api}api/orders/${data.orderID}/capture`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const orderData = await response.json();
      // Three cases to handle:
      //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
      //   (2) Other non-recoverable errors -> Show a failure message
      //   (3) Successful transaction -> Show confirmation or thank you message

      const errorDetail = orderData?.details?.[0];

      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
        // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
        // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
        return actions.restart();
      } else if (errorDetail) {
        // (2) Other non-recoverable errors -> Show a failure message
        throw new Error(
          `${errorDetail.description} (${orderData.debug_id})`,
        );
      } else {
        // (3) Successful transaction -> Show confirmation or thank you message
        // Or go to another URL:  actions.redirect('thank_you.html');
        const transaction =
          orderData.purchase_units[0].payments.captures[0];
        setMessage(
          `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`,
        );
        console.log(
          "Capture result",
          orderData,
          JSON.stringify(orderData, null, 2),
        );
      }
    } catch (error) {
      console.error(error);
      setMessage(
        `Sorry, your transaction could not be processed...${error}`,
      );
    }
  }
  if (!token) return <Navigate to="/" />
  return (
    <section className="min-h-screen payment-page">
      <div className="p-2 md:p-10">
        <div>
          <h1 className="font-bold md:text-xl">Checkout</h1>
          <p className="my-5 text-slate-500">billing Address</p>
        </div>

        <h1 className="font-bold md:text-lg my-6">PAYMENT METHOD</h1>
        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons
            style={{
              shape: "rect",
              layout: "vertical",
            }}
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data) => onApprove(data, actions)}

          />
        </PayPalScriptProvider>
        <Message content={message} />
        {/* <button className="font-bold w-full border-[1px] border-BLUE py-2 text-BLUE bg-white rounded-2xl"> */}
        {/* Pay With Paypal */}
        {/* </button> */}

        <h1 className="font-bold md:text-lg my-6">Order Details</h1>
        <div className="md:col-span-2">
          {cartItem.map((item) => (
            <div key={item.id} className="py-4 px-2">
              <div className="flex items-start gap-2 md:gap-10">
                <div>
                  {item.image ? <img
                    src={item.image}
                    className="w-12 aspect-square object-cover rounded-md"
                    alt=""
                  /> : (<div className="w-12 aspect-square bg-BLUE rounded-md"></div>)}
                </div>
                <div className="grow-[3]">
                  <p className="font-black">{item.courseName || item.name}</p>
                  <p className="text-xs">{item.intro}</p>
                  <p className="text-sm font-medium line-clamp-1">
                    {item.description}
                  </p>
                </div>
                <div>
                  <p className="font-black">${item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-2 md:p-10">
        <h1 className="font-bold md:text-xl">Summary</h1>
        <div className="flex items-center justify-between my-5">
          <p className="font-bold md:text-md">Original Price</p>
          <p>
            $
            {cartItem
              .map((price) => price.price)
              .reduce((acc, cur) => acc + cur, 0)}
          </p>
        </div>
        <div className="flex items-center justify-between my-5">
          <p className="font-bold md:text-md">Total</p>
          <p className="font-black md:text-lg">
            $
            {cartItem
              .map((price) => price.price)
              .reduce((acc, cur) => acc + cur, 0)}
          </p>
        </div>
        <div>
          <button onClick={checkoutfunction} className="duration-300 bg-BLUE hover:bg-white border-2 border-BLUE hover:text-BLUE w-full text-white font-bold py-3 rounded-xl">COMPLETE CHECKOUT</button>
        </div>
      </div>
    </section>
  );
}
export default PaymentPage;


function Message({ content }) {
  return <p>{content}</p>;
}

