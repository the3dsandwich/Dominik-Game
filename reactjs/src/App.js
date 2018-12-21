import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import {
  isNei,
  FieldTile,
  MonsterTile,
  ItemTile,
  // LadderTile,
  PathTile
} from "./Map/generateMap";
import { Map } from "./Map/mapClass";
import { player } from "./Unit/unitClass";
import MapState from "./States/MapState";
import SingleBattleState from "./States/SingleBattleState";
import { PlayerViewState, MapViewState } from "./States/ViewState";
import { Item } from "./Item/itemClass";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: new player(),
      map: new Map(30),
      mapOpen: false,
      battleOpen: false,
      playerOpen: false,
      itemOpen: false
    };
    new Map(30);
  }

  updatePlayer = newPlayerData => this.setState({ player: newPlayerData });

  updateMap = (loc, newData) => {
    let map = this.state.map;
    map.map[loc] = newData;
    this.setState({ map });
  };

  playerGetItem = loc => {
    if (this.state.map.map[loc] instanceof ItemTile) {
      let player = this.state.player;
      player.items.push(this.state.map.map[loc].item);
      this.updatePlayer(player);
      this.updateMap(loc, new PathTile(loc));
    }
  };

  playerUseItem = i => {
    if (this.state.player.items[i] instanceof Item) {
      let player = this.state.player;
      player.makeMove(this.state.player.items[i], i);
      this.updatePlayer(player);
    }
  };

  toggleMapView = () => this.setState({ mapOpen: !this.state.mapOpen });

  togglePlayerView = () =>
    this.setState({ playerOpen: !this.state.playerOpen });

  toggleItemView = () => this.setState({ itemOpen: !this.state.itemOpen });

  openBattle = () => this.setState({ battleOpen: true });

  closeBattle = () => this.setState({ battleOpen: false });

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
      case 80:
        this.togglePlayerView();
        break;
      case 73:
        console.log("I");
        break;
      default:
        console.log(e.keyCode);
        break;
    }
  };

  handleMoveClick = id => {
    this.move(id);
  };

  move = direction => {
    if (!this.state.mapOpen && !this.state.battleOpen) {
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

      this.updateMap(map);

      if (comparTil instanceof MonsterTile) this.openBattle();
      if (comparTil instanceof ItemTile) this.playerGetItem(map.playerLoc);
    }
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
            togglePlayer={this.togglePlayerView}
            handleMove={this.handleMoveClick}
          />
          <MapViewState
            open={this.state.mapOpen}
            map={this.state.map}
            onClose={this.toggleMapView}
          />
          <PlayerViewState
            player={this.state.player}
            open={this.state.playerOpen}
            onClose={this.togglePlayerView}
            playerUseItem={this.playerUseItem}
          />
          {this.state.map.map[this.state.map.playerLoc] instanceof
          MonsterTile ? (
            <SingleBattleState
              open={this.state.battleOpen}
              closeBattle={this.closeBattle}
              player={this.state.player}
              opponent={this.state.map.map[this.state.map.playerLoc].monster}
              map={this.state.map}
              updateMap={this.updateMap}
              updatePlayer={this.updatePlayer}
            />
          ) : null}
        </Grid>
      </Grid>
    );
  }
}

export default App;
