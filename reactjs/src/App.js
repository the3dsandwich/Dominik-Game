import React, { Component } from "react";
import generateMap from "./StateStack/Map/generateMap";
import MapViewState from "./StateStack/Map/MapViewState";
import LocMapCard from "./StateStack/Map/LocMapCard";
import { Button } from "@material-ui/core";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: null,
      map: generateMap(30),
      gameState: [],
      mapopen: false
    };
  }

  updatePlayer = newPlayerData =>
    this.setState({ player: newPlayerData }, console.log(this.state.player));

  updateMap = (loc, newData) => {
    let map = this.state.map;
    map.map[loc] = newData;
    this.setState({ map }, console.log(this.state.map));
  };

  move = () => {
    let k = this.state.map;
    k.playerLoc += 1;
    this.setState({ map: k });
  };

  render() {
    return (
      <div>
        <LocMapCard map={this.state.map} />
        <MapViewState
          open={this.state.mapopen}
          map={this.state.map}
          onClose={() => this.setState({ mapopen: !this.state.mapopen })}
        />
        <Button
          fullWidth
          onClick={() =>
            this.setState(
              { mapopen: !this.state.mapopen },
              console.log(this.state.map)
            )
          }
        >
          map
        </Button>
        <Button fullWidth onClick={this.move}>
          Move
        </Button>
      </div>
    );
  }
}

export default App;
