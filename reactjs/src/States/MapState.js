import React, { Component } from "react";
import { Button, Grid, Typography } from "@material-ui/core";

const directionButton = (direction, text, handleMove) => (
  <Grid item xs={4}>
    <Button
      fullWidth
      variant="contained"
      color="primary"
      onClick={() => handleMove(direction)}
    >
      {text}
    </Button>
  </Grid>
);

class MapState extends Component {
  state = { direction: this.props.direction };
  render() {
    return (
      <Grid container justify="center" spacing={16}>
        <Grid item xs={12}>
          <Typography align="center" variant="h1">
            Dominik
          </Typography>
        </Grid>
        <Grid item container xs={12} justify="center">
          <Grid item xs={12} md={6}>
            {this.props.map.LocMapCard({ map: this.props.map })}
          </Grid>
        </Grid>
        <Grid item container xs={12} md={3} direction="column" spacing={8}>
          <Grid item container direction="row" spacing={8}>
            <Grid item xs={4} />
            {directionButton(0, "up", this.props.handleMove)}
          </Grid>
          <Grid item container direction="row" spacing={8}>
            {directionButton(3, "left", this.props.handleMove)}
            {directionButton(2, "down", this.props.handleMove)}
            {directionButton(1, "right", this.props.handleMove)}
          </Grid>
          <Grid item container direction="row" justify="center" spacing={8}>
            <Grid item xs>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                onClick={this.props.toggleMap}
              >
                Map
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                onClick={this.props.togglePlayer}
              >
                Status
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default MapState;
