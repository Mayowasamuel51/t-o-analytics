import Loader from "./Loader"
import { useState } from 'react';
import FetchAllStudents from '../hook/FetchAllStudents';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import moment from "moment";
const StudentTable = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(10)
    const { data, isLoading, error } = FetchAllStudents()

    if (error) return <p className='text-center text-red-500 md:text-3xl font-black'>{error.message}</p>
    if (isLoading) return <Loader />


    const lastPostIndex = currentPage * postsPerPage
    const firstPostIndex = lastPostIndex - postsPerPage
    const paginatedData = data?.data?.response?.slice(firstPostIndex, lastPostIndex)

    const pageNumber = []
    for (let i = 1; i <= Math.ceil((data?.data?.response.length) / postsPerPage); i++) {
        pageNumber.push(i)
    }

    return (
        <div>
            <table className='table-fixed w-full rounded-2xl'>
                <thead className='bg-white'>
                    <tr className='font-black text-xs md:text-lg'>
                        {/* <th className='py-1 md:py-2'>S/N</th> */}
                        <th className='py-1 md:py-2 hidden md:block'>Registration Date</th>
                        <th className='py-1 md:py-2'>Student Name</th>
                        <th className='py-1 md:py-2 hidden md:block'>Email Address</th>
                        {/* <th className='py-1 md:py-2'>Course</th> */}
                        {/* <th className='py-1 md:py-2'>Amount</th> */}
                    </tr>
                </thead>
                <tbody className='tbody'>
                    {paginatedData?.map((info, index) => (
                        <tr key={index} className='text-xs md:text-[14px] leading-7 font-medium'>
                            {/* <td className=''></td> */}
                            <td className=''>   {moment(info.date)
                                .utc()
                                .format("YYYY-MM-DD")}</td>
                            <td className=''>{info.name}</td>
                            <td className='hidden md:block'>{info.email}</td>
                            {/* <td className=''></td> */}
                            {/* <td className=''></td> */}
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
                        perPage: 5,
                        perMove: 3,
                        gap: "20px"
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

export default StudentTable