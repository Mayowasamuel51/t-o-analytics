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
import COURSES from "../coursesAPI/api"

const HomePage = () => {
  return (
    <>
        <section className="landing-page px-2 md:px-10 py-60 md:py-32 bg-white min-h-screen">
            <div className="grid md:grid-cols-2 items-center gap-10">
                <div>
                    <h1 className="my-4 md:my-9 font-bold text-3xl md:text-5xl">Tech Education for Tomorrow’s Innovators</h1>
                    <p className="font-bold text-sm md:text-xl my-4">Step into the exciting realm of technology  through our cutting-edge courses and solutions.</p>
                    <div className="flex gap-2 md:gap-3">
                        <Link to="/mentorship">
                            <button className="text-sm md:text-xl font-medium border-2 border-BLUE text-BLUE hover:text-white hover:bg-BLUE px-2 py-3 md:px-4 md:py-3 rounded-xl md:rounded-3xl duration-300">Book Mentorship</button>
                        </Link>
                        <Link to="/liveCourses">
                            <button className="text-sm md:text-xl font-medium border-2 border-BLUE bg-BLUE text-white hover:bg-white hover:text-BLUE px-2 py-3 md:px-4 md:py-3 rounded-xl md:rounded-3xl duration-300">Live Courses</button>
                        </Link>
                    </div>
                </div>
                <div className="relative hidden md:block">
                    <div className="bg-BLUE landingDIV"></div>
                    <div className="absolute top-0 left-0 right-0">
                        <img src={LandingIMG} className="w-full" alt="" />
                    </div>
                </div>
            </div>
            <div className='mobile-landingDIV md:hidden block absolute top-1/2 left-0 translate-y-[-50%] bg-BLUE landingDIV backdrop-blur-2xl'></div>
        </section>

        <section className="bg-white">
            <h1 className="text-center font-black text-2xl md:text-4xl">Why Trust T.O Analytics?</h1>
            <div className="md:p-10 p-2 overflow-x-hidden">
                <div className="md:pb-20 grid grid-cols-1 md:grid-cols-2 items-center gap-20">
                    <div data-aos-once="true" data-aos-duration="6000" data-aos="fade-right">
                        <p className="font-bold text-BLUE my-2">Learn from industry’s best</p>
                        <h1 className="font-bold text-xl md:text-2xl my-2">Experienced Instructors</h1>
                        <p className="font-light text-sm md:text-lg">Our instructors are seasoned professionals with extensive experience in diverse areas of the tech industry. They leverage their deep expertise and real-world project insights to deliver practical, actionable guidance in the classroom.</p>
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
                        <p className="font-bold text-BLUE my-2">Fine blend of theory and practice</p>
                        <h1 className="font-bold text-xl md:text-2xl my-2">Hands-on learning</h1>

                        <p className="font-light text-sm md:text-lg"> Our bootcamp, built around hands-on learning, immerses students in real-world scenarios through projects and practical exercises. This approach helps them gain invaluable experience, develop essential tech skills like problem-solving, collaboration, and critical thinking, and master coding languages like Python by building real-world web applications. Join our bootcamp today and start your journey towards a rewarding tech career.</p>
                    </div>
                </div>
                <div className="py-10 md:py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-20">
                    <div data-aos-once="true" data-aos-duration="6000" data-aos="fade-right">
                        <p className="font-bold text-BLUE my-2">We put you first</p>
                        <h1 className="font-bold text-xl md:text-2xl my-2">Flexible learning Options</h1>
                        <p className="font-medium text-sm md:text-base">We understand that everyone has different schedules and commitments. That&apos;s why we offer flexible learning options, including part-time and full-time programs, as well as online learning options. This allows students to choose a schedule that works best for them while still receiving high-quality education.</p>
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
                        <p className="font-bold text-BLUE my-2">From clueless to pro</p>
                        <h1 className="font-bold text-xl md:text-2xl my-2">Career guidance</h1>
                        <p className="font-medium text-sm md:text-base">We provide comprehensive career guidance and support to help students transition into the tech industry. This includes resume building, interview preparation, job search strategies, and networking opportunities. Our goal is to equip students with the necessary skills and resources to succeed in their tech careers.</p>
                    </div>
                </div>
            </div>
        </section>

        <section className="relative courses p-2 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-y-4 gap-x-2">
            {COURSES.map((course, index)=> index < 6 && (
            <Link key={index} to={`/courses/${course.courseName.toLowerCase()}`} className="">
            <div
              className={`rounded-xl`}
              data-aos-once="true"
              data-aos-duration="5000"
              data-aos="fade-up"
            >
              <div className=" rounded-tr-2xl rounded-tl-2xl">
                <img
                  src={course.image}
                  className="rounded-tr-2xl rounded-tl-2xl w-full h-[200px] object-cover"
                  alt=""
                />
              </div>
              <div className="text-white p-4 rounded-bl-2xl rounded-br-2xl bg-BLUE">
                <p className="font-bold text-white text-lg md:my-4 md:text-3xl">{course.courseName}</p>
                <p className="my-2 font-bold text-sm">{course.intro}</p>
                <p className="line-clamp-2 text-sm md:text-base text-textColor md:max-w-[70%]">
                  {course.description}
                </p>
                <p className="font-bold my-5 text-lg md:text-xl">${course.price}</p>
              </div>
            </div>
          </Link>
          ))}
            </div>
            <div className="py-10 text-center">
                <Link to="/courses" className="">
                    <button className="text-md md:text-lg font-normal bg-BLUE hover:bg-transparent hover:text-BLUE duration-300 hover:outline-2 outline hover:outline-BLUE text-white rounded-2xl px-3 py-2 md:px-7 md:py-3">View All Courses</button>
                </Link>
            </div>
            <div className='mobile-landingDIV md:hidden block absolute bottom-0 left-0 bg-BLUE landingDIV'></div>
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
                <div className="about-me border-PURPLE text-sm md:text-sm font-extralight md:font-normal px-4 md:px-6 py-4 md:py-8">
                    <p className="my-2 md:my-6">I am a passion driven Nigerian-American business magnate, big data developer, and financial investor based in the United States. I have over 7 years of experience trading and investing in the stock market through stocks and options and has several years training, teaching, and mentoring.</p>
                    <p className="my-2 md:my-6">I received my Master of Science in Applied Economics from the University of Maryland, College Park. Worked as a Financial Analyst and Asset Manager for several years in the transportation industry and now work as a big data developer in the Cybersecurity field.</p>
                    <p className="my-2 md:my-6">I am the founder of ACE Stocks Trading, a stock trading community that teaches and mentors people on how to trade and invest in the stock market, I am also the founder and CEO of TO Productions LLC, a multimedia production company, Co-founder of Dive Data LLC, a company that trains people how to use SPLUNK data monitoring tool from user to an Admin level, LINUX and AWS. </p>
                    <p className="my-2 md:my-6">My stock trading community has made millions in the stock market using my simple strategy and I strongly believes that with the help of God, any dream can come alive if you are willing to put in the work.</p>
                </div>
            </div>
        </section>
        <section className="bg-white p-2 py-20 md:py-12">
            <h1 className="my-2 md:my-8 text-center font-black text-lg md:text-4xl">Here’s what our students are saying</h1>
            <Splide className='splide pb-10' aria-label="Testimonials" options={{
                type : 'loop',
                perPage: 1,
                gap: '20px',
                perMove: 1,
                autoplay: true,
                interval: 4000,
                speed: 3000,
                arrows: false
            }}>
                <SplideSlide>
                    <div className="md:w-1/2 mx-auto">
                        <p className="font-semibold my-2 text-xs md:text-base text-center">Choosing this boot camp was a game-changer for me. The specialized cybersecurity curriculum, including in-depth training on Linux, gave me the skills and knowledge to excel in the field. The experienced instructors and practical projects made learning enjoyable</p>
                        <div className="flex items-center justify-center gap-1 md:gap-3">
                            <img src={student1} className="w-[40px] md:w-[70px] aspect-square rounded-full" alt=""/>
                            <p className="font-bold text-sm md:text-2xl">Mayowa Odukoya</p>   
                        </div>                
                    </div>
                </SplideSlide>
                <SplideSlide>
                    <div className="md:w-1/2 mx-auto">
                        <p className="font-semibold my-2 text-xs md:text-base text-center">I can&apos;t say enough good things about this boot camp! The cybersecurity track, with a focus on Linux, was exactly what I needed to kickstart my career. The hands-on labs and real-world simulations prepared me for the challenges of the industry</p>
                        <div className="flex items-center justify-center gap-1 md:gap-3">
                            <img src={student2} className="w-[40px] md:w-[70px] aspect-square rounded-full" alt=""/>
                            <p className="font-bold text-sm md:text-2xl">Aishat Oyeleke</p>   
                        </div>                
                    </div>
                </SplideSlide>
                <SplideSlide>
                    <div className="md:w-1/2 mx-auto">
                        <p className="font-semibold my-2 text-xs md:text-base text-center">I&apos;m so grateful for the opportunity to be a part of this boot camp. All thanks to the financial literacy classes, I can now make purposeful final decisions and know all the right channels to invest my money and assets.</p>
                        <div className="flex items-center justify-center gap-1 md:gap-3">
                            <img src={student3} className="w-[40px] md:w-[70px] aspect-square rounded-full" alt=""/>
                            <p className="font-bold text-sm md:text-2xl">Timilehin Babade</p>   
                        </div>                
                    </div>
                </SplideSlide>
            </Splide>      
        </section>
        <section className="text-center p-10 bg-black text-white">
            <h1 className="my-4 md:my-12 text-center font-black text-lg md:text-4xl">Ready to take your career to new heights?</h1>
            <p className="font-base md:font-medium my-4 md:w-1/2 mx-auto text-sm md:text-lg">Connect directly with industry-leading contractors and discover exciting job opportunities tailored to your skills and aspirations. Don’t wait, start building the future you’ve always dreamed of!</p>
            <div className="text-center">
                <Link to="/contractors" className="">
                    <button className="hover:bg-white hover:border-white hover:text-black duration-300 border-BLUE border-2 w-fit mx-auto text-md md:text-xl font-semibold bg-BLUE text-white px-3 py-2 md:px-6 md:py-3 mt-8 rounded-2xl">Connect with Contractor</button>
                </Link>
            </div>
        </section>

    </>
  )
}

export default HomePage