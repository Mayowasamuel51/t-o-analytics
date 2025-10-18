import React, { useEffect, useState } from "react";

const QuizResults = () => {
  const rawUser = localStorage.getItem("user");
  let user = null;
  try {
    user = JSON.parse(rawUser);
  } catch {
    user = { email: rawUser };
  }
  const userEmail = user?.email || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(`https://to-backendapi-v1.vercel.app/api/quiz/my-scores/${userEmail}`);
        const data = await res.json();

        // filter results by user email
        const userResults = data.filter(
          (r) => r.username?.toLowerCase() === userEmail.toLowerCase()
        );
        setResults(userResults.reverse()); // latest first
      } catch (err) {
        console.error("Error fetching results:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) fetchResults();
  }, [userEmail]);

  if (loading)
    return (
      <div className="text-center text-white p-4">
        Loading your past test scores...
      </div>
    );

  if (!results.length)
    return (
      <div className="text-center text-white p-6 bg-gray-900 rounded-lg">
        <h2 className="text-xl font-bold mb-2">No Quiz Attempts Found 😅</h2>
        <p>Take your first Splunk test to see your results here.</p>
      </div>
    );

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg max-w-3xl mx-auto mt-20 shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-400">
        Your Past Quiz Scores 🧠
      </h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-800 text-left">
            <th className="p-2 border-b border-gray-700">#</th>
            <th className="p-2 border-b border-gray-700">Date</th>
            <th className="p-2 border-b border-gray-700">Score</th>
            <th className="p-2 border-b border-gray-700">Total</th>
            <th className="p-2 border-b border-gray-700">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, index) => {
            const percent = ((r.score / r.totalQuestions) * 100).toFixed(1);
            const date = new Date(r.dateTaken).toLocaleString(); // ✅ fixed here

            return (
              <tr key={index} className="hover:bg-gray-800 transition-colors">
                <td className="p-2 border-b border-gray-700">{index + 1}</td>
                <td className="p-2 border-b border-gray-700">{date}</td>
                <td className="p-2 border-b border-gray-700">{r.score}</td>
                <td className="p-2 border-b border-gray-700">{r.totalQuestions}</td>
                <td
                  className={`p-2 border-b border-gray-700 font-bold ${
                    percent >= 70 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {percent}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default QuizResults;
