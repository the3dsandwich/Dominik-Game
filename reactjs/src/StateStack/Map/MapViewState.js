import React from "react";
import { Modal } from "@material-ui/core";
import FullMapCard from "./FullMapCard";

const MapViewState = ({ map, open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} style={style.modal}>
      <FullMapCard map={map} />
    </Modal>
  );
};

const style = {
  modal: {}
};

export default MapViewState;
