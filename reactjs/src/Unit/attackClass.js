class attack {
  constructor({ name, mpUsage, basePower, description }) {
    this.name = name;
    this.mpUsage = mpUsage;
    this.basePower = basePower;
    this.description = description;
  }

  calcDamage = () => {
    return Math.floor((this.basePower * (85 + Math.random() * 15)) / 100);
  };
}

export { attack };
