import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import COURSES from "../coursesAPI/api";

const MyCourses = () => {
  const [authorized, setAuthorized] = useState(false);
  const [courseData, setCourseData] = useState([]);

  // ✅ Handle user storage
  const rawUser = localStorage.getItem("user");
  let user = null;
  try {
    user = JSON.parse(rawUser);
  } catch {
    user = { email: rawUser };
  }

  const userEmail = user?.email || "";

  const allowedEmails = [
    "oluwaferanmiolulana@gmail.com",
    "tomideolulana@gmail.com",
    "toanalyticsllc@gmail.com",
    "lybertyudochuu@gmail.com",
    "kevwe_oberiko@yahoo.com",
    "denisgsam@gmail.com",
    "oluwaferanmi.olulana@gmail.com",
    "fpasamuelmayowa51@gmail.com",
    "randommayowa@gmail.com",
    "oluwatiroyeamoye@gmail.com",
    "adenusitimi@gmail.com",
    "Trbanjo@gmail.com",
    "emanfrimpong@gmail.com",
    "dipeoluolatunji@gmail.com",
    "yinkalola51@gmail.com",
  ];

  useEffect(() => {
    if (allowedEmails.includes(userEmail)) {
      setAuthorized(true);

      // ✅ Pick Splunk and Stock & Options
      const selectedCourses = COURSES.filter(
        (course) =>
          course.courseName === "Splunk" ||
          course.courseName === "Stock & Options"
      );

      setCourseData(selectedCourses);
    } else {
      setAuthorized(false);
      setCourseData([]);
    }
  }, [userEmail]);

  // 🚫 Not authorized
  if (!authorized) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center p-6">
        <h1 className="text-2xl font-bold text-red-600">Access Denied 🚫</h1>
        <p className="mt-4 text-gray-700">
          This account (
          <span className="font-semibold">{userEmail || "Unknown"}</span>) does
          not have access to this course.
        </p>
      </div>
    );
  }

  // 🎓 Authorized view — show two courses
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-3 max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800">🎓 Paid Courses</h1>
        <p className="text-gray-600 leading-relaxed">
          Welcome to your paid courses area! Here you’ll find exclusive content
          available only to enrolled students. Access videos, PowerPoint slides,
          and learning resources related to your purchased course(s).
        </p>
      </div>

      {/* ✅ Flex layout for two courses */}
      <div className="flex flex-wrap gap-6 justify-center">
        {courseData.map((course, index) => (
          <NavLink
            to={`/dashboard/materials/${encodeURIComponent(
              course.courseName
            ).toLowerCase()}`}
            key={index}
            className="rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform bg-white w-[300px]"
            data-aos="fade-up"
          >
            <img
              src={course.image}
              alt={course.courseName}
              className="w-full h-[200px] object-cover"
            />
            <div className="p-4 bg-blue-600 text-white">
              <p className="font-bold text-lg md:text-2xl mb-2">
                {course.courseName}
              </p>
              <p className="text-sm md:text-base">{course.intro}</p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;


// import { useEffect, useState } from "react";
// import { Link, NavLink, useLocation } from "react-router-dom";
// import COURSES from "../coursesAPI/api";

// const MyCourses = () => {
//   const [authorized, setAuthorized] = useState(false);
//   const [courseData, setCourseData] = useState([]);

//   // ✅ Handle user storage (in case it's JSON or a plain string)
//   const rawUser = localStorage.getItem("user");
//   let user = null;
//   try {
//     user = JSON.parse(rawUser);
//   } catch {
//     user = { email: rawUser };
//   }
//   // fpasamuelmayowa51@gmail.com
//   const userEmail = user?.email || "";
//   const allowedEmails = [
//     "oluwaferanmiolulana@gmail.com",
//     "tomideolulana@gmail.com",
//     // "oluwaferanmi.olulana@gmail.com",
//     "toanalyticsllc@gmail.com",
//     "lybertyudochuu@gmail.com",
//     "kevwe_oberiko@yahoo.com",
//     "denisgsam@gmail.com",
//     "oluwaferanmi.olulana@gmail.com",
//     "fpasamuelmayowa51@gmail.com",
//     "oluwaferanmiolulana@gmail.com",
//     "randommayowa@gmail.com",
//     "oluwatiroyeamoye@gmail.com",
//     "adenusitimi@gmail.com",
//     "Trbanjo@gmail.com",
//     "emanfrimpong@gmail.com",
//     "dipeoluolatunji@gmail.com",
//     "lybertyudochuu@gmail.com",
//     "yinkalola51@gmail.com",
//   ]; 

//   useEffect(() => {
//     if (allowedEmails.includes(userEmail)) {
//       setAuthorized(true);
//       // ✅ Default course (Linux or any course you want)
//       const defaultCourse = COURSES.filter(
//         (course) => course.courseName === "Splunk"
//       );
//       setCourseData(defaultCourse);
//     } else {
//       setAuthorized(false);
//       setCourseData([]);
//     }
//   }, [userEmail]);

//   // 🚫 Not authorized
//   if (!authorized) {
//     return (
//       <div className="min-h-screen flex flex-col justify-center items-center text-center p-6">
//         <h1 className="text-2xl font-bold text-red-600">Access Denied 🚫</h1>
//         <p className="mt-4 text-gray-700">
//           This account (
//           <span className="font-semibold">{userEmail || "Unknown"}</span>) does
//           not have access to this course.
//         </p>
//       </div>
//     );
//   }

//   // 🎓 Show default course
//   return (
//     <div className="p-6 space-y-6">
//       {/* 🧾 Description Section */}
//       {/* <div className=" space-y-3">
//         <h1 className="text-3xl font-bold text-gray-800  ">🎓 Paid Courses</h1>
//         <p className="text-gray-600 ">
//           Welcome to your paid courses area! Here you’ll find exclusive content
//           available only to enrolled students. Access videos, PowerPoint slides,
//           and learning resources related to your purchased course(s).
//         </p>
//       </div> */}

//       <NavLink to="/dashboard/materials">
//         {/* 💻 Course Display */}
//         <div className="space-y-8">
//           {/* Top Section */}
//           <div className="space-y-3 max-w-2xl">
//             <h1 className="text-3xl font-bold text-gray-800">
//               🎓 Paid Courses
//             </h1>
//             <p className="text-gray-600 leading-relaxed">
//               Welcome to your paid courses area! Here you’ll find exclusive
//               content available only to enrolled students. Access videos,
//               PowerPoint slides, and learning resources related to your
//               purchased course(s).
//             </p>
//           </div>

//           {/* Course Cards Section */}
//           <div className="flex flex-wrap gap-6">
//             {courseData.map((course, index) => (
//               <div
//                 key={index}
//                 className="rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform bg-white w-[300px]"
//                 data-aos="fade-up"
//               >
//                 <img
//                   src={course.image}
//                   alt={course.courseName}
//                   className="w-full h-[200px] object-cover"
//                 />
//                 <div className="p-4 bg-blue-600 text-white">
//                   <p className="font-bold text-lg md:text-2xl mb-2">
//                     {course.courseName}
//                   </p>
//                   <p className="text-sm md:text-base">{course.intro}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </NavLink>
//     </div>
//   );
// };

// export default MyCourses;
