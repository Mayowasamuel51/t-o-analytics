import { Link } from "react-router-dom";
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import 'react-lazy-load-image-component/src/effects/blur.css';
import COURSES from "../coursesAPI/api"

const AllCourses = () => {
  return (
    <div>
      <section className="bg-white px-2 md:px-10 py-10">
        <h1 className="text-center font-bold text-2xl md:text-4xl py-20">
          Our Courses
        </h1>
        <div className="courses grid grid-cols-1 md:grid-cols-3 justify-center gap-y-4 gap-x-2">
          {COURSES.map((course, index)=> (
            <Link key={index} to={course.courseName.toLowerCase()} className="">
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
      </section>
    </div>
  )
}

export default AllCourses