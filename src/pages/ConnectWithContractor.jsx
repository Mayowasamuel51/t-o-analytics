
const ConnectWithContractor = () => {
  return (
    <div>
        <section>
        <div className="px-2 text-center md:px-10">
            <p className="font-bold md:p-10 p-2 text-3xl">Our Partners</p>
            <div className="flex flex-wrap gap-2 justify-center my-5">
                <div>
                    <img src="./images/contractor1.png" alt=""/>
                </div>
                <div>
                    <img src="./images/contractor2.png" alt=""/>
                </div>
                <div>
                    <img src="./images/contractor3.png" alt=""/>
                </div>
                <div>
                    <img src="./images/contractor4.png" alt=""/>
                </div>
                <div>
                    <img src="./images/contractor5.png" alt=""/>
                </div>
                <div>
                    <img src="./images/contractor6.png" alt=""/>
                </div>
            </div>
        </div>
    </section>
    <section className="p-2">
        <div className="w-[500px] mx-auto p-6 bg-BLUE rounded-xl">
            <form action="" className="bg-BLUE">
                <div className="mb-2 block">
                    <input className="h-16 text-white placeholder:font-semibold font-medium px-2 py-3 rounded-md w-full bg-transparent border-[1px] text-base border-textColor my-2 focus:outline-2 focus:outline-textColor" type="text" name="" id="" placeholder="Name"/>
                </div>
                <div className="mb-2 block">
                    <input className="h-16 text-white placeholder:font-semibold font-medium px-2 py-3 rounded-md w-full bg-transparent border-[1px] text-base border-textColor my-2 focus:outline-2 focus:outline-textColor" type="text" name="" id="" placeholder="Email Address"/>
                </div>
                <div className="mb-2 block">
                    <input className="h-16 text-white placeholder:font-semibold font-medium px-2 py-3 rounded-md w-full bg-transparent border-[1px] text-base border-textColor my-2 focus:outline-2 focus:outline-textColor" type="text" name="" id="" placeholder="Phone Number"/>
                </div>
                <div className="mb-2 block">
                    <input className="h-16 text-white placeholder:font-semibold font-medium px-2 py-3 rounded-md w-full bg-transparent border-[1px] text-base border-textColor my-2 focus:outline-2 focus:outline-textColor" type="text" name="" id="" placeholder="Role/position"/>
                </div>
                <div className="mb-2 block">
                    <input className="h-16 text-white placeholder:font-semibold font-medium px-2 py-3 rounded-md w-full bg-transparent border-[1px] text-base border-textColor my-2 focus:outline-2 focus:outline-textColor" type="text" name="" id="" placeholder="Link to Portfolio"/>
                </div>
                <div className="mb-2 block">
                    <input className="h-16 text-white placeholder:font-semibold font-medium px-2 py-3 rounded-md w-full bg-transparent border-[1px] text-base border-textColor my-2 focus:outline-2 focus:outline-textColor" type="text" name="" id="" placeholder="CV/Resume"/>
                </div>
                <button className="text-xl font-semibold hover:bg-white hover:text-BLUE duration-300 text-white px-2 py-1 md:px-4 md:py-3 rounded-lg md:rounded-xl border-textColor border-[1px]">Submit</button>
            </form>
        </div>
    </section>
    </div>
  )
}

export default ConnectWithContractor;