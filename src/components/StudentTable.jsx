import Loader from "./Loader"
import { useState } from 'react';
import FetchAllStudents from '../hook/FetchAllStudents';

const StudentTable = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(8)
    const {data, isLoading, error} = FetchAllStudents()
    
    if (error) return <p className='text-center text-red-500 md:text-3xl font-black'>{error.message}</p>
    if (isLoading) return <Loader />
    
    const lastPostIndex = currentPage * postsPerPage
    const firstPostIndex = lastPostIndex - postsPerPage
    const paginatedData = data?.data?.response?.slice(firstPostIndex, lastPostIndex)
    console.log(paginatedData)

    const pageNumber = []
    for (let i = 1; i <= Math.ceil((data?.data?.response.length)/ postsPerPage); i++) {
        pageNumber.push(i)
    }

    const increasePageNumber = ()=> {
        if (currentPage <= pageNumber.length - 1) {
            setCurrentPage(prev=> prev + 1)
        }
    }

    const reducePageNumber = ()=> {
        if (currentPage > 1) {
            setCurrentPage(prev=> prev - 1)
        }
    }

    return (
        <div>
            <table className='table-fixed w-full text-center rounded-2xl'>
                <thead className='bg-white'>
                    <tr className='font-black text-sm'>
                        <th className='md:p-1 md:py-2'>S/N</th>
                        <th className='md:p-1 md:py-2'>Registration Date</th>
                        <th className='md:p-1 md:py-2'>Student Name</th>
                        <th className='md:p-1 md:py-2'>Email Address</th>
                        <th className='md:p-1 md:py-2'>Course</th>
                        <th className='md:p-1 md:py-2'>Amount</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {paginatedData?.map((email, index)=> (
                        <tr key={index} className='text-xs md:text-sm'>
                            <td className=''>{index + 1}</td>
                            <td className=''></td>
                            <td className=''></td>
                            <td className=''>{email}</td>
                            <td className=''></td>
                            <td className=''>$500</td>
                        </tr>
                    ))} 
                </tbody>
               
            </table>
            <div>
                {!data && <h3 className="font-bold text-center md:text-3xl">No Data Available.</h3> }
            </div>
            <div className='text-sm text-center my-2 md:my-4 font-bold tracking-wider'>
                <p>{currentPage} 0f {pageNumber.length} pages</p>
            </div>
            <div className='text-xs md:text-sm font-bold w-fit mx-auto my-3 md:my-3 md:p-1 gap-1 bg-white rounded-md md:rounded-xl'>
                {
                    pageNumber.map((number, index)=> index < 1 && (
                        <div key={index} className='flex md:gap-4 gap-2 justify-center'>
                            {currentPage !== 1 && <button onClick={()=> reducePageNumber()} className='rounded-lg px-2 py-1 md:px-3 md:py-2 duration-300 hover:bg-BLUE hover:text-white'>PREV</button>}
                            {currentPage !== (pageNumber.length) && <button onClick={()=> increasePageNumber()} className='rounded-lg px-2 py-1 md:px-3 md:py-2 duration-300 hover:bg-BLUE hover:text-white'>NEXT</button>}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default StudentTable