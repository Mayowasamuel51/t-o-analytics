import { useEffect, useState } from "react";
import Quiz from "./Quiz";
import { NavLink } from "react-router-dom";
import { FiBookOpen, FiLock, FiLoader } from "react-icons/fi";

const MainQuiz = () => {
  const api = import.meta.env.VITE_HOME_OO;

  const allowedEmails = [
    "oluwaferanmiolulana@gmail.com",
    "adenusitimi@gmail.com",
    "Adenusi.timi@gmail.com",
    "tomideolulana@gmail.com",
    "yinkalola51@gmail.com",
    "toanalyticsllc@gmail.com",
    "kevwe_oberiko@yahoo.com",
    "lybertyudochuu@gmail.com",
    "denisgsam@gmail.com",
    "oluwaferanmi.olulana@gmail.com",
    "fpasamuelmayowa51@gmail.com",
    "oluwatiroyeamoye@gmail.com",
    "trbanjo@gmail.com",
    "emanfrimpong@gmail.com",
    "oluwaferanmiolulana@gmail.com",
    "randommayowa@gmail.com",
    "dipeoluolatunji@gmail.com",
    "lybertyudochuu@gmail.com",
  ];

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [quizData, setQuizData] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [isAllowed, setIsAllowed] = useState(false);

  // ✅ Load user email from localStorage and verify access
  useEffect(() => {
    const email = localStorage.getItem("user");
    setUserEmail(email);

    if (email) {
      const normalized = email.toLowerCase();
      const allowed = allowedEmails.map((e) => e.toLowerCase());
      setIsAllowed(allowed.includes(normalized));
    }
  }, []);

  // ✅ Fetch assignments only if user is allowed
  useEffect(() => {
    if (isAllowed) {
      fetch("https://to-backendapi-v1.vercel.app/api/assignment")
        .then((res) => res.json())
        .then((data) => {
          setAssignments(data.data || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching assignments:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [isAllowed]);

  // ✅ Load a specific quiz
  const loadQuiz = async (quizName) => {
    setSelectedQuiz(quizName);
    try {
      const res = await fetch(`${api}/api/quiz/${quizName}`);
      const data = await res.json();
      setQuizData(data);
    } catch (err) {
      console.error("Error loading quiz:", err);
    }
  };

  // 🕐 Loading Screen
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <FiLoader className="animate-spin text-BLUE text-5xl mb-4" />
        <h2 className="text-lg font-semibold text-gray-600">
          Loading your content...
        </h2>
      </div>
    );
  }

  // 🚫 If user not allowed, block access
  if (!isAllowed) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-red-50 text-center px-6">
        <FiLock className="text-red-500 text-6xl mb-4 animate-bounce" />
        <h1 className="text-3xl font-bold text-red-600 mb-2">Access Denied 🚫</h1>
        <p className="text-gray-700 text-lg mb-4">
          Only authorized To-Analytics members can view this page.
        </p>
        {userEmail ? (
          <p className="text-sm text-gray-500">
            Your email: <span className="font-medium">{userEmail}</span>
          </p>
        ) : (
          <p className="text-sm text-gray-500">
            Please log in to access the content.
          </p>
        )}
        <NavLink
          to="/"
          className="mt-6 px-6 py-3 bg-BLUE text-white rounded-xl shadow-md hover:bg-PURPLE transition-all duration-300"
        >
          Go Back Home
        </NavLink>
      </div>
    );
  }

  // ✅ Main Content
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-blue-50 py-12 px-6">
      <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-PURPLE to-BLUE mb-10">
        <FiBookOpen className="inline-block mb-1 mr-2" />
        Splunk Quiz Center
      </h2>

      {/* Quiz Selector */}
      <div className="max-w-xl mx-auto bg-white/70 backdrop-blur-lg shadow-xl border border-gray-100 rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl">
        <label className="block text-lg font-semibold text-gray-700 mb-3">
          Select a Quiz:
        </label>
        <select
          value={selectedQuiz}
          onChange={(e) => loadQuiz(e.target.value)}
          className="p-3 w-full border border-gray-300 rounded-xl focus:ring-4 focus:ring-BLUE/50 focus:border-BLUE transition duration-300 text-gray-700 font-medium bg-white"
        >
          <option value="">-- Choose a Quiz --</option>
          <option value="T.O Analytics Splunk Class 1 Quiz">
          T.O Analytics Splunk Class 1 Quiz
          </option>
          <option value="T.O Analytics Splunk Class 2 Quiz">
          T.O Analytics Splunk Class 2 Quiz
          </option>
        </select>
      </div>

      {/* Quiz Section */}
      {quizData && (
        <div className="max-w-3xl mx-auto mt-10 bg-white/80 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl animate-fadeIn">
          <Quiz data={quizData} />
        </div>
      )}
    </div>
  );
};

