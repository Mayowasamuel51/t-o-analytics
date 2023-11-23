import React from "react";
import splunk from "../assets/images/splunk.png";
import linux from "../assets/images/linux.png";
import drone from "../assets/images/drone.jpg";
import stock from "../assets/images/stock.png";
import data from "../assets/images/data.jpg";
import photography from "../assets/images/photography.jpg";
import videography from "../assets/images/videography.jpg";

const Courses = () => {
  return (
    <div>
      <section class="bg-white px-2 md:px-10 py-10">
        <h1 class="text-center font-bold text-2xl md:text-4xl py-20">
          Our Courses
        </h1>
        <div class="courses grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-2">
          <a href="splunk.html">
            <div
              class="rounded-xl"
              data-aos-once="true"
              data-aos-duration="6000"
              data-aos="fade-up"
            >
              <div class=" rounded-tr-2xl rounded-tl-2xl">
                <img
                  src={splunk}
                  class="rounded-tr-2xl rounded-tl-2xl w-full h-[200px] object-cover"
                  alt=""
                />
              </div>
              <div class="text-white p-4 rounded-bl-2xl rounded-br-2xl bg-BLUE">
                <p class="font-black text-white text-md md:text-2xl">splunk</p>
                <p class="my-2 font-bold">The Complete Splunk Bootcamp</p>
                <p class=" text-textColor md:max-w-[70%]">
                  A comprehensive course on Linux. Learn, analyze and optimize
                  with our splunk course
                </p>
                <p class="font-bold my-5">$3500</p>
              </div>
            </div>
          </a>
          <a href="linux.html">
            <div
              class=""
              data-aos-once="true"
              data-aos-duration="6000"
              data-aos="fade-up"
            >
              <div class="">
                <img
                  src={linux}
                  class="rounded-tr-2xl rounded-tl-2xl w-full h-[200px] object-cover"
                  alt=""
                />
              </div>
              <div class="text-white p-4 rounded-bl-2xl rounded-br-2xl bg-BLUE">
                <p class="font-black text-white text-md md:text-2xl">Linux</p>
                <p class="my-2 font-bold">Complete Linux Mastery</p>
                <p class=" text-textColor">
                  Master the command line, harness freedom and embrace
                  open-source awareness with our Linux course
                </p>
                <p class="font-bold my-5"> $2000</p>
              </div>
            </div>
          </a>
          <a href="stock-options.html">
            <div
              class=""
              data-aos-once="true"
              data-aos-duration="6000"
              data-aos="fade-up"
            >
              <div class="">
                <img
                  src={stock}
                  class="rounded-tr-2xl rounded-tl-2xl w-full h-[200px] object-cover"
                  alt=""
                />
              </div>
              <div class="text-white p-4 rounded-bl-2xl rounded-br-2xl bg-BLUE">
                <p class="font-black text-white text-md md:text-2xl">
                  Stock & Options
                </p>
                <p class="my-2 font-bold">
                  Ultimate approach to financial decisions
                </p>
                <p class=" text-textColor md:max-w-[70%]">
                  Everything you need to know to unlock financial freedom and
                  success
                </p>
                <p class="font-bold my-5">$100</p>
              </div>
            </div>
          </a>
          <a href="dronetech.html">
            <div
              class=""
              data-aos-once="true"
              data-aos-duration="6000"
              data-aos="fade-up"
            >
              <div class="">
                <img
                  src={drone}
                  class="rounded-tr-2xl rounded-tl-2xl w-full h-[200px] object-cover"
                  alt=""
                />
              </div>
              <div class="text-white p-4 rounded-bl-2xl rounded-br-2xl bg-BLUE">
                <p class="font-black text-white text-md md:text-2xl">
                  Drone Tech
                </p>
                <p class="my-2 font-bold">Complete Drone Technology Mastery</p>
                <p class=" text-textColor">
                  Learn drone tech at the forefront with our complete course.
                </p>
                <p class="font-bold my-5">$100</p>
              </div>
            </div>
          </a>
          <a href="DATA.html">
            <div
              class=""
              data-aos-once="true"
              data-aos-duration="6000"
              data-aos="fade-up"
            >
              <div class="">
                <img
                  src={data}
                  class="rounded-tr-2xl rounded-tl-2xl w-full h-[200px] object-cover"
                  alt=""
                />
              </div>
              <div class="text-white p-4 rounded-bl-2xl rounded-br-2xl bg-BLUE">
                <p class="font-black text-white text-md md:text-2xl">Data</p>
                <p class="my-2 font-bold">
                  A Comprehensive Data Analysis Course
                </p>
                <p class=" text-textColor">
                  A step by step guide to inspecting, cleaning, transforming and
                  modeling data
                </p>
                <p class="font-bold my-5">$100</p>
              </div>
            </div>
          </a>
          <a href="videography.html">
            <div
              class=""
              data-aos-once="true"
              data-aos-duration="6000"
              data-aos="fade-up"
            >
              <div class="">
                <img
                  src={videography}
                  alt=""
                  class="rounded-tr-2xl rounded-tl-2xl w-full h-[200px] object-cover"
                />
              </div>
              <div class="text-white p-4 rounded-bl-2xl rounded-br-2xl bg-BLUE">
                <p class="font-black text-white text-md md:text-2xl">
                  Videography
                </p>
                <p class="my-2 font-bold">Complete Mastery of Videography</p>
                <p class=" text-textColor">
                  Learn the perfect way of planning, capturing and editing clear
                  and beautiful videos
                </p>
                <p class="font-bold my-5">$100</p>
              </div>
            </div>
          </a>
          <a href="photography.html" class="block md:col-start-2">
            <div
              class=""
              data-aos-once="true"
              data-aos-duration="6000"
              data-aos="fade-up"
            >
              <div class="">
                <img
                  src={photography}
                  alt=""
                  class="rounded-tr-2xl rounded-tl-2xl w-full h-[200px] object-cover"
                />
              </div>
              <div class="text-white p-4 rounded-bl-2xl rounded-br-2xl bg-BLUE">
                <p class="font-black text-white text-md md:text-2xl">
                  Photography
                </p>
                <p class="my-2 font-bold"> The Perfect Approach to Capturing</p>
                <p class=" text-textColor">
                  Everything you need to know on how to capture and create
                  images{" "}
                </p>
                <p class="font-bold my-5">$100</p>
              </div>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Courses;
