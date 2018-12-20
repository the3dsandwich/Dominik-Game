class move {
  constructor({ name, mpUsage, basePower, description }) {
    this.name = name;
    this.mpUsage = mpUsage;
    this.description = description;
  }
}

class damagingMove extends move {}

class attackMove extends damagingMove {
  constructor({ name, mpUsage, basePower, description }) {
    super({ name, mpUsage, description });
    this.basePower = basePower;
  }

  calcDamage = () =>
    Math.floor((this.basePower * (85 + Math.random() * 30)) / 100);
}

class statusMove extends move {}

class healMove extends statusMove {
  constructor({ name, mpUsage, baseHeal, description }) {
    super({ name, mpUsage, description });
    this.baseHeal = baseHeal;
  }

  calcHeal = () =>
    Math.floor((this.baseHeal * (85 + Math.random() * 30)) / 100);
}

export { damagingMove, attackMove, statusMove, healMove };
