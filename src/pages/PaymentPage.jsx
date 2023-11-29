
const PaymentPage = () => {
  return (
    <section className="min-h-screen payment-page">
        <div className="">
            <h1>Checkout</h1>
            <p>billing Address</p>


            <p>PAYMENT METHOD</p>
            <button>Pay With Paypal</button>
        </div>
        <div className="">
            <h1>Summary</h1>
            <div>
                <p>Original Price</p>
                <p>$5000</p>
            </div>
            <div>
                <p>Total</p>
                <p>$5000</p>
            </div>
        </div>
    </section>
  )
}

export default PaymentPage