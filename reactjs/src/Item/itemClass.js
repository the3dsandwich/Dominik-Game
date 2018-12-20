class Item {
  constructor({ name, description }) {
    this.name = name;
    this.description = description;
  }
}

class HealItem extends Item {
  constructor({ name, hpHeal, mpHeal, description }) {
    super({ name, description });
    this.hpHeal = hpHeal ? hpHeal : 0;
    this.mpHeal = mpHeal ? mpHeal : 0;
  }

  use = player => {
    player.setHP(player.getHP() + this.hpHeal);
    player.setMP(player.getMP() + this.mpHeal);
  };
}

export { Item, HealItem };
