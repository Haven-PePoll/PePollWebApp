import { useEffect, useState } from "react";
import "./App.css";
import { RootState } from "./Store";
import { useDispatch, useSelector } from "react-redux";
import { GetCurrentPolls, GetPoll, SetPoll, WritePoll } from "./PollActions";
import { useParams } from "react-router-dom";
import ResultCard from "./ResultCard";
import { Rating } from "react-simple-star-rating";
import { Button, TextField } from "@mui/material";
import { SetFeedback } from "./FeedbackActions";
import { IFeedbackData } from "./Feedback";
import IPollData from "./Poll";

export default function PollVotingPage() {
  const dispatch = useDispatch();

  const currentPoll = useSelector(
    (state: RootState) => state.pollState.currentPoll
  );

  const otherPolls = useSelector(
    (state: RootState) => state.pollState.otherCurrentPolls
  );

  const { id } = useParams();

  useEffect(() => {
    dispatch(GetCurrentPolls(id as string));
  }, [id]);

  function getRandomArbitrary(min: number, max: number) {
    return Math.trunc(Math.random() * (max - min) + min);
  }

  const handleClick = () => {
    window.open(
      "whatsapp://send?text=https://thepollingboothmvp.web.app/" + id
    );
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

      {/* <h1 style={{ marginTop: 50 }}>Thanks for visiting Haven</h1>

      <body>
        We are a new platform that tries to make people interact with their
        surroundings rather than being addicted to their phones all the time!
      </body> */}

      <h1 style={{ marginTop: 50, fontWeight: "bold" }}>
        Other polls in your area
      </h1>

      {otherPolls.map((poll: IPollData, index: number) => (
        <div>{poll.Title}</div>
      ))} 
    </div>
  );
}
