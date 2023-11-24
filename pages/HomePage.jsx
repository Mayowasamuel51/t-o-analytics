import React from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Link } from 'react-router-dom';
import '@splidejs/react-splide/css';
import LandingIMG from "../assets/images/landingIMG.png"
import eInstructor from "../assets/images/e-instructor.jpg"
import hLearning from "../assets/images/h-learning.jpg"
import flexibleLearning from "../assets/images/flexible-learning.jpg"
import guidance from "../assets/images/guidance.jpg";
import client from "../assets/images/client.png"
import student1 from "../assets/images/student1.png"
import student2 from "../assets/images/student2.png"
import student3 from "../assets/images/student3.jpeg"
import splunk from "../assets/images/splunk.png"
import linux from "../assets/images/linux.png"
import drone from "../assets/images/drone.jpg"
import stock from "../assets/images/stock.png"
import data from "../assets/images/data.jpg"
import videography from "../assets/images/videography.jpg"

const HomePage = () => {
  return (
    <>
        <section className="px-2 md:px-10 py-36 md:py-32 bg-white">
            <div className="grid md:grid-cols-2 items-center gap-10">
                <div>
                    <h1 className="my-4 md:my-8 font-bold text-4xl md:text-5xl">Tech Education for Tomorrow’s Innovators</h1>
                    <p className="font-bold text-base md:text-xl my-3">Step into the exciting realm of technology  through our cutting-edge courses and solutions.</p>
                    <div className="flex gap-2 md:gap-3">
                        <a href="bookmentorship.html">
                            <button className="text-base md:text-xl font-medium border-2 border-BLUE text-BLUE hover:text-white hover:bg-BLUE px-2 py-3 md:px-4 md:py-3 rounded-lg md:rounded-xl duration-300">Book Mentorship</button>
                        </a>
                        <a href=" ">
                            <button className="text-base md:text-xl font-medium border-2 border-BLUE bg-BLUE text-white hover:bg-white hover:text-BLUE px-2 py-3 md:px-4 md:py-3 rounded-lg md:rounded-xl duration-300">Live Courses</button>
                        </a>
                    </div>
                </div>
                <div className="relative hidden md:block">
                    <div className="bg-BLUE landingDIV"></div>
                    <div className="absolute top-0 left-0 right-0">
                        <img src={LandingIMG} className="w-full" alt="" />
                    </div>
                </div>
            </div>
        </section>

        <section className="bg-white">
            <h1 className="text-center font-bold text-2xl md:text-4xl">Why Trust T.O Analytics?</h1>
            <div className="md:p-10 p-2 overflow-x-hidden">
                <div className="md:pb-20 grid grid-cols-1 md:grid-cols-2 items-center gap-20">
                    <div data-aos-once="true" data-aos-duration="6000" data-aos="fade-right">
                        <p className="font-semibold text-BLUE my-2">Learn from industry’s best</p>
                        <h1 className="font-bold text-xl md:text-2xl my-2">Experienced Instructors</h1>
                        <p className="font-light text-sm md:text-lg">Our instructors are seasoned professionals who have worked in the tech industry for many years. They bring their expertise and real-world knowledge into the classNameroom to provide practical insights and guidance.</p>
                    </div>
                    <div data-aos-once="true" data-aos-duration="6000" data-aos="fade-left" className="bounce md:block hidden">
                        <img src={eInstructor} alt="" className='w-full'/>
                    </div>
                </div>
                <div className="py-10 md:py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-20">
                    <div data-aos-once="true" data-aos-duration="6000" data-aos="fade-right" className="md:block hidden">
                        <img src={hLearning} alt="" className='w-full' />
                    </div>
                    <div data-aos-once="true" data-aos-duration="6000" data-aos="fade-left">
                        <p className="font-semibold text-BLUE my-2">Fine blend of theory and practice</p>
                        <h1 className="font-bold text-xl md:text-2xl my-2">Hands-on learning</h1>
                        <p className="font-light text-sm md:text-lg"> At our boot camp, we believe in learning by doing. Our curriculum is designed to be hands-on, with a focus on projects and practical exercises that simulate real-world scenarios. This approach helps students gain valuable experience and build a strong foundation in tech skills.</p>
                    </div>
                </div>
                <div className="py-10 md:py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-20">
                    <div data-aos-once="true" data-aos-duration="6000" data-aos="fade-right">
                        <p className="font-semibold text-BLUE my-2">We put you first</p>
                        <h1 className="font-bold text-xl md:text-2xl my-2">Flexible learning Options</h1>
                        <p className="font-light text-sm md:text-lg">We understand that everyone has different schedules and commitments. That's why we offer flexible learning options, including part-time and full-time programs, as well as online learning options. This allows students to choose a schedule that works best for them while still receiving high-quality education.</p>
                    </div>
                    <div data-aos-once="true" data-aos-duration="6000" data-aos="fade-left" className="md:block hidden">
                        <img src={flexibleLearning} alt="" />
                    </div>
                </div>
                <div className="py-10 md:py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-20">
                    <div data-aos-once="true" data-aos-duration="6000" data-aos="fade-right" className="md:block hidden">
                        <img src={guidance} alt="" />
                    </div>
                    <div data-aos-once="true" data-aos-duration="6000" data-aos="fade-left">
                        <p className="font-semibold text-BLUE my-2">From clueless to pro</p>
                        <h1 className="font-bold text-xl md:text-2xl my-2">Career guidance</h1>
                        <p className="font-light text-sm md:text-lg">We provide comprehensive career guidance and support to help students transition into the tech industry. This includes resume building, interview preparation, job search strategies, and networking opportunities. Our goal is to equip students with the necessary skills and resources to succeed in their tech careers.</p>
                    </div>
                </div>
            </div>
        </section>

        <section className="courses p-2 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-2">
                <a href="splunk.html">
                    <div className="" data-aos-once="true" data-aos-duration="6000" data-aos="fade-up" data-aos-delay="100" data-aos-easing="ease-in-out">
                        <div>
                            <img src={splunk} className="rounded-tr-2xl rounded-tl-2xl" alt="" />
                        </div>
                        <div className="text-white p-4 rounded-bl-2xl rounded-br-2xl bg-BLUE">
                            <p className="font-black text-white text-md md:text-2xl">splunk</p>
                            <p className="my-2 font-bold">The Complete Splunk Bootcamp</p>
                            <p className=" text-textColor md:max-w-[70%]">A comprehensive course on Linux. Learn, analyze and optimize with our splunk course</p>
                            <p className="font-bold my-5">$3500</p>
                        </div>
                    </div>
                </a>
                <a href="linux.html">
                    <div className="" data-aos-once="true" data-aos-duration="6000" data-aos="fade-up" data-aos-delay="200" data-aos-easing="ease-in-out">
                        <div>
                            <img src={linux} alt="" />
                        </div>
                        <div className="text-white p-4 rounded-bl-2xl rounded-br-2xl bg-BLUE">
                            <p className="font-black text-white text-md md:text-2xl">Linux</p>
                            <p className="my-2 font-bold">Complete Linux Mastery</p>
                            <p className=" text-textColor">Master the command line, harness freedom and embrace open-source awareness with our Linux course</p>
                            <p className="font-bold my-5"> $2000</p>
                        </div>
                    </div>
                </a>
                <a href="stock-options.html">
                    <div className="" data-aos-once="true" data-aos-duration="6000" data-aos="fade-up" data-aos-delay="300" data-aos-easing="ease-in-out">
                        <div>
                            <img src={stock} alt="" />
                        </div>
                        <div className="text-white p-4 rounded-bl-2xl rounded-br-2xl bg-BLUE">
                            <p className="font-black text-white text-md md:text-2xl">Stock & Options</p>
                            <p className="my-2 font-bold">Ultimate approach to  financial decisions</p>
                            <p className=" text-textColor md:max-w-[70%]">Everything you need to know to unlock financial freedom and success</p>
                            <p className="font-bold my-5">$100</p>
                        </div>
                    </div>
                </a>
                <a href="dronetech.html">
                    <div className="" data-aos-once="true" data-aos-duration="6000" data-aos="fade-up" data-aos-delay="100" data-aos-easing="ease-in-out">
                        <div>
                            <img src={drone} alt="" />
                        </div>
                        <div className="text-white p-4 rounded-bl-2xl rounded-br-2xl bg-BLUE">
                            <p className="font-black text-white text-md md:text-2xl">Drone Tech</p>
                            <p className="my-2 font-bold">Complete Drone Technology Mastery</p>
                            <p className=" text-textColor">Learn drone tech at the forefront with our complete course.
                            </p>
                            <p className="font-bold my-5">$100</p>
                        </div>
                    </div>
                </a>
                <a href="DATA.html">
                    <div className="" data-aos-once="true" data-aos-duration="6000" data-aos="fade-up" data-aos-delay="200" data-aos-easing="ease-in-out">
                        <div>
                            <img src={data} alt="" />
                        </div>
                        <div className="text-white p-4 rounded-bl-2xl rounded-br-2xl bg-BLUE">
                            <p className="font-black text-white text-md md:text-2xl">Data</p>
                            <p className="my-2 font-bold">A Comprehensive Data Analysis Course</p>
                            <p className=" text-textColor">A step by step guide to inspecting, cleaning, transforming and modeling data</p>
                            <p className="font-bold my-5">$100</p>
                        </div>
                    </div>
                </a>
                <a href="videography.html">
                    <div className="" data-aos-once="true" data-aos-duration="6000" data-aos="fade-up" data-aos-delay="300" data-aos-easing="ease-in-out">
                        <div>
                            <img src={videography} alt="" />
                        </div>
                        <div className="text-white p-4 rounded-bl-2xl rounded-br-2xl bg-BLUE">
                            <p className="font-black text-white text-md md:text-2xl">Videography</p>
                            <p className="my-2 font-bold">Complete Mastery of Videography</p>
                            <p className=" text-textColor">Learn the perfect way of planning, capturing and editing  clear and beautiful videos</p>
                            <p className="font-bold my-5">$100</p>
                        </div>
                    </div>
                </a>
            </div>
            <div className="py-10 text-center">
                <Link to="/courses" className="">
                    <button className="text-md md:text-xl font-normal bg-BLUE hover:bg-transparent hover:text-BLUE duration-300 hover:outline-2 outline hover:outline-BLUE text-white rounded-xl px-3 py-2 md:px-4 md:py-3">View All Courses</button>
                </Link>
            </div>
        </section>

        <section className="">
            <div className="bg-BLUE text-white rounded-lg border-[1px] border-PURPLE mx-2 md:mx-10 grid grid-cols-1 lg:grid-cols-2">
                <div className="flex justify-center items-center">
                    <div className="p-4">
                        <img src={client} className="w-[450px] md:border-[1px] border-PURPLE rounded-2xl" alt="" />
                        <div className="text-center">
                            <p className="font-medium my-2 md:text-2xl">Tomide Olulana</p>
                            <p className="text-lg md:text-xl my-2">CEO</p>
                        </div>
                    </div>
                </div>
                <div className="about-me border-PURPLE text-sm md:text-base font-extralight md:font-normal px-4 md:px-6 py-4 md:py-8">
                    <p className="my-2 md:my-4">I am a passion driven Nigerian-American business magnate, big data developer, and financial investor based in the United States. I have over 7 years of experience trading and investing in the stock market through stocks and options and has several years training, teaching, and mentoring.</p>
                    <p className="my-2 md:my-4">I received my Master of Science in Applied Economics from the University of Maryland, College Park. Worked as a Financial Analyst and Asset Manager for several years in the transportation industry and now work as a big data developer in the Cybersecurity field.</p>
                    <p className="my-2 md:my-4">I am the founder of ACE Stocks Trading, a stock trading community that teaches and mentors people on how to trade and invest in the stock market, I am also the founder and CEO of TO Productions LLC, a multimedia production company, Co-founder of Dive Data LLC, a company that trains people how to use SPLUNK data monitoring tool from user to an Admin level, LINUX and AWS. </p>
                    <p className="my-2 md:my-4">My stock trading community has made millions in the stock market using my simple strategy and I strongly believes that with the help of God, any dream can come alive if you are willing to put in the work.</p>
                </div>
            </div>
        </section>

        <section className="bg-white p-2 py-20 md:py-12">
            <h1 className="my-2 md:my-8 text-center font-semibold text-lg md:text-4xl">Here’s what our students are saying</h1>
            <Splide className='splide pb-10' aria-label="Testimonials" options={{
                type : 'loop',
                perPage: 1,
                gap: '20px',
                perMove: 1,
                autoplay: true,
                interval: 4000,
                speed: 3000,
                arrows: false,
            }}>
                <SplideSlide>
                    <div className="md:w-1/2 mx-auto">
                        <p className="font-normal my-2 text-xs md:text-lg text-center">Choosing this boot camp was a game-changer for me. The specialized cybersecurity curriculum, including in-depth training on Linux, gave me the skills and knowledge to excel in the field. The experienced instructors and practical projects made learning enjoyable</p>
                        <div className="flex items-center justify-center gap-1 md:gap-3">
                            <img src={student1} className="w-[40px] md:w-[70px] aspect-square rounded-full" alt=""/>
                            <p className="font-bold text-sm md:text-2xl">Mayowa Odukoya</p>   
                        </div>                
                    </div>
                </SplideSlide>
                <SplideSlide>
                    <div className="md:w-1/2 mx-auto">
                        <p className="font-normal my-2 text-xs md:text-lg text-center">I can't say enough good things about this boot camp! The cybersecurity track, with a focus on Linux, was exactly what I needed to kickstart my career. The hands-on labs and real-world simulations prepared me for the challenges of the industry</p>
                        <div className="flex items-center justify-center gap-1 md:gap-3">
                            <img src={student2} className="w-[40px] md:w-[70px] aspect-square rounded-full" alt=""/>
                            <p className="font-bold text-sm md:text-2xl">Aishat Oyeleke</p>   
                        </div>                
                    </div>
                </SplideSlide>
                <SplideSlide>
                    <div className="md:w-1/2 mx-auto">
                        <p className="font-normal my-2 text-xs md:text-lg text-center">I'm so grateful for the opportunity to be a part of this boot camp. All thanks to the financial literacy classNamees, I can now make purposeful final decisions and know all the right channels to invest my money and assets.</p>
                        <div className="flex items-center justify-center gap-1 md:gap-3">
                            <img src={student3} className="w-[40px] md:w-[70px] aspect-square rounded-full" alt=""/>
                            <p className="font-bold text-sm md:text-2xl">Timilehin Babade</p>   
                        </div>                
                    </div>
                </SplideSlide>
            </Splide>
            
        </section>
        
        <section class="text-center p-10 bg-black text-white">
            <h1 class="my-4 md:my-12 text-center font-semibold text-lg md:text-4xl">Ready to take your career to new heights?</h1>
            <p class="font-medium my-4 md:w-1/2 mx-auto text-sm md:text-lg">Connect directly with industry-leading contractors and discover exciting job opportunities tailored to your skills and aspirations. Don’t wait, start building the future you’ve always dreamed of!</p>
            <div class="text-center">
                <Link to="/contractors" class="">
                    <button class="hover:bg-white hover:border-white hover:text-black duration-300 border-BLUE border-2 w-fit mx-auto text-md md:text-xl font-semibold bg-BLUE text-white px-3 py-2 md:px-4 md:py-3 mt-8 rounded-xl">Connect with Contractor</button>
                </Link>
            </div>
        </section>

    </>
  )
}

export default HomePage