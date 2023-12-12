import axios from 'axios'
import {
    useQuery,
} from '@tanstack/react-query';
import Loader from "./Loader"
import { useState } from 'react';

const StudentTable = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(8)
    const {data, isLoading, error} = useQuery({
        queryKey: ["students"],
        queryFn: ()=> axios.get("https://to-backendapi-v1.vercel.app/api/show")
    })
    
    if (error) return <p>{error.message}</p>
    if (isLoading) return <Loader />
    
    const lastPostIndex = currentPage * postsPerPage
    const firstPostIndex = lastPostIndex - postsPerPage
    const paginatedData = data?.data?.response?.slice(firstPostIndex, lastPostIndex)
    console.log(paginatedData)

    const pageNumber = []
    for (let i = 1; i <= Math.ceil((data?.data?.response.length)/ postsPerPage); i++) {
        pageNumber.push(i)
    }

    const setPageNumber = (number)=> {
        setCurrentPage(number)
    }

    return (
        <div>
            <table className='border-collapse border-spacing-2 w-full text-center rounded-xl'>
                <thead className=''>
                    <tr className='bg-white rounded-xl font-bold text-xs md:text-lg'>
                        <th className='md:p-4'>S/N</th>
                        <th className='md:p-4'>Registration Date</th>
                        <th className='md:p-4'>Student Name</th>
                        <th className='md:p-4'>Email Address</th>
                        <th className='md:p-4'>Course</th>
                        <th className='md:p-4'>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData?.map((email, index)=> (
                        <tr key={index} className='border-b-2 border-slate-400 text-xs md:text-lg'>
                            <td className=''>{index + 1}</td>
                            <td className=''></td>
                            <td className=''></td>
                            <td className=''>{email}</td>
                            <td className=''></td>
                            <td className=''></td>
                        </tr>
                    ))} 
                </tbody>
                <div>
                    {!data && <h3 className="font-semibold text-center">No Data Available.</h3> }
                </div>
               
            </table>
            <div className='text-xs md:text-base font-bold flex md:gap-2 justify-center w-fit mx-auto my-3 md:my-10 md:p-2 gap-1 bg-white rounded-md md:rounded-xl'>
                {
                    pageNumber.map((number, index)=> (
                        currentPage === number ? 
                        <button onClick={()=> setPageNumber(number)} key={index} className='rounded-lg px-1 md:px-4 bg-BLUE text-white'>{number}</button>
                        :
                        <button onClick={()=> setPageNumber(number)} key={index} className='rounded-lg px-4'>{number}</button>
                    ))
                }
            </div>
        </div>
    )
}

export default StudentTable