import { useEffect } from "react";
import "./App.css";
import { RootState } from "./Store";
import { useDispatch, useSelector } from "react-redux";
import { GetCurrentPolls, WritePoll } from "./PollActions";
import { useParams } from "react-router-dom";
import ResultCard from "./ResultCard";
import IPollData from "./Poll";
import Divider from "@mui/material/Divider";

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
    <div className="App" style={{ background: "#e3c8fa" }}>
      <div
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#651BA6",
          borderRadius: 10,
          paddingBottom: 10,
        }}
      >
        <h1
          style={{
            padding: 10,
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 30,
          }}
        >
          {currentPoll.Title}
        </h1>

        <ResultCard></ResultCard>

        <h1
          style={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 19,
          }}
        >
          @{currentPoll.Location}
        </h1>
      </div>

      <Divider variant="middle" style={{ marginTop: 20 }} />

      {/* <h1 style={{ marginTop: 50 }}>Thanks for visiting Haven</h1>

      <body>
        We are a new platform that tries to make people interact with their
        surroundings rather than being addicted to their phones all the time!
      </body> */}

      <h1 style={{ marginTop: 10, fontWeight: "bold", textAlign: "center" }}>
        Other polls near you
      </h1>

      {otherPolls.map((poll: IPollData, index: number) => (
        <div
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "#651BA6",
            borderRadius: 10,
            padding: 10,
            marginBottom: 10,
          }}
        >
          <h1
            style={{
              color: "white",
              fontWeight: "bold",
              textAlign: "start",
              fontSize: 19,
            }}
          >
            @{poll.Location}
          </h1>
          <h1
            style={{
              color: "white",
              fontWeight: "bold",
              textAlign: "start",
              fontSize: 19,
            }}
          >
            {poll.Title}
          </h1>

          <h1
            style={{
              color: "white",
              fontWeight: "bold",
              textAlign: "start",
              fontSize: 19,
            }}
          >
            {poll.Options && poll.Options[0]}:{poll.Votes && poll.Votes[0]} | {poll.Options && poll.Options[1]}:{poll.Votes && poll.Votes[1]}
          </h1>
        </div>
      ))}
    </div>
  );
}
