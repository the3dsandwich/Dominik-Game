import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import generateMap, { isNei, FieldTile } from "./StateStack/Map/generateMap";
import { player } from "./Unit/unitClass";
import MapViewState from "./StateStack/Map/MapViewState";
import MapState from "./StateStack/Map/MapState";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: new player(),
      map: generateMap(30),
      mapOpen: false,
      battleOpen: false
    };
  }

  updatePlayer = newPlayerData =>
    this.setState({ player: newPlayerData }, console.log(this.state.player));

  updateMap = (loc, newData) => {
    let map = this.state.map;
    map.map[loc] = newData;
    this.setState({ map }, console.log(this.state.map));
  };

  toggleMapView = () => this.setState({ mapOpen: !this.state.mapOpen });

  handleKey = e => {
    switch (e.keyCode) {
      case 37:
      case 65:
        this.move(3);
        break;
      case 38:
      case 87:
        this.move(0);
        break;
      case 39:
      case 68:
        this.move(1);
        break;
      case 40:
      case 83:
        this.move(2);
        break;
      case 77:
        this.toggleMapView();
        break;
      default:
        break;
    }
  };

  handleMoveClick = id => {
    this.move(id);
  };

  move = direction => {
    let map = this.state.map;
    let playerLoc = map.playerLoc;
    let comparTil;
    switch (direction) {
      case 0:
        comparTil = map.map[playerLoc - map.size];
        break;
      case 1:
        comparTil = map.map[playerLoc + 1];
        break;
      case 2:
        comparTil = map.map[playerLoc + map.size];
        break;
      case 3:
        comparTil = map.map[playerLoc - 1];
        break;
      default:
        comparTil = new FieldTile(0);
        break;
    }
    const newPlayerLoc =
      isNei(playerLoc, comparTil.loc, false, map.size) &&
      !(comparTil instanceof FieldTile)
        ? comparTil.loc
        : playerLoc;
    map.playerLoc = newPlayerLoc;
    if (!this.state.mapOpen) this.setState({ map });
  };

  render() {
    return (
      <Grid
        container
        justify="center"
        spacing={16}
        tabIndex="0"
        onKeyDown={this.handleKey}
      >
        <Grid item xs={12}>
          <MapState
            map={this.state.map}
            toggleMap={this.toggleMapView}
            handleMove={this.handleMoveClick}
          />
          <MapViewState
            open={this.state.mapOpen}
            map={this.state.map}
            onClose={this.toggleMapView}
          />
        </Grid>
      </Grid>
    );
  }
}

export default App;
