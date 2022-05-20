import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import RatingViewPage from "./RatingViewPage";

function App() {
  useEffect(() => {
    console.log("AYEOOOO");
  }, []);

  return (
    <Routes>
      <Route path="/:id" element={<RatingViewPage />} />
    </Routes>
  );
}

export default App;
