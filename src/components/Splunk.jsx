import { useState, useEffect } from "react";

const Splunk = () => {
    const [modal, setModal] = useState(false)
    const [timeoutId, setTimeoutId] = useState(null);
    const displayModal = ()=> {
        setModal(true)
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
    }
    const removeModal = ()=> {
        const id = setTimeout(() => {
            setModal(false);
        }, 2000);
        setTimeoutId(id);
    }
    const cancelRemoveModal = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
    };
    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);
  return (
    <div className="relative">
        <section className="pt-10">
            <h1 className="font-bold text-center text-2xl md:text-4xl py-10 md:py-20">SPLUNK</h1>
            <div className="px-2 md:px-10 md:py-8 grid grid-cols-1 md:grid-cols-2 bg-[#2d2065] text-white">
                <div className="md:w-1/2 w-full">
                    <div>
                        <h1 onMouseOver={displayModal} onMouseOut={removeModal} className="font-semibold text-2xl md:text-4xl my-4 course-text">The Complete Splunk Bootcamp</h1>
                    </div>
                    <p className="w-full">A comprehensive course on Linux. Learn, analyze and optimize with our splunk course</p>
                    <a href="">
                        <button className="hover:bg-transparent border-2 hover:text-BLUE border-textColor duration-300 hover:outline-2 hover:bg-white w-fit mx-auto text-md md:text-xl font-semibold bg-BLUE text-white px-3 py-2 md:px-4 md:py-3 mt-8 rounded-xl">Buy Course</button>
                    </a>
                </div>
                <div>
                    <ul className="leading-[50px] font-medium tracking-wider">
                        <li>BEGINNER FRIENDLY</li>
                        <li>LIFETIME ACCESS</li>
                        <li>EXERCISES</li>
                        <li>ACCESS ON MOBILE & DESKTOP</li>
                        <li>CERTIFICATION</li>
                    </ul>
                </div>
            </div>
        </section>
        <section className="px-2 md:px-10 py-5 md:py-7">
            <h1 className="font-bold text-2xl md:text-4xl">WHAT YOU’LL LEARN</h1>
            <div className="learn grid grid-cols-1 md:grid-cols-2 py-10">
                <ul>
                    <li>Splunk user to admin level</li>
                    <li>Splunk component and splunk data flow</li>
                    <li>Splunk installation and configuration</li>
                    <li>Data onboarding/Data parsing</li>
                    <li>Splunk SPL</li>
                    <li>Splunk alerts/ reports/ saved searches</li>
                </ul>
                <ul>
                    <li>Splunk Dashboarding</li>
                    <li>Data enrichment (Data Model)</li>
                    <li>Regular expressions (REGEX)</li>
                    <li>Distributed environment configuration (Architect exam prep)</li>
                    <li>Splunk clustering</li>
                </ul>
            </div>
            <div className="py-10">
                <h1 className="font-bold text-2xl md:text-4xl my-8">No prior knowledge needed!</h1>
                <p>You don’t need to be familiar with splunk to take this course. Everything you need to know will be taught from scratch and step by step too.</p>
            </div>
        </section>


        {modal && 
        <section className="min-h-screen fixed flex justify-center items-center inset-0 bg-black bg-opacity-70 z-50">
            <div onMouseEnter={cancelRemoveModal} onMouseLeave={removeModal} className="z-50 bg-white w-fit p-5 rounded-2xl" >
                <h1 className="font-black text-center text-xl md:text-2xl">SPLUNK</h1>
                <p className="font-bold">The Complete <br /> Splunk Bootcamp</p>
                <div className="learn">
                    <ul className="md:text-lg text-xs">
                        <li>Splunk user to admin level</li>
                        <li>Splunk component and splunk data flow</li>
                        <li>Splunk installation and configuration</li>
                        <li>Data onboarding/Data parsing</li>
                        <li>Splunk SPL</li>
                        <li>Splunk alerts/ reports/ saved searches</li>
                        <li>Splunk Dashboarding</li>
                        <li>Data enrichment (Data Model)</li>
                        <li>Regular expressions (REGEX)</li>
                        <li>Distributed environment configuration (Architect exam prep)</li>
                        <li>Splunk clustering</li>
                    </ul>
                </div>
                <button  className="font-bold text-white bg-BLUE w-full my-4 py-3 rounded-3xl hover:text-BLUE border-2 hover:bg-transparent border-BLUE duration-300">ADD TO CART</button>
            </div>
        </section>}
    </div>
  )
}

export default Splunk;