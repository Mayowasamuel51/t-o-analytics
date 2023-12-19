import { useState } from "react";
import FetchMessage from "../hook/FetchMessage"
import { FaMessage, FaXmark } from "react-icons/fa6";

const Messages = () => {
  const [message, setMessage] = useState(false)
    const {data} = FetchMessage()
    console.log(data?.data?.response)
  return (
    <div className="fixed hei flex flex-col gap-5 top-[40%] left-2 bg-whte z-50">
      {!message && <FaMessage size={40} className="animate-bounce cursor-pointer" onClick={()=> setMessage(true)} />}
      {data?.data?.response.map((msg, index)=> message && (
      <div key={index} className="relative w-fit md:p-4 rounded-md shadow-xl bg-white opacity-100 backdrop-blur-0 font-bold whitespace-nowrap">
        <p>from @admin</p>
        <p className="md:my-2 border-l-4 border-BLUE md:pl-2">{msg.message}</p>
        <p>date:   </p>
        <FaXmark className="absolute top-0 right-0 cursor-pointer" size={20} onClick={()=> setMessage(false)} />
      </div>))}
    </div>
  )
}

export default Messages