import { attack } from "./attackClass";

class unit {
  constructor(name) {
    this.name = name ? name : "Unit";
    this.HP = this.MHP = 10;
    this.MP = this.MMP = 10;
    this.items = [];
    this.attacks = [
      new attack({
        name: "punch",
        mpUsage: 0,
        basePower: 3,
        description: "a basic attack"
      })
    ];
  }

  setHP = newHP => {
    if (newHP < this.MHP && newHP >= 0) this.HP = newHP;
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

  dealDamage = i => {
    if (this.attacks[i] instanceof attack) {
      if (this.attacks[i].mpUsage <= this.MP) {
        this.setMP(this.MP - this.attacks[i].mpUsage);
        return this.attacks[i].calcDamage();
      }
    }
  };
}

class player extends unit {
  constructor(name) {
    name = name ? name : "Player";
    super(name);
    this.MHP = this.HP = 30;
    this.MMP = this.MP = 30;
    this.monsterDefeated = 0;
    this.attacks.push(
      new attack({
        name: "kick",
        mpUsage: 0,
        basePower: 5,
        description: "a normal kick"
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
