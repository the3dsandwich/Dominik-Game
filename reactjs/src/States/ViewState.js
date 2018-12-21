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

const PlayerViewState = ({ player, open, onClose, playerUseItem }) => (
  <ViewState
    md={6}
    open={open}
    onClose={onClose}
    item={player.FullPlayerCard(onClose, playerUseItem)}
  />
);

const MapViewState = ({ map, open, onClose }) => (
  <ViewState
    md={6}
    open={open}
    onClose={onClose}
    item={map.FullMapCard(onClose)}
  />
);

const ItemViewState = ({ player, open, onClose }) => (
  <ViewState md={4} open={open} onClose={onClose} item={null} />
);

export default ViewState;
export { PlayerViewState, MapViewState, ItemViewState };
