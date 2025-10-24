import { useEffect, useState } from "react";
import Quiz from "./Quiz";
import { NavLink } from "react-router-dom";

const MainQuiz = () => {
  const api = import.meta.env.VITE_HOME_OO;

  const allowedEmails = [
    "Adenusi.timi@gmail.com",
    "tomideolulana@gmail.com",
    "yinkalola51@gmail.com",
    "toanalyticsllc@gmail.com",
    "kevwe_oberiko@yahoo.com",
    "denisgsam@gmail.com",
    "oluwaferanmi.olulana@gmail.com",
    "fpasamuelmayowa51@gmail.com",
    "oluwatiroyeamoye@gmail.com",
    "trbanjo@gmail.com",
    "emanfrimpong@gmail.com",
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

  // 🕐 Loading state
 

  // 🚫 If user not allowed, block access
  if (!isAllowed) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-red-600 mb-3">
          Access Denied 🚫
        </h1>
        <p className="text-gray-700 text-lg">
          Only authorized To-Analytics members can view this page.
        </p>
        {userEmail ? (
          <p className="mt-4 text-sm text-gray-500">
            Your email: <span className="font-medium">{userEmail}</span>
          </p>
        ) : (
          <p className="mt-4 text-sm text-gray-500">
            Please log in to access the content.
          </p>
        )}
      </div>
    );
  }

  return (
    <>
      <div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          📚 Splunk Quiz
        </h2>

        {/* Quiz Selector */}
        <div className="bg-white shadow-md rounded-2xl p-6 mb-8">
          <label className="block text-lg font-semibold text-gray-700 mb-3">
            Select a Quiz:
          </label>
          <select
            value={selectedQuiz}
            onChange={(e) => loadQuiz(e.target.value)}
            className="p-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          >
            <option value="">-- Choose a Quiz --</option>
            <option value="T.O Analytics Splunk Quiz 1">T.O Analytics Splunk  Quiz 1</option>
            <option value="T.O Analytics Splunk Quiz 2">T.O Analytics Splunk  Quiz 2</option>
            {/* <option value="splunk3">Splunk Quiz 3</option> */}
          </select>
        </div>

        {/* Quiz Section */}
        {quizData && (
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transition-all duration-300 hover:shadow-xl">
            <Quiz data={quizData} />
          </div>
        )}
      </div>
    </>
  );
};

export default MainQuiz;
