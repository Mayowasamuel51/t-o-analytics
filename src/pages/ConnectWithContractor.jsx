import contractor1 from "../assets/images/partner1.jpg";
import contractor2 from "../assets/images/partner2.png";
import contractor3 from "../assets/images/partner3.png";
import contractor4 from "../assets/images/partner4.png";
import contractor5 from "../assets/images/partner5.png";
import contractor6 from "../assets/images/partner6.png";


const ConnectWithContractor = () => {
  return (
    <div>
        <section>
            <div className="px-2 text-center md:px-10">
                <p className="font-bold md:p-10 p-2 text-3xl">Our Partners</p>
                <div className="flex flex-wrap flex-col md:flex-row items-center justify-center gap-2 my-5">
                    <div className="w-44 aspect-square">
                        <img src={contractor1} alt=""/>
                    </div>
                    <div className="w-44 aspect-square">
                        <img src={contractor2} alt=""/>
                    </div>
                    <div className="w-44 aspect-square">
                        <img src={contractor3} alt=""/>
                    </div>
                    <div className="w-44 aspect-square">
                        <img src={contractor4} alt=""/>
                    </div>
                    <div className="w-44 aspect-square">
                        <img src={contractor5} alt=""/>
                    </div>
                    <div className="w-44 aspect-square">
                        <img src={contractor6} alt=""/>
                    </div>
                </div>
            </div>
        </section>
    <section className="px-14">
        <div className="md:pt-10 md:w-[600px] mx-auto p-6 bg-BLUE rounded-xl">
            <form action="" className="bg-BLUE">
                <div className="mb-2 block">
                    <input className="md:text-lg h-10 md:h-14 text-white placeholder:font-semibold font-medium px-2 py-3 rounded-md w-full bg-transparent border-[1px] text-base border-textColor my-2 focus:outline-2 focus:outline-textColor" type="text" name="" id="" placeholder="Name"/>
                </div>
                <div className="mb-2 block">
                    <input className="md:text-lg h-10 md:h-14 text-white placeholder:font-semibold font-medium px-2 py-3 rounded-md w-full bg-transparent border-[1px] text-base border-textColor my-2 focus:outline-2 focus:outline-textColor" type="text" name="" id="" placeholder="Email Address"/>
                </div>
                <div className="mb-2 block">
                    <input className="md:text-lg h-10 md:h-14 text-white placeholder:font-semibold font-medium px-2 py-3 rounded-md w-full bg-transparent border-[1px] text-base border-textColor my-2 focus:outline-2 focus:outline-textColor" type="text" name="" id="" placeholder="Phone Number"/>
                </div>
                <div className="mb-2 block">
                    <input className="md:text-lg h-10 md:h-14 text-white placeholder:font-semibold font-medium px-2 py-3 rounded-md w-full bg-transparent border-[1px] text-base border-textColor my-2 focus:outline-2 focus:outline-textColor" type="text" name="" id="" placeholder="Role/position"/>
                </div>
                <div className="mb-2 block">
                    <input className="md:text-lg h-10 md:h-14 text-white placeholder:font-semibold font-medium px-2 py-3 rounded-md w-full bg-transparent border-[1px] text-base border-textColor my-2 focus:outline-2 focus:outline-textColor" type="text" name="" id="" placeholder="Link to Portfolio"/>
                </div>
                <div className="mb-2 block">
                    <input className="md:text-lg text-white placeholder:font-semibold font-medium px-2 py-3 rounded-md w-full bg-transparent border-[1px] text-base border-textColor my-2 focus:outline-2 focus:outline-textColor customFileInput" type="file" name="" id="" placeholder="CV/Resume"/>
                </div>
                <button className="text-xl font-semibold hover:bg-white hover:text-BLUE duration-300 text-white px-2 py-1 md:px-4 md:py-3 rounded-lg md:rounded-xl border-textColor border-[1px]">Submit</button>
            </form>
        </div>
    </section>
    </div>
  )
}

export default ConnectWithContractor;