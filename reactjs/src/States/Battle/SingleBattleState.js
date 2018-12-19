import React, { Component } from "react";
import { Grid, Typography, Modal } from "@material-ui/core";
import { unit as unitClass } from "../../Unit/unitClass";

const status = unit =>
  unit instanceof unitClass ? (
    <Grid item container xs={12} md={6}>
      <Grid item xs={8}>
        <Typography variant="h3" color="primary">
          {unit.name}
        </Typography>
      </Grid>
      <Grid item container xs={4} direction="column">
        <Typography variant="body1" color="default">
          {unit.HP} / {unit.MHP}
        </Typography>
        <Typography variant="body1" color="default">
          {unit.MP} / {unit.MMP}
        </Typography>
      </Grid>
    </Grid>
  ) : null;

class SingleBattleState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: this.props.player,
      opponent: this.props.opponent
    };
  }

  render() {
    return (
      <Modal open={this.props.open}>
        <Grid container>
          {status(this.state.player)}
          {status(this.state.opponent)}
        </Grid>
      </Modal>
    );
  }
}

export default SingleBattleState;
