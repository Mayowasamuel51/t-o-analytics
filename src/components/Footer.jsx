const Footer = ({black}) => {
  return (
    <footer className={`${black}`}>
        <div className="p-2 md:px-10 md:py-5 flex items-center flex-col gap-10 md:flex-row md:justify-between">
            <div className="text-center md:leading-8 leading-6">
                <h1 className="md:text-xl text-BLUE font-bold">CALL</h1>
                <a href="tel:443-768-8416">
                    <p className="font-black text-md md:text-2xl duration-300 hover:text-BLUE">443-768-8416</p>
                </a>
                <p className="font-light text-sm md:text-base">Get instant response</p>
            </div>
            <div className="text-center md:leading-8 leading-6">
                <h1 className="md:text-xl text-BLUE font-bold">EMAIL</h1>
                <a href="mailto:t.oanalyticsllc@gmail.com">
                    <p className="font-black text-md md:text-xl duration-300 hover:text-BLUE">t.oanalyticsllc@gmail.com</p>
                </a>
                <p className="font-light text-sm md:text-base">Get response within 24 hours</p>
            </div>
        </div>
        <div className="py-3">
            <p className="flex items-center justify-center gap-2 text-center text-xs md:text-base font-medium tracking-wide"><span className="font-extralight text-3xl">&copy;</span> T.O Analytics 2023, All Rights Reserved</p>
        </div>
    </footer>
  )
}

export default Footer;