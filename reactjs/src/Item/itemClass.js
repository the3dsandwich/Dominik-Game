import React from "react";
import { CardContent, Typography, Button, Grid } from "@material-ui/core";

class Item {
  constructor({ name, description }) {
    this.name = name ? name : "Item";
    this.description = description ? description : "Description";
  }

  use(owner, index) {
    owner.items.splice(index, 1);
  }

  ItemCardContent = (useItem, id) => (
    <CardContent>
      <Grid container>
        <Grid item xs={6} md={8}>
          <Typography variant="title" color="primary">
            {this.name}
          </Typography>
          <Typography variant="caption">{this.description}</Typography>
        </Grid>
        <Grid item xs={6} md={4}>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={() => useItem(id)}
          >
            use
          </Button>
        </Grid>
      </Grid>
    </CardContent>
  );
}

class HealItem extends Item {
  constructor({ name, hpHeal, mpHeal, description }) {
    super({ name, description });
    this.hpHeal = hpHeal ? hpHeal : 0;
    this.mpHeal = mpHeal ? mpHeal : 0;
  }

  use(owner, index) {
    owner.heal(this.hpHeal, this.mpHeal);
    super.use(owner, index);
  }

  HealItemCard = () => {};
}

export { Item, HealItem };
