import React from "react";
import { PlayerTile } from "./generateMap";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions
} from "@material-ui/core";

const FullMapCard = ({ map, onClose }) => {
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
    <Card>
      <CardContent style={style.card}>{tiles.map(tile => tile)}</CardContent>
      <CardActions>
        <Button fullWidth onClick={onClose} color="primary" variant="contained">
          Close
        </Button>
      </CardActions>
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
