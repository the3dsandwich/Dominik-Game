import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  LinearProgress,
  Grid
} from "@material-ui/core";
import { attackMove, healMove, move } from "../Moves/moveClass";
import { Item, HealItem } from "../Item/itemClass";
import moves from "../Moves/moves.json";

// UNIT UNIT UNIT UNIT UNIT UNIT UNIT UNIT UNIT UNIT UNIT UNIT
class unit {
  constructor(name) {
    this.name = name ? name : "Unit";
    this.HP = this.MHP = 10;
    this.MP = this.MMP = 10;
    this.items = [];
    this.attacks = [new attackMove(moves.move.damagingMove.attackMove[0])];
  }

  heal = (hpHeal, mpHeal) => {
    this.HP = this.HP + hpHeal > this.MHP ? this.MHP : this.HP + hpHeal;
    this.MP = this.MP + mpHeal > this.MMP ? this.MMP : this.MP + mpHeal;
  };

  takeDamage = (hpDmg, mpDmg) => {
    this.HP = this.HP - hpDmg < 0 ? 0 : this.HP - hpDmg;
    this.MP = this.MP - mpDmg < 0 ? 0 : this.MP - mpDmg;
  };

  makeMove = (operation, operationIndex) => {
    if (operation instanceof Item) {
      operation.use(this, operationIndex);
    }
    if (operation instanceof move) {
      return operation.execute(this);
    }
    return this;
  };

  StatusCardContent = () => (
    <CardContent>
      <Typography variant="h4" color="primary">
        {this.name}
      </Typography>

      <Typography variant="body1" align="right">
        HP: {this.HP} / {this.MHP}
      </Typography>
      <LinearProgress
        variant="determinate"
        color="primary"
        value={(100 * this.HP) / this.MHP}
      />

      <Typography variant="body1" align="right">
        MP: {this.MP} / {this.MMP}
      </Typography>
      <LinearProgress
        variant="determinate"
        color="secondary"
        value={(100 * this.MP) / this.MMP}
      />
    </CardContent>
  );
}

// MONSTER MONSTER MONSTER MONSTER MONSTER MONSTER MONSTER MONSTER
class monster extends unit {
  constructor(name) {
    name = name ? name : "Monster";
    super(name);
  }
}

// PLAYER PLAYER PLAYER PLAYER PLAYER PLAYER PLAYER PLAYER PLAYER
class player extends unit {
  constructor(name) {
    name = name ? name : "Player";
    super(name);
    this.MHP = this.HP = 30;
    this.MMP = this.MP = 30;
    this.monsterDefeated = 0;
    this.attacks.push(new attackMove(moves.move.damagingMove.attackMove[1]));
    this.attacks.push(new attackMove(moves.move.damagingMove.attackMove[2]));
    this.attacks.push(new attackMove(moves.move.damagingMove.attackMove[3]));
    this.attacks.push(new attackMove(moves.move.damagingMove.attackMove[4]));
    this.attacks.push(new healMove(moves.move.statusMove.healMove[0]));
    this.items.push(
      new HealItem({
        name: "Potion",
        hpHeal: 10,
        mpHeal: 0,
        description: "A simple potion. Heals 10 HP"
      })
    );
  }

  getScore = () => this.monsterDefeated * 100 + this.items.length * 10;

  ScoreCardContent = () => (
    <CardContent>
      <Typography variant="body1">
        Monsters Defeated: {this.monsterDefeated}
      </Typography>
      <Typography variant="body1">Score: {this.getScore()}</Typography>
    </CardContent>
  );

  FullPlayerCard = (closeFunc, useItemFunc) => (
    <Card style={{ padding: "2em" }}>
      <Grid container spacing={16}>
        <Grid item container xs={12} md={6} direction="column">
          <Grid item>{this.StatusCardContent()}</Grid>
          <Grid item>{this.ScoreCardContent()}</Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          md={6}
          style={{ overflow: "scroll", maxHeight: "15em" }}
        >
          {this.items
            ? this.items.map((item, id) => (
                <Grid item xs={12} key={id}>
                  {item.ItemCardContent(useItemFunc, id)}
                </Grid>
              ))
            : null}
        </Grid>
      </Grid>
      <CardActions>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={closeFunc}
        >
          Close
        </Button>
      </CardActions>
    </Card>
  );
}

export { player, monster, unit };
