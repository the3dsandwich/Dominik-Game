import React from "react";
import { Modal, Grid } from "@material-ui/core";

const ViewState = ({ md, item, open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Grid container justify="center" style={{ height: "100%" }}>
        <Grid
          item
          container
          xs={12}
          md={md}
          direction="column"
          justify="center"
          style={{ padding: "2em" }}
        >
          <Grid item>{item}</Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};

const PlayerViewState = ({ player, open, onClose }) => {
  return (
    <ViewState
      md={4}
      open={open}
      onClose={onClose}
      item={player.FullPlayerCard(onClose)}
    />
  );
};

const MapViewState = ({ map, open, onClose }) => {
  return (
    <ViewState
      md={6}
      open={open}
      onClose={onClose}
      item={map.FullMapCard(onClose)}
    />
  );
};

export default ViewState;
export { PlayerViewState, MapViewState };
