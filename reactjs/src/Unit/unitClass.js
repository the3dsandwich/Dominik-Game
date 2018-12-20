import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  LinearProgress
} from "@material-ui/core";
import { damagingMove, statusMove, attackMove, healMove } from "./attackClass";

class unit {
  constructor(name) {
    this.name = name ? name : "Unit";
    this.HP = this.MHP = 10;
    this.MP = this.MMP = 10;
    this.items = [];
    this.attacks = [
      new attackMove({
        name: "punch",
        mpUsage: 0,
        basePower: 3,
        description: "a basic attack"
      })
    ];
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

class player extends unit {
  constructor(name) {
    name = name ? name : "Player";
    super(name);
    this.MHP = this.HP = 30;
    this.MMP = this.MP = 30;
    this.monsterDefeated = 0;
    this.attacks.push(
      new attackMove({
        name: "kick",
        mpUsage: 0,
        basePower: 5,
        description: "a normal kick"
      })
    );
    this.attacks.push(
      new healMove({
        name: "heal",
        mpUsage: 10,
        baseHeal: 10,
        description: "basic heal"
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

class monster extends unit {
  constructor(name) {
    name = name ? name : "Monster";
    super(name);
  }
}

class goblin extends monster {
  constructor(name) {
    name = name ? name : "Goblin";
    super(name);
  }
}

export { player, monster, goblin, unit };
