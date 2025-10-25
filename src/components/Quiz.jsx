import { useEffect, useState } from "react";
const Quiz = ({ data }) => {
  const api = import.meta.env.VITE_HOME_OO;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
  const [submitted, setSubmitted] = useState(false);
  const [missedQuestions, setMissedQuestions] = useState([]);
  const [showReview, setShowReview] = useState(false);
  const [notAllowed, setNotAllowed] = useState(false);
  // ✅ Get and parse user from localStorage
  const rawUser = localStorage.getItem("user");
  let user = null;
  try {
    user = JSON.parse(rawUser);
  } catch {
    user = { email: rawUser }; // fallback if stored as plain string
  }
  const userEmail = user?.email || "";
  // ✅ Allowed test-takers
  const allowedEmails = [
    "yinkalola51@gmail.com",
    "tomideolulana@gmail.com",
    // "lybertyudochuu@gmail.com",
    "toanalyticsllc@gmail.com",
    "kevwe_oberiko@yahoo.com",
    "denisgsam@gmail.com",
    "oluwaferanmi.olulana@gmail.com",
    "fpasamuelmayowa51@gmail.com",
    "oluwatiroyeamoye@gmail.com",
    "Trbanjo@gmail.com",
    "emanfrimpong@gmail.com",
    "dipeoluolatunji@gmail.com",
    "randommayowa@gmail.com",
    "lybertyudochuu@gmail.com",
    "adenusitimi@gmail.com",
  ];

  // 🛑 Block unauthorized users
  useEffect(() => {
    if (userEmail && !allowedEmails.includes(userEmail)) {
      setNotAllowed(true);
    }
  }, [userEmail]);
  const questions = data?.questions || [];
  // 🕒 Countdown Timer
  useEffect(() => {
    if (submitted || notAllowed) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted, notAllowed]);

  const handleAnswerSelect = (questionIndex, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };
  // ✅ Submit logic with missed questions
  // const handleSubmit = async () => {
  //   let correctCount = 0;
  //   const missed = [];
  //   questions.forEach((q, index) => {
  //     const userAnswer = answers[index];
  //     const correctAnswers = Array.isArray(q.correct) ? q.correct : [q.correct];
  //     if (correctAnswers.includes(userAnswer)) {
  //       correctCount++;
  //     } else {
  //       missed.push({
  //         question: q.question,
  //         selected: userAnswer || "No answer",
  //         correct: correctAnswers.join(", "),
  //       });
  //     }
  //   });
  //   const totalQuestions = questions.length;
  //   const calculatedScore = Math.round((correctCount / totalQuestions) * 100);
  //   setScore(calculatedScore);
  //   setMissedQuestions(missed);
  //   setSubmitted(true);
  //   // ✅ Save result to backend
  //   try {
  //     const resultData = {
  //       username: userEmail,
  //       testName: data.title || "Unknown Quiz",
  //       score: calculatedScore,
  //       totalQuestions,
  //       missedQuestions: missed,
  //     };
  //     console.log("Submitting result:", resultData);
  //     const res = await fetch(`${api}/api/quiz/save`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(resultData),
  //     });

  //     if (!res.ok) {
  //       const errorText = await res.text();
  //       console.error("Save error:", errorText);
  //       alert("❌ Failed to save result. Check console for details.");
  //       return;
  //     }
  //     alert("✅ Quiz result saved successfully!");
  //   } catch (err) {
  //     console.error("Error saving quiz result:", err);
  //     alert("⚠️ An error occurred while saving your result.");
  //   }
  // };
  const handleSubmit = async () => {
  let correctCount = 0;
  const missed = [];

  questions.forEach((q, index) => {
    const userAnswer = answers[index];
    const correctAnswers = Array.isArray(q.correct) ? q.correct : [q.correct];

    if (correctAnswers.includes(userAnswer)) {
      correctCount++;
    } else {
      missed.push({
        question: q.question,
        selected: userAnswer || "No answer",
        correct: correctAnswers.join(", "),
      });
    }
  });

  const totalQuestions = questions.length;
  // ✅ Now score = number of correct answers
  const calculatedScore = correctCount; 

  setScore(calculatedScore);
  setMissedQuestions(missed);
  setSubmitted(true);

  // ✅ Save result to backend
  try {
    const resultData = {
      username: userEmail,
      testName: data.title || "Unknown Quiz",
      score: calculatedScore,
      totalQuestions,
      missedQuestions: missed,
    };

    console.log("Submitting result:", resultData);

    const res = await fetch(`${api}/api/quiz/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resultData),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Save error:", errorText);
      alert("❌ Failed to save result. Check console for details.");
      return;
    }

    alert("✅ Quiz result saved successfully!");
  } catch (err) {
    console.error("Error saving quiz result:", err);
    alert("⚠️ An error occurred while saving your result.");
  }
};


  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1)
      setCurrentQuestion((prev) => prev + 1);
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) setCurrentQuestion((prev) => prev - 1);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // 🛑 Not allowed to take the test
  if (notAllowed) {
    return (
      <div className="text-center py-20 text-red-600 font-bold text-xl bg-gray-100 rounded-lg shadow-md">
        🚫 You are not allowed to take this quiz.
        <br />
        Please contact your instructor for access.
      </div>
    );
  }

  if (!questions.length)
    return (
      <div className="text-center text-gray-600 py-10">
        No questions available for this quiz.
      </div>
    );

  if (submitted)
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          🎉 Quiz Submitted!
        </h2>
        <p className="text-lg font-semibold text-gray-800 mb-4">
          Your Score: <span className="text-blue-600">{score}%</span>
        </p>

        {missedQuestions.length > 0 && (
          <button
            onClick={() => setShowReview(!showReview)}
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition mb-6"
          >
            {showReview ? "Hide Review" : "Review Missed Questions"}
          </button>
        )}

        {showReview && (
          <div className="text-left max-w-3xl mx-auto">
            <h3 className="text-xl font-bold mb-3">Missed Questions Review</h3>
            {missedQuestions.map((item, idx) => (
              <div key={idx} className="border p-3 mb-3 rounded-lg bg-gray-50">
                <p className="font-semibold text-red-500">❌ {item.question}</p>
                <p>
                  Your Answer:{" "}
                  <span className="text-red-600">{item.selected}</span>
                </p>
                <p>
                  Correct Answer:{" "}
                  <span className="text-green-600">{item.correct}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );

  const q = questions[currentQuestion];

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      {/* Timer */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">{data.title}</h2>
        <div
          className={`text-lg font-bold px-4 py-2 rounded-lg ${
            timeLeft < 300
              ? "bg-red-100 text-red-600"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          ⏳ {formatTime(timeLeft)}
        </div>
      </div>

      {/* Question */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Question {currentQuestion + 1} of {questions.length}
        </h3>
        <p className="text-gray-700 mb-6">{q.question}</p>

        {/* Options */}
        <div className="space-y-3">
          {q.options.map((option, i) => (
            <label
              key={i}
              className={`block p-3 border rounded-lg cursor-pointer transition ${
                answers[currentQuestion] === option
                  ? "bg-blue-600 text-white border-blue-600"
                  : "hover:bg-blue-50 border-gray-300"
              }`}
            >
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                value={option}
                checked={answers[currentQuestion] === option}
                onChange={() => handleAnswerSelect(currentQuestion, option)}
                className="hidden"
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
          className={`px-5 py-2 rounded-lg font-medium ${
            currentQuestion === 0
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-gray-800 text-white hover:bg-gray-700 transition"
          }`}
        >
          ⬅ Prev
        </button>

        {currentQuestion < questions.length - 1 ? (
          <button
            onClick={nextQuestion}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Next ➡
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Submit ✅
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;

// import { useEffect, useState } from "react";

// const Quiz = ({ data }) => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [score, setScore] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 mins
//   const [submitted, setSubmitted] = useState(false);

//   // 🧩 Get and parse user info
//   const rawUser = localStorage.getItem("user");
//   let user = null;

//   try {
//     user = JSON.parse(rawUser);
//   } catch {
//     user = { email: rawUser }; // fallback if stored as string
//   }

//   const userEmail = user?.email || "";

//   // ✅ Whitelisted users
//   const allowedEmails = [
//     "tomideolulana@gmail.com",
//     "yinkalola51@gmail.com",
//     "toanalyticsllc@gmail.com",
//     "kevwe_oberiko@yahoo.com",
//     "denisgsam@gmail.com",
//     "oluwaferanmi.olulana@gmail.com",
//     "fpasamuelmayowa51@gmail.com",
//     "oluwatiroyeamoye@gmail.com",
//     "Trbanjo@gmail.com",
//     "emanfrimpong@gmail.com",
//     "dipeoluolatunji@gmail.com",
//     "Lybertyudochuu@gmail.com",
//   ];

//   const isAllowed = allowedEmails.includes(userEmail.toLowerCase());

//   // 🧠 Handle timer
//   useEffect(() => {
//     if (submitted || !isAllowed) return;
//     if (timeLeft <= 0) {
//       handleSubmit();
//       return;
//     }
//     const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
//     return () => clearInterval(timer);
//   }, [timeLeft, submitted, isAllowed]);

//   const questions = data?.questions || [];

//   const handleAnswerSelect = (questionIndex, option) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [questionIndex]: option,
//     }));
//   };

//   const handleSubmit = async () => {
//     let correctCount = 0;

//     questions.forEach((q, index) => {
//       const userAnswer = answers[index];
//       const correctAnswers = Array.isArray(q.correct) ? q.correct : [q.correct];
//       if (correctAnswers.includes(userAnswer)) {
//         correctCount++;
//       }
//     });

//     const totalQuestions = questions.length;
//     const calculatedScore = Math.round((correctCount / totalQuestions) * 100);
//     setScore(calculatedScore);
//     setSubmitted(true);

//     // ✅ Save result to backend
//     try {
//       await fetch("http://localhost:8000/api/quiz/save", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           username: userEmail,
//           testName: data.title || "Unknown Quiz",
//           score: calculatedScore,
//           totalQuestions,
//         }),
//       });
//     } catch (err) {
//       console.error("Error saving quiz result:", err);
//     }
//   };

//   const nextQuestion = () => {
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion((prev) => prev + 1);
//     }
//   };

//   const prevQuestion = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion((prev) => prev - 1);
//     }
//   };

//   const formatTime = (seconds) => {
//     const m = Math.floor(seconds / 60).toString().padStart(2, "0");
//     const s = (seconds % 60).toString().padStart(2, "0");
//     return `${m}:${s}`;
//   };

//   // 🚫 Unauthorized user message
//   if (!isAllowed) {
//     return (
//       <div className="text-center py-20 text-red-500 font-semibold">
//         ❌ You are not authorized to take this quiz.
//       </div>
//     );
//   }

//   // ⏳ No questions
//   if (!questions.length)
//     return (
//       <div className="text-center text-gray-600 py-10">
//         No questions available for this quiz.
//       </div>
//     );

//   // ✅ Quiz submitted view
//   if (submitted)
//     return (
//       <div className="text-center py-10">
//         <h2 className="text-2xl font-bold text-green-600 mb-4">
//           🎉 Quiz Submitted!
//         </h2>
//         <p className="text-lg font-semibold text-gray-800">
//           Your Score: <span className="text-blue-600">{score}%</span>
//         </p>
//       </div>
//     );

//   const q = questions[currentQuestion];

//   return (
//     <div className="p-6 bg-white rounded-xl shadow-md">
//       {/* Timer */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-bold text-gray-800">{data.title}</h2>
//         <div
//           className={`text-lg font-bold px-4 py-2 rounded-lg ${
//             timeLeft < 300
//               ? "bg-red-100 text-red-600"
//               : "bg-blue-100 text-blue-700"
//           }`}
//         >
//           ⏳ {formatTime(timeLeft)}
//         </div>
//       </div>

//       {/* Question */}
//       <div>
//         <h3 className="text-lg font-semibold mb-4">
//           Question {currentQuestion + 1} of {questions.length}
//         </h3>
//         <p className="text-gray-700 mb-6">{q.question}</p>

//         {/* Options */}
//         <div className="space-y-3">
//           {q.options.map((option, i) => (
//             <label
//               key={i}
//               className={`block p-3 border rounded-lg cursor-pointer transition ${
//                 answers[currentQuestion] === option
//                   ? "bg-blue-600 text-white border-blue-600"
//                   : "hover:bg-blue-50 border-gray-300"
//               }`}
//             >
//               <input
//                 type="radio"
//                 name={`question-${currentQuestion}`}
//                 value={option}
//                 checked={answers[currentQuestion] === option}
//                 onChange={() => handleAnswerSelect(currentQuestion, option)}
//                 className="hidden"
//               />
//               {option}
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Navigation */}
//       <div className="flex justify-between items-center mt-8">
//         <button
//           onClick={prevQuestion}
//           disabled={currentQuestion === 0}
//           className={`px-5 py-2 rounded-lg font-medium ${
//             currentQuestion === 0
//               ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//               : "bg-gray-800 text-white hover:bg-gray-700 transition"
//           }`}
//         >
//           ⬅ Prev
//         </button>

//         {currentQuestion < questions.length - 1 ? (
//           <button
//             onClick={nextQuestion}
//             className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
//           >
//             Next ➡
//           </button>
//         ) : (
//           <button
//             onClick={handleSubmit}
//             className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
//           >
//             Submit ✅
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Quiz;

// import { useEffect, useState } from "react";

// const Quiz = ({ data }) => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [score, setScore] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
//   const [submitted, setSubmitted] = useState(false);

//   const questions = data?.questions || [];

//   // 🕒 Countdown Timer
//   useEffect(() => {
//     if (submitted) return;
//     if (timeLeft <= 0) {
//       handleSubmit();
//       return;
//     }
//     const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
//     return () => clearInterval(timer);
//   }, [timeLeft, submitted]);

//   const handleAnswerSelect = (questionIndex, option) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [questionIndex]: option,
//     }));
//   };

//   const handleSubmit = async () => {
//     let correctCount = 0;

//     questions.forEach((q, index) => {
//       const userAnswer = answers[index];
//       const correctAnswers = Array.isArray(q.correct)
//         ? q.correct
//         : [q.correct];

//       if (correctAnswers.includes(userAnswer)) {
//         correctCount++;
//       }
//     });

//     const totalQuestions = questions.length;
//     const calculatedScore = Math.round((correctCount / totalQuestions) * 100);
//     setScore(calculatedScore);
//     setSubmitted(true);

//     // Save result to backend
//     try {
//       await fetch("http://localhost:8000/api/quiz/save", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           username: "student01", // Replace with logged-in username if available
//           testName: data.title || "Unknown Quiz",
//           score: calculatedScore,
//           totalQuestions,
//         }),
//       });
//     } catch (err) {
//       console.error("Error saving quiz result:", err);
//     }
//   };

//   const nextQuestion = () => {
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion((prev) => prev + 1);
//     }
//   };

//   const prevQuestion = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion((prev) => prev - 1);
//     }
//   };

//   const formatTime = (seconds) => {
//     const m = Math.floor(seconds / 60)
//       .toString()
//       .padStart(2, "0");
//     const s = (seconds % 60).toString().padStart(2, "0");
//     return `${m}:${s}`;
//   };

//   if (!questions.length)
//     return (
//       <div className="text-center text-gray-600 py-10">
//         No questions available for this quiz.
//       </div>
//     );

//   if (submitted)
//     return (
//       <div className="text-center py-10">
//         <h2 className="text-2xl font-bold text-green-600 mb-4">
//           🎉 Quiz Submitted!
//         </h2>
//         <p className="text-lg font-semibold text-gray-800">
//           Your Score:{" "}
//           <span className="text-blue-600">{score}%</span>
//         </p>
//       </div>
//     );

//   const q = questions[currentQuestion];

//   return (
//     <div className="p-6 bg-white rounded-xl shadow-md">
//       {/* Timer */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-bold text-gray-800">
//           {data.title}
//         </h2>
//         <div
//           className={`text-lg font-bold px-4 py-2 rounded-lg ${
//             timeLeft < 300 ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-700"
//           }`}
//         >
//           ⏳ {formatTime(timeLeft)}
//         </div>
//       </div>

//       {/* Question */}
//       <div>
//         <h3 className="text-lg font-semibold mb-4">
//           Question {currentQuestion + 1} of {questions.length}
//         </h3>
//         <p className="text-gray-700 mb-6">{q.question}</p>

//         {/* Options */}
//         <div className="space-y-3">
//           {q.options.map((option, i) => (
//             <label
//               key={i}
//               className={`block p-3 border rounded-lg cursor-pointer transition ${
//                 answers[currentQuestion] === option
//                   ? "bg-blue-600 text-white border-blue-600"
//                   : "hover:bg-blue-50 border-gray-300"
//               }`}
//             >
//               <input
//                 type="radio"
//                 name={`question-${currentQuestion}`}
//                 value={option}
//                 checked={answers[currentQuestion] === option}
//                 onChange={() => handleAnswerSelect(currentQuestion, option)}
//                 className="hidden"
//               />
//               {option}
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Navigation */}
//       <div className="flex justify-between items-center mt-8">
//         <button
//           onClick={prevQuestion}
//           disabled={currentQuestion === 0}
//           className={`px-5 py-2 rounded-lg font-medium ${
//             currentQuestion === 0
//               ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//               : "bg-gray-800 text-white hover:bg-gray-700 transition"
//           }`}
//         >
//           ⬅ Prev
//         </button>

//         {currentQuestion < questions.length - 1 ? (
//           <button
//             onClick={nextQuestion}
//             className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
//           >
//             Next ➡
//           </button>
//         ) : (
//           <button
//             onClick={handleSubmit}
//             className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
//           >
//             Submit ✅
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Quiz;
