import React from "react";
import { PlayerTile, FieldTile } from "./generateMap";
import { Card, CardContent, Typography } from "@material-ui/core";

const LocMapCard = ({ map }) => {
  let mapList = map.map.length ? map.map.slice() : [];
  mapList[map.playerLoc] = new PlayerTile(map.playerLoc);
  let tiles = [];

  for (let i = 0; i < map.viewRange; i++) {
    let row = [];
    for (
      let j =
        map.playerLoc -
        Math.floor(map.viewRange / 2) +
        map.size * (i - Math.floor(map.viewRange / 2));
      j <=
      map.playerLoc +
        Math.floor(map.viewRange / 2) +
        map.size * (i - Math.floor(map.viewRange / 2));
      j++
    ) {
      if (
        0 <= j &&
        j < map.size * map.size &&
        0 <=
          j -
            (Math.floor(map.playerLoc / map.size) -
              Math.floor(map.viewRange / 2) +
              i) *
              map.size &&
        j -
          (Math.floor(map.playerLoc / map.size) -
            Math.floor(map.viewRange / 2) +
            i) *
            map.size <
          map.size
      )
        row.push(mapList[j]);
      else row.push(new FieldTile(j));
    }

    let rowIndex = 0;
    for (const tile of row) {
      tiles.push(
        <Typography variant="h2" style={style.typography} key={tile.loc}>
          {tile.display}
        </Typography>
      );
      if (rowIndex % map.viewRange < map.viewRange - 1)
        tiles.push(
          <Typography variant="h4" style={style.typography} key={Math.random()}>
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

const style = {
  card: {
    textAlign: "center",
    overflowX: "scroll",
    overflowY: "scroll"
  },
  typography: {
    fontFamily: "'Roboto Mono', monospace",
    display: "inline",
    whiteSpace: "nowrap"
  }
};

export default LocMapCard;
