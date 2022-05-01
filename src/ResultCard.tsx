import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { RootState } from "./Store";
import { Grid } from "@mui/material";

export default function OutlinedCard() {
  const currentPoll = useSelector(
    (state: RootState) => state.pollState.currentPoll
  );

  return (
    <div className="app">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box sx={{ margin: 2, marginTop: 0, marginRight: 0 }}>
            <Card variant="outlined">
              <React.Fragment>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 22, textAlign: "center" }}
                    color="text.primary"
                  >
                    {currentPoll.Options && currentPoll.Options[0]}
                  </Typography>
                  <Typography
                    sx={{ textAlign: "center" }}
                    color="text.secondary"
                  >
                    {currentPoll.Votes && currentPoll.Votes[0]}
                  </Typography>
                </CardContent>
              </React.Fragment>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ margin: 2, marginTop: 0, marginLeft: 0 }}>
            <Card variant="outlined">
              <React.Fragment>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 22, textAlign: "center" }}
                    color="text.primary"
                  >
                    {currentPoll.Options && currentPoll.Options[1]}
                  </Typography>
                  <Typography
                    sx={{ textAlign: "center" }}
                    color="text.secondary"
                  >
                    {currentPoll.Votes && currentPoll.Votes[1]}
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
