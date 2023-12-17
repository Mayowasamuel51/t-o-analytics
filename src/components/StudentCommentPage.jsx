import { FaPaperPlane } from "react-icons/fa";

const StudentCommentPage = () => {
  return (
    <div className='p-2 lg:p-5'>
      <textarea className='p-2 w-full border-[1px] border-black' placeholder='Type your Comments' name="" id="" cols="30" rows="10"></textarea>
      <button className='my-2 bg-BLUE px-3 py-2 md:px-4 md:py-3 font-semibold text-white flex items-center gap-2'><FaPaperPlane /> Comment</button>
    </div>
  )
}

export default StudentCommentPage