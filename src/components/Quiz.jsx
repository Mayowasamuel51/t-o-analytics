import { useEffect, useState } from "react";

const Quiz = ({ data }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [submitted, setSubmitted] = useState(false);

  const questions = data?.questions || [];

  // 🕒 Countdown Timer
  useEffect(() => {
    if (submitted) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  const handleAnswerSelect = (questionIndex, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  const handleSubmit = async () => {
    let correctCount = 0;

    questions.forEach((q, index) => {
      const userAnswer = answers[index];
      const correctAnswers = Array.isArray(q.correct) ? q.correct : [q.correct];

      if (correctAnswers.includes(userAnswer)) {
        correctCount++;
      }
    });

    const totalQuestions = questions.length;
    const calculatedScore = Math.round((correctCount / totalQuestions) * 100);
    setScore(calculatedScore);
    setSubmitted(true);

    // Save result to backend
    try {
      await fetch("http://localhost:8000/api/quiz/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "student01",
          testName: data.title || "Unknown Quiz",
          score: calculatedScore,
          totalQuestions,
        }),
      });
    } catch (err) {
      console.error("Error saving quiz result:", err);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

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
        <p className="text-lg font-semibold text-gray-800">
          Your Score: <span className="text-blue-600">{score}%</span>
        </p>
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
