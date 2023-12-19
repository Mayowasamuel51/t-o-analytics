import { FaPaperPlane } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from "yup"
import { ToastContainer, toast } from 'react-toastify';
import FetchComments from "../hook/FetchComments";
import Loader from "./Loader";

const api = import.meta.env.VITE_BACKEND_MESSAGE_P
const SendMessages = () => {
  const {data: message, isLoading, error} = FetchComments()
  const notify = () => toast("Your message will be delivered to all students!!");
  const schema = yup.object().shape({
    message: yup.string().required(),

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
  if (error) return <p className='text-center text-red-500 md:text-3xl font-black'>{error.message}</p>
  if (isLoading) return <Loader />
  return (
    <div className='p-2 lg:p-5'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ToastContainer />
        <textarea  {...register("message", { required: true })} className='p-2 w-full border-[1px] border-black' placeholder='Type your message' name="message" id="" cols="30" rows="10"></textarea>
        <button type="submit" className='my-2 bg-BLUE px-3 py-2 md:px-4 md:py-3 font-semibold text-white flex items-center gap-2'><FaPaperPlane /> Send Message</button>
        <p className='text-red-600'>{errors.message?.message}</p>
      </form>
      <p className="font-semibold">
        This section is designated for sending general messages to all students.
      </p>

      <div className="mt-10">
        <h1 className="font-bold text-sm md:text-2xl">COMMENTS FROM STUDENTS</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {message?.data?.response.map((comment, index)=> (
            <div key={index} className="bg-textColor p-2 rounded-sm">
              <p className="break-all">{comment.message}</p>
              <p>{(new Date(comment.date)).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SendMessages