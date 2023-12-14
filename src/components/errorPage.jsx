import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className='min-h-full flex justify-center items-center'>
        <div className='text-center'>
            <p className='font-semibold cursor-pointer'>NO GO AREA</p>
            <p onClick={()=> navigate(-1)} className='underline text-blue-600'>
                Back to home
            </p>
        </div>
    </div>
  )
}

export default ErrorPage;