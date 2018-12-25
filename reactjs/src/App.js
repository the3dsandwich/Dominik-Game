import React, { Component } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  InputLabel,
  Input,
  Button
} from "@material-ui/core";
import {
  isNei,
  FieldTile,
  MonsterTile,
  ItemTile,
  LadderTile,
  PathTile
} from "./Map/generateMap";
import { Map } from "./Map/mapClass";
import { player } from "./Unit/unitClass";
import MapState from "./States/MapState";
import SingleBattleState from "./States/SingleBattleState";
import {
  PlayerViewState,
  MapViewState,
  LoseViewState
} from "./States/ViewState";
import { Item } from "./Item/itemClass";

const initialState = name => ({
  player: new player(name),
  map: new Map(30),
  mapOpen: false,
  battleOpen: false,
  playerOpen: false,
  itemOpen: false,
  loseOpen: false
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState();
  }

  updatePlayer = newPlayerData => this.setState({ player: newPlayerData });

  updateMap = newMapData => this.setState({ map: newMapData });

  playerGetItem = loc => {
    if (this.state.map.map[loc] instanceof ItemTile) {
      let { player, map } = this.state;
      player.items.push(this.state.map.map[loc].item);
      map.itemCount--;
      map.map[loc] = new PathTile(loc);
      this.updatePlayer(player);
      this.updateMap(map);
    }
  };

  playerUseItem = i => {
    if (this.state.player.items[i] instanceof Item) {
      let { player } = this.state;
      player.makeMove(this.state.player.items[i], i);
      this.updatePlayer(player);
    }
  };

  toggleMapView = () => this.setState({ mapOpen: !this.state.mapOpen });

  togglePlayerView = () =>
    this.setState({ playerOpen: !this.state.playerOpen });

  toggleItemView = () => this.setState({ itemOpen: !this.state.itemOpen });

  resetGame = () => this.setState(initialState());

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
      default:
        console.log(e.keyCode);
        break;
    }
  };

  move = direction => {
    if (!this.state.mapOpen && !this.state.battleOpen) {
      let { map } = this.state;
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
      if (comparTil instanceof LadderTile && this.state.map.monsterCount === 0)
        this.setState({ map: new Map(30) });
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
        style={{ padding: "2em" }}
      >
        <Grid item xs={12}>
          <Typography align="center" variant="h1">
            Dominik
          </Typography>
        </Grid>

        <Grid item xs={12} md={8}>
          <MapState
            map={this.state.map}
            toggleMap={this.toggleMapView}
            togglePlayer={this.togglePlayerView}
            handleMove={this.move}
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
          <LoseViewState
            player={this.state.player}
            open={this.state.loseOpen}
            onClose={this.resetGame}
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
              resetGame={this.resetGame}
            />
          ) : null}
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="title" align="left">
            Info
          </Typography>
          {[
            "Welcome! In this dungeon exploring game you're required to defeat all monsters on each floor. 'M' indicates the monsters you are required to defeat, and 'I' are the items you can pick up. When you've defeated all monsters in a floor, you may return to the ladder (indicated by 'L') to go up to the next floor.",
            "Things you may want to remember:",
            "W goes up",
            "S goes down",
            "A goes left",
            "D goes right",
            "P brings up your character status",
            "M brings up your map"
          ].map(line => (
            <Typography variant="body1" align="left" key={Math.random()}>
              {line}
            </Typography>
          ))}
          <Card style={{ marginTop: "2em" }}>
            <CardContent>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  let player = this.state.player;
                  player.name = this.state.name ? this.state.name : player.name;
                  this.updatePlayer(player);
                  this.setState({ name: "" });
                }}
              >
                <InputLabel>Name</InputLabel>
                <Input
                  fullWidth
                  value={this.state.name}
                  onChange={e => {
                    e.preventDefault();
                    this.setState({ name: e.target.value });
                  }}
                />
                <Button type="submit" fullWidth color="primary">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default App;
