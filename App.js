import React from "react";
import QuestionPage from "./QuestionPage";  // ✅ Correct file
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ContestPage from "./ContestPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contest/:id" element={<ContestPage />} />
        {/* ✅ Correct route for each question */}
        <Route path="/contest/:id/questions/:qid" element={<QuestionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
