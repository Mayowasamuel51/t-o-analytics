import { useState } from "react";
import FetchMessage from "../hook/FetchMessage"
import { FaMessage, FaXmark } from "react-icons/fa6";
import { motion } from "framer-motion"

const messageVariant = {
  initial: {
    x: "-100%",
    opacity: 0,
  },
  final: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring", stiffness:250
    }
  }
}

const Messages = () => {
  const [message, setMessage] = useState(false)
    const {data} = FetchMessage()
    console.log(data?.data?.response)
  return (
    <div className="fixed hei flex flex-col gap-5 top-[30%] left-2 bg-whte z-50">
      <FaMessage size={40} className={`${message && "invisible opacity-0"} animate-bounce cursor-pointer`} onClick={()=> setMessage(true)} />
      {data?.data?.response.map((msg, index)=> (
      <motion.div variants={messageVariant} animate={message ? "final" : "initial"} key={index} className="relative w-fit md:p-4 rounded-md shadow-2xl bg-white font-bold whitespace-nowrap">
        <p className="flex items-center gap-9">from @admin<FaXmark className="cursor-pointer" size={20} onClick={()=> setMessage(false)} /></p>
        <p className="md:my-2 border-l-4 border-BLUE md:pl-2">{msg.message}</p>
        <p>date:   </p>
      </motion.div>))}
    </div>
  )
}

export default Messages