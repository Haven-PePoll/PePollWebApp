import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { RootState } from "./Store";
import { Grid } from "@mui/material";
import { createSelector } from "reselect";
import RatingData from "./Rating";
import { getAverageRating } from "./CommonHelpers";

export default function OutlinedCard() {
  const ambianceRatingsFilter = createSelector(
    (state: RootState) => state.ratingState.ratings,
    (ratings) => ratings.filter((rating) => rating.question === "Ambiance")
  );

  const foodRatingsFilter = createSelector(
    (state: RootState) => state.ratingState.ratings,
    (ratings) => ratings.filter((rating) => rating.question === "Food")
  );

  const serviceRatingsFilter = createSelector(
    (state: RootState) => state.ratingState.ratings,
    (ratings) => ratings.filter((rating) => rating.question === "Service")
  );

  const ambianceRatings = useSelector(ambianceRatingsFilter);
  const foodRatings = useSelector(foodRatingsFilter);
  const serviceRatings = useSelector(serviceRatingsFilter);

  return (
    <div className="app">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box sx={{ marginLeft: 1 }}>
            <Card variant="outlined">
              <React.Fragment>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 20, textAlign: "center" }}
                    color="text.primary"
                  >
                    Service
                  </Typography>
                  <Typography
                    sx={{ textAlign: "center" }}
                    color="text.secondary"
                  >
                    {serviceRatings && getAverageRating(serviceRatings)}/5
                  </Typography>
                </CardContent>
              </React.Fragment>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{}}>
            <Card variant="outlined">
              <React.Fragment>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 20, textAlign: "center" }}
                    color="text.primary"
                  >
                    Ambiance
                  </Typography>
                  <Typography
                    sx={{ textAlign: "center" }}
                    color="text.secondary"
                  >
                    {ambianceRatings && getAverageRating(ambianceRatings)}/5
                  </Typography>
                </CardContent>
              </React.Fragment>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ marginRight: 1 }}>
            <Card variant="outlined">
              <React.Fragment>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 20, textAlign: "center" }}
                    color="text.primary"
                  >
                    Food
                  </Typography>
                  <Typography
                    sx={{ textAlign: "center" }}
                    color="text.secondary"
                  >
                    {foodRatings && getAverageRating(foodRatings)}/5
                  </Typography>
                </CardContent>
              </React.Fragment>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
