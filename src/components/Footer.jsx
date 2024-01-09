import PropTypes from 'prop-types';
import { MdCall } from "react-icons/md";
import { IoMdMail } from "react-icons/io"

import { useStateContext } from '../context/ContextProvider';
import { NavLink } from 'react-router-dom';


const Footer = ({black}) => {
    const { token } = useStateContext();
  return (
    <footer className={`${black}`}>
        <div className="p-2 md:px-10 py-10 md:py-8 flex items-center flex-col gap-10 md:flex-row md:justify-between">
            <div className="group text-center md:leading-8 leading-6">
                <h1 className="md:text-xl text-BLUE font-bold flex justify-center gap-2 items-center"> <MdCall size={30} className='group-hover:animate-bounce' />CALL</h1>
                <a href="tel:443-768-8416">
                    <p className="font-black text-md md:text-2xl duration-300 hover:text-BLUE">443-768-8416</p>
                </a>
                <p className="font-light text-sm md:text-base">Get instant response</p>
            </div>
            <div className="group text-center md:leading-8 leading-6">
                <h1 className="md:text-xl text-BLUE font-bold flex justify-center gap-2 items-center"><IoMdMail size={30} className='group-hover:animate-bounce' /> EMAIL</h1>
                <a href="mailto:t.oanalyticsllc@gmail.com">
                    <p className="font-black text-md md:text-xl duration-300 hover:text-BLUE">t.oanalyticsllc@gmail.com</p>
                </a>
                <p className="font-light text-sm md:text-base">Get response within 24 hours</p>
            </div>
            {token && 
            <div className='text-center lg:text-left'>
                <h1 className='font-bold'>Useful Links</h1>
                <ul>
                    <li>
                        <NavLink className={({isActive})=> isActive ? "font-black text-BLUE scale-110" : "scale-100 hover:text-BLUE"} to="/about">About</NavLink>
                    </li>
                    <li>
                        <NavLink className={({isActive})=> isActive ? "font-black text-BLUE scale-110" : "scale-100 hover:text-BLUE"} to="/blog">Blog</NavLink>
                    </li>
                    <li>
                        <NavLink className={({isActive})=> isActive ? "font-black text-BLUE scale-110" : "scale-100 hover:text-BLUE"} to="/contact">Contact</NavLink>
                    </li>
                    <li>
                        <NavLink to="/career" className={({isActive})=> isActive ? "font-black text-BLUE scale-110" : "scale-100 hover:text-BLUE"}>Career</NavLink>
                    </li>
                    <li>
                        <NavLink to="/partner" className={({isActive})=> isActive ? "font-black text-BLUE scale-110" : "scale-100 hover:text-BLUE"}>Partners</NavLink>
                    </li>
                </ul>
            </div>
            }
        </div>
        <div className="">
            <p className="flex items-center justify-center gap-2 text-center text-xs md:text-base font-medium tracking-wide"><span className="font-extralight text-xl md:text-3xl">&copy;</span> T.O Analytics {(new Date()).getFullYear()}, All Rights Reserved</p>
        </div>
    </footer>
  )
}

Footer.propTypes = {
    black: PropTypes.string,
};

export default Footer;