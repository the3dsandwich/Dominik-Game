import React from "react";
import { PlayerTile } from "./generateMap";
import { Card, CardContent, Typography } from "@material-ui/core";

const FullMapCard = ({ map }) => {
  let mapList = map.map.length ? map.map.slice() : [];
  mapList[map.playerLoc] = new PlayerTile(map.playerLoc);
  let tiles = [];
  for (const tile of mapList) {
    tiles.push(
      <Typography variant="caption" style={style.typography} key={tile.loc}>
        {tile.display}
        {tile.loc % map.size === map.size - 1 ? <br /> : " "}
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
    position: "absolute",
    left: "25%",
    top: "15%",
    height: "70%",
    width: "50%",
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
