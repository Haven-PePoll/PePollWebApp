import React, { useState } from "react";
import { getRatingSummary } from "./CommonHelpers";
import RatingData from "./Rating";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

interface SelectedDateRatingDisplayProps {
  ratings: RatingData[];
}

export const SelectedDateRatingDisplay: React.FC<SelectedDateRatingDisplayProps> =
  (props) => {
    const [viewSummary, setviewSummary] = useState(false);

    return (
      <div>
        <button
          style={{ marginTop: 10 }}
          onClick={() => {
            setviewSummary(!viewSummary);
          }}
        >
          Click to View {viewSummary ? "Detailed" : "Summary"}
        </button>

        {viewSummary
          ? getRatingSummary(props.ratings).map(
              (summary: number, _index: number) => (
                <div
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#9f3bf7",
                    borderRadius: 10,
                    marginTop: 10,
                  }}
                >
                  <h1
                    style={{
                      display: "flex",
                      padding: 10,
                      paddingLeft: 20,
                      color: "white",
                      fontWeight: "bold",
                      textAlign: "left",
                      fontSize: 20,
                    }}
                  >
                    <Rating
                      name="text-feedback"
                      value={_index + 1}
                      readOnly
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 1, color: "gray" }}
                          fontSize="inherit"
                        />
                      }
                      size="large"
                    />
                    <div
                      style={{ marginLeft: 10, marginTop: 4, marginRight: 10 }}
                    >
                      ({summary})
                    </div>
                  </h1>
                </div>
              )
            )
          : props.ratings.map((rating: RatingData, _index: number) => (
              <div
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#9f3bf7",
                  borderRadius: 10,
                  marginTop: 10,
                }}
              >
                <h1
                  style={{
                    padding: 10,
                    paddingLeft: 20,
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "left",
                    fontSize: 20,
                  }}
                >
                  {new Date(rating.timestamp * 1000).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "IST",
                  })}
                  : {rating.rating}/5
                </h1>
              </div>
            ))}
      </div>
    );
  };
