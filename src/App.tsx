import "./App.css";
import { Route, Routes } from "react-router-dom";
import PollVotingPage from "./PollVotingPage";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    console.log("AYEOOOO");
  }, []);

  return (
    <Routes>
      <Route path="/:id" element={<PollVotingPage />} />
    </Routes>
  );
}

export default App;
