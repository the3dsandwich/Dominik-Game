import React, { Component } from "react";
import {
  Grid,
  Modal,
  Card,
  Button,
  CardContent,
  CardActions
} from "@material-ui/core";
import { PathTile } from "../Map/generateMap";

class SingleBattleState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: this.props.player,
      opponent: this.props.opponent,
      end: ""
    };
  }

  attack = (dealing, dealt, attackID) => {
    dealt.setHP(dealt.getHP() - dealing.useMove(attackID));
  };

  doAttack = attackid => {
    if (this.state.player.attacks[attackid]) {
      let opponent = this.state.opponent;
      let player = this.state.player;
      this.attack(player, opponent, attackid);
      this.attack(opponent, player, 0);
      this.setState({ opponent, player });
      if (player.getHP() <= 0 || opponent.getHP() <= 0) {
        this.setState({ end: player.getHP() > 0 ? "Win! (e)" : "Lose! (e)" });
      }
    }
  };

  close = () => {
    this.state.player.setMD();
    this.props.closeBattle();
    this.props.updatePlayer(this.state.player);
    this.props.updateMap(
      this.props.map.playerLoc,
      new PathTile(this.props.map.playerLoc)
    );
  };

  handleKey = e => {
    switch (e.keyCode) {
      case 65:
        this.doAttack(0);
        break;
      case 83:
        this.doAttack(1);
        break;
      case 68:
        this.doAttack(2);
        break;
      case 70:
        this.doAttack(3);
        break;
      case 13:
      case 69:
        if (this.state.end !== "") this.close();
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <Modal open={this.props.open} onClose={this.props.closeBattle}>
        <Grid
          container
          justify="center"
          style={{ height: "100%" }}
          tabIndex="1"
          onKeyDown={this.handleKey}
        >
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
                <CardContent>
                  <Grid container spacing={16}>
                    <Grid item xs={12} md={6}>
                      {this.state.player.StatusCard()}
                    </Grid>
                    <Grid item xs={12} md={6}>
                      {this.state.opponent.StatusCard()}
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Grid container justify="center" spacing={16}>
                    {this.state.player.attacks.map((attack, id) => (
                      <Grid item xs={12} md={6} key={id}>
                        <Button
                          fullWidth
                          disabled={this.state.end ? true : false}
                          onClick={() => this.doAttack(id)}
                        >
                          {attack.name}
                          {id < 4
                            ? " (" + ["a", "s", "d", "f"][id] + ")"
                            : null}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </CardActions>
                {this.state.end ? (
                  <CardActions>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={this.close}
                    >
                      {this.state.end}
                    </Button>
                  </CardActions>
                ) : null}
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
