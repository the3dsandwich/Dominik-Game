import React from "react";
import { PlayerTile } from "./generateMap";
import { Card, CardContent, Typography } from "@material-ui/core";

const FullMapCard = ({ map }) => {
  let mapList = map.map.length ? map.map.slice() : [];
  mapList[map.playerLoc] = new PlayerTile(map.playerLoc);
  let tiles = [];
  for (const tile of mapList) {
    tiles.push(
      <Typography
        variant="caption"
        color={tile.color}
        style={style.typography}
        key={tile.loc}
      >
        {tile.display} {tile.loc % map.size === map.size - 1 ? <br /> : null}
      </Typography>
    );
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

export default FullMapCard;
