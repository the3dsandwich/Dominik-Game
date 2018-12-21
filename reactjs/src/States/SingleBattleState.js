import React, { Component } from "react";
import {
  Grid,
  Modal,
  Card,
  Button,
  CardContent,
  CardActions,
  Divider,
  Tooltip
} from "@material-ui/core";
import { PathTile } from "../Map/generateMap";

class SingleBattleState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: this.props.player,
      opponent: this.props.opponent,
      end: "",
      win: false
    };
  }

  makeMove = moveId => {
    if (this.state.player.attacks[moveId])
      if (this.state.player.attacks[moveId].mpUsage <= this.state.player.MP) {
        let { player, opponent } = this.state;
        const playerDmg = player.makeMove(player.attacks[moveId], moveId);
        const opponentDmg = opponent.makeMove(opponent.attacks[0], 0);
        player.takeDamage(opponentDmg, 0);
        opponent.takeDamage(playerDmg, 0);
        this.setState({ opponent, player });
        if (player.HP <= 0 || opponent.HP <= 0)
          this.setState({
            end: player.HP > 0 ? "Win! (e)" : "Lose! (e)",
            win: player.HP > 0
          });
      }
  };

  close = () => {
    let player = this.state.player;
    let map = this.props.map;
    if (this.state.win) {
      player.monsterDefeated++;
      map.map[map.playerLoc] = new PathTile(map.playerLoc);
      map.monsterCount--;
      this.props.closeBattle();
      this.props.updatePlayer(player);
      this.props.updateMap(map);
    } else {
      this.props.resetGame();
    }
  };

  handleKey = e => {
    switch (e.keyCode) {
      case 65:
        this.makeMove(0);
        break;
      case 83:
        this.makeMove(1);
        break;
      case 68:
        this.makeMove(2);
        break;
      case 70:
        this.makeMove(3);
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
      <Modal open={this.props.open}>
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
                      {this.state.player.StatusCardContent()}
                    </Grid>
                    <Grid item xs={12} md={6}>
                      {this.state.opponent.StatusCardContent()}
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <CardActions>
                  <Grid container justify="center" spacing={16}>
                    {this.state.player.attacks.map((attack, id) => (
                      <Grid item xs={12} md={6} key={id}>
                        <Tooltip
                          title={attack.titleString()}
                          placement="bottom"
                        >
                          <Button
                            fullWidth
                            disabled={
                              (this.state.end ? true : false) ||
                              attack.mpUsage > this.state.player.MP
                            }
                            onClick={() => this.makeMove(id)}
                          >
                            {attack.name}
                            {id < 4
                              ? " (" + ["a", "s", "d", "f"][id] + ")"
                              : null}
                          </Button>
                        </Tooltip>
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
