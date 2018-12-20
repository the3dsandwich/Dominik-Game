import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  LinearProgress
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
    if (newMP < this.MMP && newMP >= 0) this.MP = newMP;
  };

  getMP = () => {
    return this.MP;
  };

  useMove = i => {
    if (this.attacks[i] instanceof damagingMove) {
      return this.dealDamage(i);
    }
    if (this.attacks[i] instanceof statusMove) {
      if (this.attacks[i] instanceof healMove) this.heal(i);
      return 0;
    }
  };

  heal = i => {
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

  StatusCard = () => (
    <Card>
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
    </Card>
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
  }

  setMD = () => this.monsterDefeated++;

  getMD = () => {
    return this.monsterDefeated;
  };

  getScore = () => {
    return this.monsterDefeated * 100 + this.items.length * 10;
  };

  getItem = item => {
    if (item instanceof Item) this.items.push(item);
  };

  useItem = i => {
    if (i < this.items.length) {
      this.items[i].use(this);
      this.items.splice(i, 1);
    }
  };

  FullPlayerCard = closeFunc => (
    <Card>
      {this.StatusCard()}
      <CardContent>
        <Typography variant="body1">
          Monsters Defeated: {this.getMD()}
        </Typography>
        <Typography variant="body1">Score: {this.getScore()}</Typography>
      </CardContent>

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
