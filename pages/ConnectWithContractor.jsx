import React from 'react'

const ConnectWithContractor = () => {
  return (
    <div>
        <section>
        <div class="px-2 text-center md:px-10">
            <p class="font-bold md:p-10 p-2 text-3xl">Our Partners</p>
            <div class="flex flex-wrap gap-2 justify-center my-5">
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
    <section class="p-2">
        <div class="w-[500px] mx-auto p-6 bg-BLUE rounded-xl">
            <form action="" class="bg-BLUE">
                <div class="mb-2 block">
                    <input class="h-16 text-white placeholder:font-semibold font-medium px-2 py-3 rounded-md w-full bg-transparent border-[1px] text-base border-textColor my-2 focus:outline-2 focus:outline-textColor" type="text" name="" id="" placeholder="Name"/>
                </div>
                <div class="mb-2 block">
                    <input class="h-16 text-white placeholder:font-semibold font-medium px-2 py-3 rounded-md w-full bg-transparent border-[1px] text-base border-textColor my-2 focus:outline-2 focus:outline-textColor" type="text" name="" id="" placeholder="Email Address"/>
                </div>
                <div class="mb-2 block">
                    <input class="h-16 text-white placeholder:font-semibold font-medium px-2 py-3 rounded-md w-full bg-transparent border-[1px] text-base border-textColor my-2 focus:outline-2 focus:outline-textColor" type="text" name="" id="" placeholder="Phone Number"/>
                </div>
                <div class="mb-2 block">
                    <input class="h-16 text-white placeholder:font-semibold font-medium px-2 py-3 rounded-md w-full bg-transparent border-[1px] text-base border-textColor my-2 focus:outline-2 focus:outline-textColor" type="text" name="" id="" placeholder="Role/position"/>
                </div>
                <div class="mb-2 block">
                    <input class="h-16 text-white placeholder:font-semibold font-medium px-2 py-3 rounded-md w-full bg-transparent border-[1px] text-base border-textColor my-2 focus:outline-2 focus:outline-textColor" type="text" name="" id="" placeholder="Link to Portfolio"/>
                </div>
                <div class="mb-2 block">
                    <input class="h-16 text-white placeholder:font-semibold font-medium px-2 py-3 rounded-md w-full bg-transparent border-[1px] text-base border-textColor my-2 focus:outline-2 focus:outline-textColor" type="text" name="" id="" placeholder="CV/Resume"/>
                </div>
                <button class="text-xl font-semibold hover:bg-white hover:text-BLUE duration-300 text-white px-2 py-1 md:px-4 md:py-3 rounded-lg md:rounded-xl border-textColor border-[1px]">Submit</button>
            </form>
        </div>
    </section>
    </div>
  )
}

export default ConnectWithContractor;