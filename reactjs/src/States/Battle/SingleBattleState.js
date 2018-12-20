import React, { Component } from "react";
import { Grid, Typography, Modal, Card, Button } from "@material-ui/core";
import { unit as unitClass } from "../../Unit/unitClass";
import { PathTile } from "../Map/generateMap";

const status = unit =>
  unit instanceof unitClass ? (
    <Grid item xs={12} md={6}>
      <Card>
        <Grid container>
          <Grid item xs={8}>
            <Typography variant="h4" color="default">
              {unit.name}
            </Typography>
          </Grid>
          <Grid item container xs={4} direction="column">
            <Typography variant="body1" color="default">
              {unit.HP} / {unit.MHP}
            </Typography>
            <Typography variant="body1" color="default">
              {unit.MP} / {unit.MMP}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  ) : null;

class SingleBattleState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: this.props.player,
      opponent: this.props.opponent
    };
  }

  attack = (dealing, dealt, attackID) => {
    dealt.setHP(dealt.getHP() - dealing.dealDamage(attackID));
  };

  attackClick = attackid => {
    let opponent = this.state.opponent;
    let player = this.state.player;
    this.attack(player, opponent, attackid);
    this.attack(opponent, player, 0);
    this.setState({ opponent, player });
    if (player.getHP() <= 0 || opponent.getHP() <= 0) {
      this.props.updateMap(
        this.props.map.playerLoc,
        new PathTile(this.props.map.playerLoc)
      );
      this.props.closeBattle();
    }
  };

  render() {
    return (
      <Modal open={this.props.open} onClose={this.props.closeBattle}>
        <Grid container justify="center" style={{ height: "100%" }}>
          <Grid
            item
            container
            xs={12}
            md={6}
            direction="column"
            justify="center"
            style={{ padding: "2em" }}
          >
            <Grid item>
              <Card style={style.card}>
                <Grid container justify="center" spacing={16}>
                  {status(this.state.player)}
                  {status(this.state.opponent)}
                  {this.state.player.attacks.map((attack, id) => (
                    <Grid item xs={12} md={6} key={attack.name}>
                      <Button fullWidth onClick={() => this.attackClick(id)}>
                        {attack.name}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    );
  }
}
const style = {
  card: {
    padding: "2em",
    textAlign: "center",
    overflowX: "scroll",
    overflowY: "scroll"
  }
};
export default SingleBattleState;
