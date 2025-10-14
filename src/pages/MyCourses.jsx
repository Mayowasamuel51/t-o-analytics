import { useEffect, useState } from "react";
import COURSES from "../coursesAPI/api";

const MyCourses = () => {
  const [authorized, setAuthorized] = useState(false);
  const [courseData, setCourseData] = useState([]);

  // ✅ Handle user storage (in case it's JSON or a plain string)
  const rawUser = localStorage.getItem("user");
  let user = null;
  try {
    user = JSON.parse(rawUser);
  } catch {
    user = { email: rawUser };
  }

  const userEmail = user?.email || "";
  const allowedEmails = ["tomideolulana@gmail.com", "toanalyticsllc@gmail.com"]; // 👈 allowed email(s)

  useEffect(() => {
    if (allowedEmails.includes(userEmail)) {
      setAuthorized(true);
      // ✅ Default course (Linux or any course you want)
      const defaultCourse = COURSES.filter(
        (course) => course.courseName === "Splunk"
      );
      setCourseData(defaultCourse);
    } else {
      setAuthorized(false);
      setCourseData([]);
    }
  }, [userEmail]);

  // 🚫 Not authorized
  if (!authorized) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center p-6">
        <h1 className="text-2xl font-bold text-red-600">
          Access Denied 🚫
        </h1>
        <p className="mt-4 text-gray-700">
          This account (<span className="font-semibold">{userEmail || "Unknown"}</span>) 
          does not have access to this course.
        </p>
      </div>
    );
  }

  // 🎓 Show default course
  return (
    <div className="p-6 space-y-6">
      {/* 🧾 Description Section */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold text-gray-800">🎓 Paid Courses</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Welcome to your paid courses area! Here you’ll find exclusive content
          available only to enrolled students. Access videos, PowerPoint slides,
          and learning resources related to your purchased course(s).
        </p>
      </div>

      {/* 💻 Course Display */}
      <div className="flex flex-wrap justify-center gap-6">
        {courseData.map((course, index) => (
          <div
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
          </div>
        ))}
      </div>
    </div>
  );
};


export default MyCourses;
