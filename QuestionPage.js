import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";

function QuestionPage() {
  const { id, qid } = useParams(); // contest id, question id
  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState("// Write your code here");
  const [output, setOutput] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/contests/${id}/questions/${qid}`)
      .then((res) => res.json())
      .then((data) => setQuestion(data))
      .catch((err) => console.error("Error fetching question:", err));
  }, [id, qid]);

  const runCode = async () => {
    const res = await fetch("http://localhost:5000/api/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language: "cpp", code }),
    });
    const data = await res.json();
    setOutput(data.output || data.error);
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      {question ? (
        <>
          <h2>{question.title}</h2>
          <p>{question.description}</p>

          <div style={{ marginTop: "20px" }}>
            <CodeMirror
              value={code}
              height="300px"
              extensions={[cpp()]}
              theme="dark"
              onChange={(value) => setCode(value)}
            />
          </div>

          <button
            onClick={runCode}
            style={{
              background: "#28a745",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              marginTop: "20px",
              cursor: "pointer",
            }}
          >
            Run Code
          </button>

          <h3 style={{ marginTop: "30px" }}>Output:</h3>
          <pre
            style={{
              background: "#f4f4f4",
              padding: "15px",
              borderRadius: "5px",
              width: "80%",
              margin: "10px auto",
              textAlign: "left",
            }}
          >
            {output}
          </pre>

          <Link to={`/contest/${id}`}>
            <button
              style={{
                background: "gray",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                marginTop: "20px",
                cursor: "pointer",
              }}
            >
              Back to Contest
            </button>
          </Link>
        </>
      ) : (
        <p>Loading question...</p>
      )}
    </div>
  );
}

export default QuestionPage;
