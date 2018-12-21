import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions
} from "@material-ui/core";
import { generateMap, PlayerTile, FieldTile } from "./generateMap";

class Map {
  constructor(size) {
    const g_map = generateMap(size);
    this.map = g_map.map;
    this.size = size;
    this.blockSize = g_map.blockSize;
    this.ladderIndex = g_map.ladderIndex;
    this.playerLoc = g_map.ladderIndex;
    this.monsterCount = g_map.monsterCount;
    this.itemCount = g_map.itemCount;
    this.viewRange = 7;
  }

  FullMapCard = onClose => {
    let mapList = this.map.slice();
    mapList[this.playerLoc] = new PlayerTile(this.playerLoc);
    let tiles = [];
    for (const tile of mapList) {
      tiles.push(
        <Typography
          variant="caption"
          color={tile.color}
          style={style.typography}
          key={tile.loc}
        >
          {tile.display}{" "}
          {tile.loc % this.size === this.size - 1 ? <br /> : null}
        </Typography>
      );
    }
    return (
      <Card style={style.card}>
        <CardContent style={style.card}>{tiles.map(tile => tile)}</CardContent>
        <CardActions>
          <Button
            fullWidth
            onClick={onClose}
            color="primary"
            variant="contained"
          >
            Close
          </Button>
        </CardActions>
      </Card>
    );
  };

  LocMapCard = () => {
    let mapList = this.map.slice();
    mapList[this.playerLoc] = new PlayerTile(this.playerLoc);
    let tiles = [];

    for (let i = 0; i < this.viewRange; i++) {
      let row = [];
      for (
        let j =
          this.playerLoc -
          Math.floor(this.viewRange / 2) +
          this.size * (i - Math.floor(this.viewRange / 2));
        j <=
        this.playerLoc +
          Math.floor(this.viewRange / 2) +
          this.size * (i - Math.floor(this.viewRange / 2));
        j++
      ) {
        if (
          0 <= j &&
          j < this.size * this.size &&
          0 <=
            j -
              (Math.floor(this.playerLoc / this.size) -
                Math.floor(this.viewRange / 2) +
                i) *
                this.size &&
          j -
            (Math.floor(this.playerLoc / this.size) -
              Math.floor(this.viewRange / 2) +
              i) *
              this.size <
            this.size
        )
          row.push(mapList[j]);
        else row.push(new FieldTile(j));
      }

      let rowIndex = 0;
      for (const tile of row) {
        tiles.push(
          <Typography
            variant="h4"
            color={tile.color}
            style={style.typography}
            key={tile.loc}
          >
            {tile.display}
          </Typography>
        );
        if (rowIndex % this.viewRange < this.viewRange - 1)
          tiles.push(
            <Typography
              variant="h4"
              style={style.typography}
              key={Math.random()}
            >
              {" "}
            </Typography>
          );
        rowIndex++;
      }
      tiles.push(<br key={Math.random()} />);
    }
    return (
      <Card style={style.card}>
        <CardContent>{tiles.map(tile => tile)}</CardContent>
      </Card>
    );
  };
}

const style = {
  card: { padding: "2em", textAlign: "center", overflowX: "scroll" },
  typography: {
    fontFamily: "'Roboto Mono', monospace",
    display: "inline",
    whiteSpace: "nowrap"
  }
};

export { Map };
