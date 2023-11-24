import React from 'react'
import about1 from "../assets/images/about1.png"
import about2 from "../assets/images/about2.jpg"
import about3 from "../assets/images/about3.png"
import about4 from "../assets/images/about4.png"
import client from "../assets/images/client.png"


const AboutPage = () => {
  return (
    <>
        <section class="px-2 py-24 md:py-20 md:px-10 bg-white border-red-500">
            <div>
                <h1 class="my-4 md:my-8 font-bold text-2xl md:text-4xl">Our Mission</h1>
                <p class="w-full md:w-1/2 font-light text-sm md:text-lg my-3">At T.O Analytics, our mission is to empower students with the essential tech skills, focusing on the field of Cybersecurity. We understand the importance of cybersecurity in today’s digital world, protecting the individuals and organizations from cyber threats. </p>
            </div>
        </section>
        <section class="px-2 py-10 md:p-10 bg-white font-bold">
            <div class="grid gap-10 grid-cols-1 md:grid-cols-2 items-center">
                <div class="grid grid-cols-2 gap-3">
                    <img src={about1} class="rounded-xl" alt=""/>
                    <img src={about2} class="rounded-xl" alt=""/>
                    <img src={about3} class="rounded-xl" alt=""/>
                    <img src={about4} class="rounded-xl" alt=""/>
                </div>
                <div>
                    <h1 class="my-4 md:my-8 font-bold text-2xl md:text-4xl">About Us</h1>
                    <p class="my-5 font-light text-sm md:text-lg">We are a leading tech institute dedicated to equipping the student with the skills they need to thrive in the ever-evolving world of technology. With a strong focus on cybersecurity, we offer  comprehensive training programs that empower our students to become experts in protecting digital assets.</p>
                    <p class="my-5 font-light text-sm md:text-lg">We are committed to fostering a supportive and collaborative learning environment. Our instructors are passionate about helping students succeed and providing them with the guidance and they need to reach their full potential. We prioritize individual and organizations and offer personalized attention to ensure that each student’s unique goals are met.</p>
                </div>
            </div>
        </section>
        <section class="bg-BLUE py-2 md:py-8">
            <div class="text-white rounded-lg border-[1px] border-PURPLE mx-2 md:mx-10 grid grid-cols-1 lg:grid-cols-2">
                <div class="flex justify-center items-center">
                    <div class="p-4">
                        <img src={client} class="w-[450px] md:border-[1px] border-PURPLE rounded-2xl" alt=""/>
                        <div class="text-center">
                            <p class="font-medium my-2 md:text-2xl">Tomide Olulana</p>
                            <p class="text-lg md:text-xl my-2">CEO</p>
                        </div>
                    </div>
                </div>
                <div class="about-me border-PURPLE text-sm md:text-base font-extralight md:font-medium px-4 md:px-6 py-4 md:py-8">
                    <p class="my-2 md:my-4">I am a passion driven Nigerian-American business magnate, big data developer, and financial investor based in the United States. I have over 7 years of experience trading and investing in the stock market through stocks and options and has several years training, teaching, and mentoring.</p>
                    <p class="my-2 md:my-4">I received my Master of Science in Applied Economics from the University of Maryland, College Park. Worked as a Financial Analyst and Asset Manager for several years in the transportation industry and now work as a big data developer in the Cybersecurity field.</p>
                    <p class="my-2 md:my-4">I am the founder of ACE Stocks Trading, a stock trading community that teaches and mentors people on how to trade and invest in the stock market, I am also the founder and CEO of TO Productions LLC, a multimedia production company, Co-founder of Dive Data LLC, a company that trains people how to use SPLUNK data monitoring tool from user to an Admin level, LINUX and AWS. </p>
                    <p class="my-2 md:my-4">My stock trading community has made millions in the stock market using my simple strategy and I strongly believes that with the help of God, any dream can come alive if you are willing to put in the work.</p>
                </div>
            </div>
        </section>
    </>
  )
}

export default AboutPage