import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSelector } from "reselect";
import {
  getAverageRating,
  getDisplayTimeFromUnixTimestamp,
} from "./CommonHelpers";
import { GetOnlineStatus } from "./OnlineStatusActions";
import { GetRatings } from "./RatingActions";
import ResultCard from "./ResultCard";
import { SelectedDateRatingDisplay } from "./SelectedDataRatingDisplay";
import { StarsDisplay } from "./StarsDisplay";
import { RootState } from "./Store";
import DatePicker from "react-date-picker";

export default function RatingViewPage() {
  const dispatch = useDispatch();

  const [date, onChange] = useState(new Date());

  const todaysRatingFilter = createSelector(
    (state: RootState) => state.ratingState.ratings,
    (ratings) =>
      ratings
        .filter(
          (rating) =>
            new Date(rating.timestamp * 1000).toDateString() ===
            date.toDateString()
        )
        .sort((a, b) => b.timestamp - a.timestamp)
  );

  const onlineStatus = useSelector(
    (state: RootState) => state.onlineState.online
  );

  const todaysRating = useSelector(todaysRatingFilter);

  const { id } = useParams();

  useEffect(() => {
    dispatch(GetRatings(id as String));
    dispatch(GetOnlineStatus(id as String));
  }, [id]);

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
            fontSize: 25,
          }}
        >
          {id}'s Overall Ratings
        </h1>

        <ResultCard></ResultCard>
      </div>

      <div>
        {onlineStatus &&
          "Last Online At " +
            getDisplayTimeFromUnixTimestamp(onlineStatus.timestamp)}
      </div>

      <Divider variant="middle" style={{ marginTop: 10, color: "black" }} />

      <div
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#651BA6",
          borderRadius: 10,
          paddingBottom: 10,
          marginTop: 10,
        }}
      >
        <h1
          style={{
            padding: 10,
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 25,
          }}
        >
          Today's Ratings: {id === "englishfoodbar" ? "Service" : "Food"}
        </h1>

        <div
          style={{
            padding: 0,
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {todaysRating && (
            <StarsDisplay
              numberOfStars={getAverageRating(todaysRating)}
            ></StarsDisplay>
          )}
        </div>
      </div>

      <SelectedDateRatingDisplay
        ratings={todaysRating}
      ></SelectedDateRatingDisplay>
    </div>
  );
}
