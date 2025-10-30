import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";

const ProblemPage = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("// Write your code here...");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/problems/${id}`);
        const data = await res.json();
        setProblem(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProblem();
  }, [id]);

  const handleRun = async () => {
    setLoading(true);
    setOutput("");
    try {
      const res = await fetch("http://localhost:5000/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language: "cpp" }),
      });
      const data = await res.json();
      setOutput(data.output);
    } catch (err) {
      setOutput("Error running code!");
    } finally {
      setLoading(false);
    }
  };

  if (!problem) return <div className="text-center mt-20">Loading Problem...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-3">{problem.title}</h1>
      <p className="text-gray-300 mb-6">{problem.description}</p>

      <div className="bg-gray-800 p-4 rounded-2xl mb-6">
        <h2 className="text-lg font-semibold text-gray-200 mb-2">Input Format</h2>
        <p className="text-gray-400">{problem.inputFormat}</p>
        <h2 className="text-lg font-semibold text-gray-200 mt-4 mb-2">Output Format</h2>
        <p className="text-gray-400">{problem.outputFormat}</p>
        <h2 className="text-lg font-semibold text-gray-200 mt-4 mb-2">Example</h2>
        <pre className="bg-gray-900 p-3 rounded text-gray-300">
          {problem.example}
        </pre>
      </div>

      <AceEditor
        mode="c_cpp"
        theme="monokai"
        name="codeEditor"
        width="100%"
        height="350px"
        value={code}
        onChange={(val) => setCode(val)}
        fontSize={14}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
        className="rounded-xl"
      />

      <div className="mt-4 flex gap-3">
        <button
          onClick={handleRun}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold"
        >
          {loading ? "Running..." : "Run Code"}
        </button>
      </div>

      {output && (
        <div className="mt-5 bg-gray-900 p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">Output:</h2>
          <pre className="text-gray-300">{output}</pre>
        </div>
      )}
    </div>
  );
};

export default ProblemPage;
