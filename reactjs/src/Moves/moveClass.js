class move {
  constructor({ name, mpUsage, description }) {
    this.name = name;
    this.mpUsage = mpUsage;
    this.description = description;
  }

  execute(unit) {
    unit.takeDamage(0, this.mpUsage);
  }
}

class damagingMove extends move {
  execute(unit) {
    super.execute(unit);
  }
}

class attackMove extends damagingMove {
  constructor({ name, mpUsage, basePower, description }) {
    super({ name, mpUsage, description });
    this.basePower = basePower;
  }

  execute(unit) {
    super.execute(unit);
    return Math.floor((this.basePower * (85 + Math.random() * 30)) / 100);
  }
}

class statusMove extends move {
  execute(unit) {
    super.execute(unit);
  }
}

class healMove extends statusMove {
  constructor({ name, mpUsage, baseHeal, description }) {
    super({ name, mpUsage, description });
    this.baseHeal = baseHeal;
  }

  execute(unit) {
    super.execute(unit);
    unit.heal(Math.floor((this.baseHeal * (85 + Math.random() * 30)) / 100), 0);
    return 0;
  }
}

export { move, damagingMove, attackMove, statusMove, healMove };
