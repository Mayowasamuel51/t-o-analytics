import React from 'react'

const ContactPage = () => {
  return (
    <section class="bg-white py-32 md:px-10 px-2 text-2xl md:text-4xl">
        <div class="grid md:grid-cols-2 grid-col-1">
            <div class="text-center">
                <p class="md:text-lg">Need any information? Reach us on</p>
                <p class="text-BLUE font-black my-3">443-768-8416</p>
            </div>
            <div class="p-8 bg-BLUE rounded-xl">
                <h1 class="text-white font-bold text-sm md:text-2xl mb-10 text-center">How may we help you?</h1>
                <form action="" class="bg-BLUE">
                    <div class="mb-7 block">
                        <input class="text-white placeholder:font-semibold font-medium px-2 py-3 rounded-md w-full bg-transparent border-[1px] text-sm md:text-lg border-textColor my-2 focus:outline-1 outline-offset-2 focus:outline-textColor" type="text" name="" id="" placeholder="Name"/>
                    </div>
                    <div class="mb-7 block">
                        <input class="text-white placeholder:font-semibold font-medium px-2 py-3 rounded-md w-full bg-transparent border-[1px] text-sm md:text-lg border-textColor my-2 focus:outline-1 outline-offset-2 focus:outline-textColor" type="text" name="" id="" placeholder="Email"/>
                    </div>
                    <div class="mb-7 block">
                        <input class="text-white placeholder:font-semibold font-medium px-2 py-3 rounded-md w-full bg-transparent border-[1px] text-sm md:text-lg border-textColor my-2 focus:outline-1 outline-offset-2 focus:outline-textColor" type="text" name="" id="" placeholder="Phone Number"/>
                    </div>
                    <div class="mb-2 block">
                        <textarea class="text-white placeholder:font-semibold font-medium px-2 py-3 rounded-md w-full bg-transparent border-[1px] text-sm md:text-lg border-textColor my-2 focus:outline-1 outline-offset-2 focus:outline-textColor h-[150px]" name="" id="" cols="30" rows="10" placeholder="What would you Link to Tell us..."></textarea>
                    </div>
                    <button class="text-xl font-semibold bg- text-white px-2 py-1 md:px-4 md:py-3 rounded-lg md:rounded-xl border-textColor border-[1px]">Submit</button>
                </form>
            </div>
        </div>
    </section>
  )
}

export default ContactPage