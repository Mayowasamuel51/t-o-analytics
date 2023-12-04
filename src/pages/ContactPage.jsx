import axios from 'axios';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form"

import { useNavigate } from 'react-router-dom';
const api = 'http://localhost:8000/api/'
const ContactPage = () => {
    const notify = () => toast("Thanks for reaching out!");

    const schema = yup.object().shape({
        name: yup.string().required(),
        phone_number: yup.string().required(),
        message: yup.string().required(),
        email: yup.string().required(),
    });
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = (data) => {
        console.log(data)
        const payload = {
            name: data.name,
            message: data.message,
            number:data.phone_number,
            email: data.email
        }
        axios.post(`${api}contact`, payload, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res.status === 201 || res.status === 200) {
                notify()
                navigate('/dashboard')
            }
          
        }).catch(err => {
            const response = err.response
            if (response.status === 422) {
                console.log(response)
                console.log(response.data.message)
                setError(response.data.message)
            }
        })
    }

  return (
    <section className="bg-white py-32 md:px-10 px-2 text-2xl md:text-4xl">
        <div className="grid md:grid-cols-2 grid-col-1">
            <div className="text-center">
                <p className="md:text-lg">Need any information? Reach us on</p>
                <p className="text-BLUE font-black my-3">443-768-8416</p>
            </div>
            <div className="p-8 bg-BLUE rounded-xl">
                <h1 className="text-white font-bold text-sm md:text-2xl mb-10 text-center">How may we help you?</h1>
                  <form onSubmit={handleSubmit(onSubmit)} action="" className="bg-BLUE">
                  <ToastContainer />

                    <div className="mb-7 block">
                          <input     {...register("name", { required: true })} className="text-white placeholder:font-semibold font-medium px-2 py-3 rounded-md w-full bg-transparent border-[1px] text-sm md:text-lg border-textColor my-2 focus:outline-1 outline-offset-2 focus:outline-textColor" type="text" name="name" id="" placeholder="Name" />
                          <p className='text-red-600'>{errors.name?.message}</p>
                    </div>
                    <div className="mb-7 block">
                          <input     {...register("email", { required: true })} className="text-white placeholder:font-semibold font-medium px-2 py-3 rounded-md w-full bg-transparent border-[1px] text-sm md:text-lg border-textColor my-2 focus:outline-1 outline-offset-2 focus:outline-textColor" type="text"
                              name="email" id="" placeholder="Email" />
                          <p className='text-red-600'>{errors.email?.message}</p>
                    </div>
                    <div className="mb-7 block">
                          <input     {...register("phone_number", { required: true })} className="text-white placeholder:font-semibold font-medium px-2 py-3 rounded-md w-full bg-transparent border-[1px] text-sm md:text-lg border-textColor my-2 focus:outline-1 outline-offset-2 focus:outline-textColor" type="text" name="phone_number" id="" placeholder="Phone Number" />
                          <p className='text-red-600'>{errors.phone_number?.message}</p>
                    </div>
                    <div className="mb-2 block">
                          <textarea  {...register("message", { required: true })} className="text-white placeholder:font-semibold font-medium px-2 py-3 rounded-md w-full bg-transparent border-[1px] text-sm md:text-lg border-textColor my-2 focus:outline-1 outline-offset-2 focus:outline-textColor h-[150px]" name="message" id="" cols="30" rows="10" placeholder="What would you Link to Tell us..."></textarea>
                          <p className='text-red-600'>{errors.message?.message}</p>
                    </div>
                    <button className="text-xl font-semibold bg- text-white px-2 py-1 md:px-4 md:py-3 rounded-lg md:rounded-xl border-textColor border-[1px]">Submit</button>
                </form>
            </div>
        </div>
    </section>
  )
}

export default ContactPage