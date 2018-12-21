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
import {
  damagingMove,
  statusMove,
  attackMove,
  healMove
} from "../Moves/moveClass";
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

  setHP = newHP => {
    if (newHP > this.MHP) this.HP = this.MHP;
    else if (newHP < 0) this.HP = 0;
    else this.HP = newHP;
  };

  getHP = () => {
    return this.HP;
  };

  setMP = newMP => {
    if (newMP > this.MMP) this.MP = this.MMP;
    else if (newMP < 0) this.MP = 0;
    else this.MP = newMP;
  };

  getMP = () => {
    return this.MP;
  };

  getItem = item => {
    if (item instanceof Item) this.items.push(item);
  };

  useItem = i => {
    if (this.items[i] instanceof Item) {
      if (this.items[i] instanceof HealItem) {
        this.setHP(this.getHP() + this.items[i].hpHeal);
        this.setMP(this.getMP() + this.items[i].mpHeal);
      }
      this.items.splice(i, 1);
    }
  };

  useMove = i => {
    if (this.attacks[i] instanceof damagingMove) {
      return this.dealDamage(i);
    }
    if (this.attacks[i] instanceof statusMove) {
      if (this.attacks[i] instanceof healMove) this.healMove(i);
      return 0;
    }
  };

  healMove = i => {
    if (this.attacks[i].mpUsage <= this.MP) {
      this.setMP(this.MP - this.attacks[i].mpUsage);
      this.setHP(this.getHP() + this.attacks[i].calcHeal());
    }
  };

  dealDamage = i => {
    if (this.attacks[i].mpUsage <= this.MP) {
      this.setMP(this.MP - this.attacks[i].mpUsage);
      return this.attacks[i].calcDamage();
    }
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
    this.getItem(
      new HealItem({
        name: "Potion",
        hpHeal: 10,
        mpHeal: 0,
        description: "A simple potion. Heals 10 HP"
      })
    );
  }

  setMD = () => this.monsterDefeated++;

  getMD = () => {
    return this.monsterDefeated;
  };

  getScore = () => {
    return this.monsterDefeated * 100 + this.items.length * 10;
  };

  ScoreCardContent = () => (
    <CardContent>
      <Typography variant="body1">Monsters Defeated: {this.getMD()}</Typography>
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
