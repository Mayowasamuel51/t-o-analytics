import axios from 'axios';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
const api = 'http://localhost:8000/'
const ContactPage = () => {
  return (
    <section className="bg-white py-32 md:px-10 px-2 text-2xl md:text-4xl">
        <div className="grid md:grid-cols-2 grid-col-1">
            <div className="text-center">
                <p className="md:text-lg">Need any information? Reach us on</p>
                <p className="text-BLUE font-black my-3">443-768-8416</p>
            </div>
            <div className="p-8 bg-BLUE rounded-xl">
                <h1 className="text-white font-bold text-sm md:text-2xl mb-10 text-center">How may we help you?</h1>
                <form action="" className="bg-BLUE">
                    <div className="mb-7 block">
                        <input className="text-white placeholder:font-semibold font-medium px-2 py-3 rounded-md w-full bg-transparent border-[1px] text-sm md:text-lg border-textColor my-2 focus:outline-1 outline-offset-2 focus:outline-textColor" type="text" name="" id="" placeholder="Name"/>
                    </div>
                    <div className="mb-7 block">
                        <input className="text-white placeholder:font-semibold font-medium px-2 py-3 rounded-md w-full bg-transparent border-[1px] text-sm md:text-lg border-textColor my-2 focus:outline-1 outline-offset-2 focus:outline-textColor" type="text" name="" id="" placeholder="Email"/>
                    </div>
                    <div className="mb-7 block">
                        <input className="text-white placeholder:font-semibold font-medium px-2 py-3 rounded-md w-full bg-transparent border-[1px] text-sm md:text-lg border-textColor my-2 focus:outline-1 outline-offset-2 focus:outline-textColor" type="text" name="" id="" placeholder="Phone Number"/>
                    </div>
                    <div className="mb-2 block">
                        <textarea className="text-white placeholder:font-semibold font-medium px-2 py-3 rounded-md w-full bg-transparent border-[1px] text-sm md:text-lg border-textColor my-2 focus:outline-1 outline-offset-2 focus:outline-textColor h-[150px]" name="" id="" cols="30" rows="10" placeholder="What would you Link to Tell us..."></textarea>
                    </div>
                    <button className="text-xl font-semibold bg- text-white px-2 py-1 md:px-4 md:py-3 rounded-lg md:rounded-xl border-textColor border-[1px]">Submit</button>
                </form>
            </div>
        </div>
    </section>
  )
}

export default ContactPage