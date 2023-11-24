import splunk from "../assets/images/splunk.png";
import linux from "../assets/images/linux.png";
import drone from "../assets/images/drone.jpg";
import stock from "../assets/images/stock.png";
import data from "../assets/images/data.jpg";
import photography from "../assets/images/photography.jpg";
import videography from "../assets/images/videography.jpg";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Courses = () => {
  return (
    <div>
      <section className="bg-white px-2 md:px-10 py-10">
        <h1 className="text-center font-bold text-2xl md:text-4xl py-20">
          Our Courses
        </h1>
        <div className="courses grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-2">
          <a href="splunk.html">
            <div
              className="rounded-xl"
              data-aos-once="true"
              data-aos-duration="6000"
              data-aos="fade-up"
            >
              <div className=" rounded-tr-2xl rounded-tl-2xl">
                <img
                  src={splunk}
                  className="rounded-tr-2xl rounded-tl-2xl w-full h-[200px] object-cover"
                  alt=""
                />
              </div>
              <div className="text-white p-4 rounded-bl-2xl rounded-br-2xl bg-BLUE">
                <p className="font-black text-white text-md md:text-2xl">splunk</p>
                <p className="my-2 font-bold">The Complete Splunk Bootcamp</p>
                <p className=" text-textColor md:max-w-[70%]">
                  A comprehensive course on Linux. Learn, analyze and optimize
                  with our splunk course
                </p>
                <p className="font-bold my-5">$3500</p>
              </div>
            </div>
          </a>
          <a href="linux.html">
            <div
              className=""
              data-aos-once="true"
              data-aos-duration="6000"
              data-aos="fade-up"
            >
              <div className="">
                <img
                  src={linux}
                  className="rounded-tr-2xl rounded-tl-2xl w-full h-[200px] object-cover"
                  alt=""
                />
              </div>
              <div className="text-white p-4 rounded-bl-2xl rounded-br-2xl bg-BLUE">
                <p className="font-black text-white text-md md:text-2xl">Linux</p>
                <p className="my-2 font-bold">Complete Linux Mastery</p>
                <p className=" text-textColor">
                  Master the command line, harness freedom and embrace
                  open-source awareness with our Linux course
                </p>
                <p className="font-bold my-5"> $2000</p>
              </div>
            </div>
          </a>
          <a href="stock-options.html">
            <div
              className=""
              data-aos-once="true"
              data-aos-duration="6000"
              data-aos="fade-up"
            >
              <div className="">
                <img
                  src={stock}
                  className="rounded-tr-2xl rounded-tl-2xl w-full h-[200px] object-cover"
                  alt=""
                />
              </div>
              <div className="text-white p-4 rounded-bl-2xl rounded-br-2xl bg-BLUE">
                <p className="font-black text-white text-md md:text-2xl">
                  Stock & Options
                </p>
                <p className="my-2 font-bold">
                  Ultimate approach to financial decisions
                </p>
                <p className=" text-textColor md:max-w-[70%]">
                  Everything you need to know to unlock financial freedom and
                  success
                </p>
                <p className="font-bold my-5">$100</p>
              </div>
            </div>
          </a>
          <a href="dronetech.html">
            <div
              className=""
              data-aos-once="true"
              data-aos-duration="6000"
              data-aos="fade-up"
            >
              <div className="">
                <img
                  src={drone}
                  className="rounded-tr-2xl rounded-tl-2xl w-full h-[200px] object-cover"
                  alt=""
                />
              </div>
              <div className="text-white p-4 rounded-bl-2xl rounded-br-2xl bg-BLUE">
                <p className="font-black text-white text-md md:text-2xl">
                  Drone Tech
                </p>
                <p className="my-2 font-bold">Complete Drone Technology Mastery</p>
                <p className=" text-textColor">
                  Learn drone tech at the forefront with our complete course.
                </p>
                <p className="font-bold my-5">$100</p>
              </div>
            </div>
          </a>
          <a href="DATA.html">
            <div
              className=""
              data-aos-once="true"
              data-aos-duration="6000"
              data-aos="fade-up"
            >
              <div className="">
                <img
                  src={data}
                  className="rounded-tr-2xl rounded-tl-2xl w-full h-[200px] object-cover"
                  alt=""
                />
              </div>
              <div className="text-white p-4 rounded-bl-2xl rounded-br-2xl bg-BLUE">
                <p className="font-black text-white text-md md:text-2xl">Data</p>
                <p className="my-2 font-bold">
                  A Comprehensive Data Analysis Course
                </p>
                <p className=" text-textColor">
                  A step by step guide to inspecting, cleaning, transforming and
                  modeling data
                </p>
                <p className="font-bold my-5">$100</p>
              </div>
            </div>
          </a>
          <a href="videography.html">
            <div
              className=""
              data-aos-once="true"
              data-aos-duration="6000"
              data-aos="fade-up"
            >
              <div className="">
                <img
                  src={videography}
                  alt=""
                  className="rounded-tr-2xl rounded-tl-2xl w-full h-[200px] object-cover"
                />
              </div>
              <div className="text-white p-4 rounded-bl-2xl rounded-br-2xl bg-BLUE">
                <p className="font-black text-white text-md md:text-2xl">
                  Videography
                </p>
                <p className="my-2 font-bold">Complete Mastery of Videography</p>
                <p className=" text-textColor">
                  Learn the perfect way of planning, capturing and editing clear
                  and beautiful videos
                </p>
                <p className="font-bold my-5">$100</p>
              </div>
            </div>
          </a>
          <a href="photography.html" className="block md:col-start-2">
            <div
              className=""
              data-aos-once="true"
              data-aos-duration="6000"
              data-aos="fade-up"
            >
              <div className="">
                <img
                  src={photography}
                  alt=""
                  className="rounded-tr-2xl rounded-tl-2xl w-full h-[200px] object-cover"
                />
              </div>
              <div className="text-white p-4 rounded-bl-2xl rounded-br-2xl bg-BLUE">
                <p className="font-black text-white text-md md:text-2xl">
                  Photography
                </p>
                <p className="my-2 font-bold"> The Perfect Approach to Capturing</p>
                <p className=" text-textColor">
                  Everything you need to know on how to capture and create
                  images{" "}
                </p>
                <p className="font-bold my-5">$100</p>
              </div>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Courses;
