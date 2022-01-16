import './App.css';
import { Route, Routes } from 'react-router-dom';
import PollVotingPage from './PollVotingPage';


function App() {
  return (
    <Routes>
      <Route path="/:id" element={<PollVotingPage />} />
    </Routes>
  );
}


export default App;
