import React from "react";
import { Card, Grid, Typography, Button } from "@material-ui/core";

const PlayerCard = ({ player, onClose }) => {
  return (
    <Card style={style.card}>
      <Grid container>
        <Grid item xs={8}>
          <Typography variant="h4" color="default">
            {player.name}
          </Typography>
        </Grid>
        <Grid item container xs={4} direction="column">
          <Typography variant="body1" color="default">
            {player.HP} / {player.MHP}
          </Typography>
          <Typography variant="body1" color="default">
            {player.MP} / {player.MMP}
          </Typography>
        </Grid>
      </Grid>
      <Button fullWidth variant="contained" color="primary" onClick={onClose}>
        Close
      </Button>
    </Card>
  );
};

const style = {
  card: {
    textAlign: "center",
    overflowX: "scroll",
    overflowY: "scroll"
  },
  typography: {
    fontFamily: "'Roboto Mono', monospace",
    display: "inline",
    whiteSpace: "nowrap"
  }
};

export default PlayerCard;