export default MainQuiz;



// import { useEffect, useState } from "react";
// import Quiz from "./Quiz";
// import { NavLink } from "react-router-dom";

// const MainQuiz = () => {
//   const api = import.meta.env.VITE_HOME_OO;

//   const allowedEmails = [
//     // "oluwaferanmi.olulana@gmail.com",
//     "oluwaferanmiolulana@gmail.com",
//     "adenusitimi@gmail.com",
//     "Adenusi.timi@gmail.com",
//     "tomideolulana@gmail.com",
//     "yinkalola51@gmail.com",
//     "toanalyticsllc@gmail.com",
//     "kevwe_oberiko@yahoo.com",
//     "lybertyudochuu@gmail.com",
//     "denisgsam@gmail.com",
//     "oluwaferanmi.olulana@gmail.com",
//     "fpasamuelmayowa51@gmail.com",
//     "oluwatiroyeamoye@gmail.com",
//     "trbanjo@gmail.com",
//     "emanfrimpong@gmail.com",
//     "oluwaferanmiolulana@gmail.com",
//     "randommayowa@gmail.com",
//   "dipeoluolatunji@gmail.com",
//     "lybertyudochuu@gmail.com",
//   ];

//   const [assignments, setAssignments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedQuiz, setSelectedQuiz] = useState("");
//   const [quizData, setQuizData] = useState(null);
//   const [userEmail, setUserEmail] = useState("");
//   const [isAllowed, setIsAllowed] = useState(false);

//   // ✅ Load user email from localStorage and verify access
//   useEffect(() => {
//     const email = localStorage.getItem("user");
//     setUserEmail(email);

//     if (email) {
//       const normalized = email.toLowerCase();
//       const allowed = allowedEmails.map((e) => e.toLowerCase());
//       setIsAllowed(allowed.includes(normalized));
//     }
//   }, []);

//   // ✅ Fetch assignments only if user is allowed
//   useEffect(() => {
//     if (isAllowed) {
//       fetch("https://to-backendapi-v1.vercel.app/api/assignment")
//         .then((res) => res.json())
//         .then((data) => {
//           setAssignments(data.data || []);
//           setLoading(false);
//         })
//         .catch((err) => {
//           console.error("Error fetching assignments:", err);
//           setLoading(false);
//         });
//     } else {
//       setLoading(false);
//     }
//   }, [isAllowed]);

//   // ✅ Load a specific quiz
//   const loadQuiz = async (quizName) => {
//     setSelectedQuiz(quizName);
//     try {
//       const res = await fetch(`${api}/api/quiz/${quizName}`);
//       const data = await res.json();
//       setQuizData(data);
//     } catch (err) {
//       console.error("Error loading quiz:", err);
//     }
//   };

//   // 🕐 Loading state
 

//   // 🚫 If user not allowed, block access
//   if (!isAllowed) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//         <h1 className="text-3xl font-bold text-red-600 mb-3">
//           Access Denied 🚫
//         </h1>
//         <p className="text-gray-700 text-lg">
//           Only authorized To-Analytics members can view this page.
//         </p>
//         {userEmail ? (
//           <p className="mt-4 text-sm text-gray-500">
//             Your email: <span className="font-medium">{userEmail}</span>
//           </p>
//         ) : (
//           <p className="mt-4 text-sm text-gray-500">
//             Please log in to access the content.
//           </p>
//         )}
//       </div>
//     );
//   }

//   return (
//     <>
//       <div>
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
//           📚 Splunk Quiz
//         </h2>

//         {/* Quiz Selector */}
//         <div className="bg-white shadow-md rounded-2xl p-6 mb-8">
//           <label className="block text-lg font-semibold text-gray-700 mb-3">
//             Select a Quiz:
//           </label>
//           <select
//             value={selectedQuiz}
//             onChange={(e) => loadQuiz(e.target.value)}
//             className="p-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//           >
//             <option value="">-- Choose a Quiz --</option>
//             <option value="T.O Analytics Splunk Quiz 1">T.O Analytics Splunk  Quiz 1</option>
//             <option value="T.O Analytics Splunk Quiz 2">T.O Analytics Splunk  Quiz 2</option>
//             {/* <option value="splunk3">Splunk Quiz 3</option> */}
//           </select>
//         </div>

//         {/* Quiz Section */}
//         {quizData && (
//           <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transition-all duration-300 hover:shadow-xl">
//             <Quiz data={quizData} />
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default MainQuiz;
