import { useEffect, useState } from "react";
import "./App.css";
import { RootState } from "./Store";
import { useDispatch, useSelector } from "react-redux";
import { GetPoll, SetPoll, WritePoll } from "./PollActions";
import { useParams } from "react-router-dom";
import ResultCard from "./ResultCard";
import { Rating } from "react-simple-star-rating";
import { Button, TextField } from "@mui/material";
import { SetFeedback } from "./FeedbackActions";
import { IFeedbackData } from "./Feedback";

export default function PollVotingPage() {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0); // initial rating value

  const [feedback, setFeedback] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFeedbackSubmitted(false)
    setFeedback(event.target.value);
  };

  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleRating = (rate: number) => {
    setFeedbackSubmitted(false)
    setRating(rate);
    // other logic
  };

  const currentPoll = useSelector(
    (state: RootState) => state.pollState.currentPoll
  );

  const { id } = useParams();

  useEffect(() => {
    dispatch(GetPoll(id as string));
  }, [id]);

  function getRandomArbitrary(min: number, max: number) {
    return Math.trunc(Math.random() * (max - min) + min);
  }

  const handleClick = () => {
    window.open(
      "whatsapp://send?text=https://thepollingboothmvp.web.app/" + id
    );
  };

  const handleSubmit = () => {
    const feedbackTemp = {
      Feedback: feedback,
      FeedbackTime: new Date(),
      Stars: rating,
    } as IFeedbackData;

    dispatch(SetFeedback(feedbackTemp));

    setFeedback("")
    setRating(0)
    setFeedbackSubmitted(true)
  };

  useEffect(() => {
    if (currentPoll.Votes) {
      currentPoll.Votes[0] += getRandomArbitrary(1, 4);
      currentPoll.Votes[1] += getRandomArbitrary(1, 4);

      dispatch(WritePoll(currentPoll, id ?? ""));
    }
  }, [currentPoll]);

  return (
    <div className="App">
      <h1>{currentPoll.Title}</h1>
      <ResultCard></ResultCard>

      <h1 style={{ marginTop: 50 }}>Thanks for visiting Haven</h1>

      <body>
        We are a new platform that tries to make people interact with their
        surroundings rather than being addicted to their phones all the time!
        Please let us know if you like our initiative
      </body>

      <TextField
        fullWidth
        id="outlined-name"
        label="Enter Feedback Here"
        value={feedback}
        onChange={handleChange}
        style={{ marginBottom: 10, marginTop: 20 }}
      />

      <Rating
        onClick={handleRating}
        ratingValue={rating} /* Available Props */
      />

      <Button
        variant="contained"
        style={{ marginLeft: 20 }}
        onClick={handleSubmit}
      >
        Submit
      </Button>

      {feedbackSubmitted && <body style={{fontWeight: 'bold', color: 'blue', marginTop: 20}}>THANKS FOR YOUR FEEDBACK</body>}
    </div>
  );
}
