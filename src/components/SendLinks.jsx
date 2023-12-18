import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import axios from 'axios';
import * as yup from "yup"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";
const api_splunk = import.meta.env.VITE_BACKEND_LIVE_SPLUNK;
const api_educational = import.meta.env.VITE_BACKEND_LIVE_EDUCATIONAL;

const SendLinks = () => {
  const [educational, setEducational] = useState("");
  const hanldeInput = (e) => {
    setEducational(e.target.value)
  }
  const notify = () => toast("Splunk Live Session sent to paid Splunk Users!!");

  const schema = yup.object().shape({
    splunk: yup.string().required(),
  });
  const schema_e = yup.object().shape({
    educational: yup.string().required(),
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
      course: data.course
    }
    axios.post(`${api_splunk}`, payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then((res) => {
      if (res.status === 201 || res.status === 200) {
        notify()
        navigate('/ADMIN-DASHBOARD')
      }
    }).catch(err => {
      const response = err.response
      if (response.status === 422) {
        setError(response.data.message)
      } else if (response.status === 403) {
        setCheckPassword(response.data.message)
        setError(response.data.message)
      }

    })

  }

  const onSubmitE = (data) => {
    console.log(data)
    const payload = {
      messages: data.message
    }
    axios.post(`${api}`, payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then((res) => {
      if (res.status === 201 || res.status === 200) {

        notify()
        navigate('/ADMIN-DASHBOARD')
      }
    }).catch(err => {
      const response = err.response
      if (response.status === 422) {
        setError(response.data.message)
      } else if (response.status === 403) {
        setCheckPassword(response.data.message)
        setError(response.data.message)
      }

    })

  }

  return (
    <div className='p-2 lg:p-5'>
      <div className='mb-4 lg:mb-7'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ToastContainer />
          <label htmlFor="splunk-link" className='font-bold text-lg lg:text-2xl'>Splunk
            <input  {...register("splunk", { required: true })} placeholder="Send google meet link or zoom to  paid student for splunk   course" className='w-full border-[1px] border-black h-10 lg:h-12 pl-5 my-2 font-medium text-base lg:text-xl' name='splunk' type="url" />
          </label>
          <button type="submit" className='my-2 bg-BLUE px-3 py-2 md:px-4 md:py-3 font-semibold text-white'>Send</button>
          <p className='text-red-600'>{errors.splunk?.message}</p>
        </form>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmitE)}>
          <label htmlFor="edu-link" className='font-bold text-lg lg:text-2xl'>Educational Consulting
            <input placeholder="Send google meet link or zoom link to  paid student for Educational course" className='w-full border-[1px] border-black h-10 lg:h-12 pl-5 my-2 font-medium text-base lg:text-xl' name="edu-link" type="text" />
          </label>
          <button className='my-2 bg-BLUE px-3 py-2 md:px-4 md:py-3 font-semibold text-white'>Send</button>
          {/* <p className='text-red-600'>{errors.educational?.message}</p> */}
        </form>
      </div>
    </div>
  )
}

export default SendLinks;