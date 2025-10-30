import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function ProblemPage() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("// Write your solution here");
  const [output, setOutput] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/problems/${id}`)
      .then(res => res.json())
      .then(data => setProblem(data))
      .catch(err => console.error("Error fetching problem:", err));
  }, [id]);

  const handleRun = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      setOutput(data.output);
    } catch (err) {
      console.error("Error running code:", err);
    }
  };

  if (!problem) return <h2 className="text-center mt-10">Loading...</h2>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4">{problem.title}</h1>
        <p className="text-gray-700 mb-6">{problem.description}</p>

        <textarea
          value={code}
          onChange={e => setCode(e.target.value)}
          rows="12"
          className="w-full p-3 border rounded-lg font-mono text-sm"
        />

        <div className="fl
