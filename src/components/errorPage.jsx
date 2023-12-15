import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className=''>
          <p className='font-semibold cursor-pointer'>NO GO AREA</p>
          <p onClick={()=> navigate(-1)} className='underline text-blue-600'>
            Go Back
          </p>
      </div>
    </div>
  )
}

export default ErrorPage;