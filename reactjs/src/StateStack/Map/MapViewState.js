import React from "react";
import { Modal, Grid, Button } from "@material-ui/core";
import FullMapCard from "./FullMapCard";

const MapViewState = ({ map, open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Grid container justify="center" style={{ height: "100%" }}>
        <Grid
          item
          container
          xs={12}
          md={6}
          direction="column"
          justify="center"
          style={{ padding: "2em" }}
        >
          <Grid item>
            <FullMapCard map={map} />
          </Grid>
          <Grid item>
            <Button
              fullWidth
              onClick={onClose}
              color="primary"
              variant="contained"
            >
              Close
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default MapViewState;
