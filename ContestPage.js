import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function ContestPage() {
  const { id } = useParams();
  const [contest, setContest] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/contests/${id}`)
      .then(res => res.json())
      .then(data => setContest(data))
      .catch(err => console.error("Error fetching contest:", err));
  }, [id]);

  if (!contest) return <h2 className="text-center mt-10">Loading...</h2>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-4">{contest.name}</h1>
        <p className="text-center text-gray-600 mb-6">
          Difficulty: <b>{contest.difficulty}</b>
        </p>

        <h2 className="text-2xl font-semibold mb-4">Questions</h2>
        <ul className="space-y-3">
          {contest.questions.map(q => (
            <li key={q.id} className="p-4 border rounded-lg bg-gray-100">
              <h3 className="font-bold text-lg">{q.title}</h3>
              <p className="text-gray-700 mt-1">{q.description}</p>

              {/* ✅ Wrap Solve button in Link */}
              <Link to={`/contest/${id}/questions/${q.id}`}>
                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Solve
                </button>
              </Link>
            </li>
          ))}
        </ul>

        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-blue-600 hover:underline font-medium text-lg"
          >
            ← Back to Contests
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ContestPage;
