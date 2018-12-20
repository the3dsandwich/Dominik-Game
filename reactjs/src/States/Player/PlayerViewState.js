import React from "react";
import { Modal, Grid } from "@material-ui/core";
import PlayerCard from "./PlayerCard";

const MapViewState = ({ player, open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Grid container justify="center" style={{ height: "100%" }}>
        <Grid
          item
          container
          xs={12}
          md={4}
          direction="column"
          justify="center"
          style={{ padding: "2em" }}
        >
          <Grid item>
            <PlayerCard player={player} onClose={onClose} />
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default MapViewState;
