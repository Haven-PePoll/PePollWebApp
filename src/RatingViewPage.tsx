import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSelector } from "reselect";
import { getAverageRating } from "./CommonHelpers";
import RatingData from "./Rating";
import { GetRatings } from "./RatingActions";
import ResultCard from "./ResultCard";
import { SelectedDateRatingDisplay } from "./SelectedDataRatingDisplay";
import { StarsDisplay } from "./StarsDisplay";
import { RootState } from "./Store";

export default function RatingViewPage() {
  const dispatch = useDispatch();

  const todaysRatingFilter = createSelector(
    (state: RootState) => state.ratingState.ratings,
    (ratings) =>
      ratings
        // .filter(
        //   (rating) =>
        //     new Date(rating.timestamp * 1000).toDateString() ===
        //     new Date().toDateString()
        // )
        .sort((a, b) => b.timestamp - a.timestamp)
  );

  const todaysRating = useSelector(todaysRatingFilter);

  const { id } = useParams();

  useEffect(() => {
    dispatch(GetRatings(id as String));
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
          Today's Ratings: {id === "creamery" ? "Food" : "Ambiance"}
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

      <SelectedDateRatingDisplay ratings={todaysRating}></SelectedDateRatingDisplay>
      
    </div>
  );
}
