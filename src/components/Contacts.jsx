import FetchContacts from "../hook/FetchContacts";
import Loader from "./Loader";
import { useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import moment from "moment";

const Contacts = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(10)
  const { data, isLoading, error } = FetchContacts()

  if (error) return <p className='text-center text-red-500 md:text-3xl font-black'>{error.message}</p>
  if (isLoading) return <Loader />

  const lastPostIndex = currentPage * postsPerPage
  const firstPostIndex = lastPostIndex - postsPerPage
  const paginatedData = data?.data?.data?.slice(firstPostIndex, lastPostIndex)

  const pageNumber = []
    for (let i = 1; i <= Math.ceil((data?.data?.data.length) / postsPerPage); i++) {
        pageNumber.push(i)
    }

  return (
    <div className="p-2 md:p-5">
      <table className="md:p-3 contact-table rounded-md  table-auto border-collapse border-textColor w-full min-h-[314px]">
        <thead className="text-left md:font-black text-xs md:text-xl">
          <tr className="">
            <th className="">Date</th>
            <th className="">Name</th>
            <th className="">Email</th>
            <th className="">Message</th>
            <th className="">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((contact, index)=> (
            <tr className="contact text-xs md:text-[14px] leading-7" key={index}>
              <td className="md:p-2">{(new Date(contact.date)).toLocaleDateString()}</td>
              <td className="md:p-2">{contact.name}</td>
              <td className="md:p-2">{contact.email}</td>
              <td className="md:p-2">{contact.message}</td>
              <td className="md:p-2">{contact.number}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {!data && <h3 className="font-bold text-center md:text-3xl">No Data Available.</h3>}
      </div>
      <div className='relative text-sm text-center my-2 md:my-4 font-bold tracking-wider group'>
          <p>{currentPage} 0f {pageNumber.length} pages</p>
          <div className="my-2 md:my-5">
              <Splide options={{
                  drag: "free",
                  pagination: false,
                  perPage: 8,
                  perMove: 3,
                  gap: "20px",
                  focus    : 'center',
                  trimSpace: false,
              }} className="">
                  {pageNumber.map((num) => (
                      <SplideSlide key={num}><button onClick={() => setCurrentPage(num)} key={num} className={`${currentPage === num && "bg-BLUE text-white px-3 py-2 rounded-md"} px-3 py-2 text-sm md:text-base font-bold`}>{num}</button></SplideSlide>
                  ))}
              </Splide>
          </div>
      </div>
    </div>
  )
}

export default Contacts