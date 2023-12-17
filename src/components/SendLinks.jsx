
const SendLinks = () => {
  return (
    <div className='p-2 lg:p-5'>
      <div className='mb-4 lg:mb-7'>
        <label htmlFor="splunk-link" className='font-bold text-lg lg:text-2xl'>Splunk
          <input className='w-full border-[1px] border-black h-10 lg:h-12 pl-5 my-2 font-medium text-base lg:text-xl' name='splunk-link' type="text" />
        </label>
        <button className='my-2 bg-BLUE px-3 py-2 md:px-4 md:py-3 font-semibold text-white'>Send</button>
      </div>
      <div>
        <label htmlFor="edu-link" className='font-bold text-lg lg:text-2xl'>Educational Consulting
          <input className='w-full border-[1px] border-black h-10 lg:h-12 pl-5 my-2 font-medium text-base lg:text-xl' name="edu-link" type="text" />
        </label>
        <button className='my-2 bg-BLUE px-3 py-2 md:px-4 md:py-3 font-semibold text-white'>Send</button>
      </div>
    </div>
  )
}

export default SendLinks;