import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function Home() {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/contests")
      .then((res) => res.json())
      .then((data) => setContests(data))
      .catch((err) => console.error("Error fetching contests:", err));
  }, []);

  return (
    <div>
      {/* 🌐 Navbar */}
      <div className="navbar">
        <h1>Shodh-a-Code</h1>
        <div>
          <a href="/">Home</a>
          <a href="#contests">Contests</a>
        </div>
      </div>

      {/* 🏠 Home Section */}
      <div className="home-container">
        <h2>Welcome to Shodh-a-Code</h2>
        <p>
          Test your coding skills with contests designed to challenge your
          thinking, logic, and speed 🚀
        </p>

        {/* 🔥 Contest Cards */}
        <div id="contests">
          {contests.length === 0 ? (
            <h3>Loading contests...</h3>
          ) : (
            contests.map((contest) => (
              <Link
                to={`/contest/${contest.id}`}
                key={contest.id}
                style={{ textDecoration: "none" }}
              >
                <div className="contest-card">
                  <h3>{contest.name}</h3>
                  <p>
                    <b>Difficulty:</b> {contest.difficulty}
                  </p>
                  <p>
                    <p><b>Questions:</b>{" "}{contest.questions ? contest.questions.length : "N/A"}</p>

                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* ⚡ Footer */}
      <div className="footer">
        © {new Date().getFullYear()} Shodh-a-Code | Built with 💙 by Liza
      </div>
    </div>
  );
}

export default Home;
