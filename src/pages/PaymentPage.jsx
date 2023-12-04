import { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
const api = 'http://localhost:8000'
const PaymentPage = () => {
  const [message, setMessage] = useState("");
  const [cartItem, setCartItem] = useState([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("COURSE-CART")) || [];
    setCartItem(data);
    console.log(data)
  }, []);
  const initialOptions = {
    "client-id": "AXTaMJvDyHKb0JdWMYxjQRWK_-hQB6bjF7oM_r2TSACTTUPK9eRDrRiIb701IbMs_Sp4HERH1hQAXXT_",
    "enable-funding": "paylater,venmo,card",
    "disable-funding": "",
    "data-sdk-integration-source": "integrationbuilder_sc",
  };
  const createOrder = async () => {
    const pickItem = cartItem
    try {
      const response = await fetch(`${api}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // use the "body" param to optionally pass additional order information
        // like product ids and quantities
        
        // grab the courseName , have a 
        body: JSON.stringify({
          cart: [
            {
              id:cartItem[0].id,
              quantity:1,
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
        `${api}/api/orders/${data.orderID}/capture`,
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
            createOrder={(data) => createOrder()}
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
                    className="w-14 aspect-square object-cover"
                    alt=""
                  /> : (<div className="w-14 aspect-square bg-BLUE"></div>)}
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
          <button className="duration-300 bg-BLUE hover:bg-white border-2 border-BLUE hover:text-BLUE w-full text-white font-bold py-3 rounded-xl">COMPLETE CHECKOUT</button>
        </div>
      </div>
    </section>
  );
}
export default PaymentPage;


function Message({ content }) {
  return <p>{content}</p>;
}

