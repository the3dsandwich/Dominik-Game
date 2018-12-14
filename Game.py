from StateStack import Stack, MapState, BattleState
from Unit import Player
from map_functions import PathTile
from Unit import Monster

# initialize map and player
MS = MapState(3)
player = Player("P1")

# initialize game State Stack
GameState = Stack()
# top is map state
GameState.push(MS)

while GameState:
    if type(GameState.top()) == MapState:
        # returns the class of event (either item or monster)
        event_tile = GameState.top().prompt_move()
        # move player to current location on map
        player.setLocation(GameState.top().getLocation())
        # exit by breaking
        if event_tile == None:
            break
        # transition to battle if monster encounter
        if type(event_tile) == Monster:
            GameState.push(BattleState(player, event_tile.monster))

    elif type(GameState.top()) == BattleState:
        # returns battle result (won or not)
        Won = GameState.top().prompt_move()
        # print current player status
        player.print_status()
        # you lost, exit
        if Won == False:
            print("You Fainted")
            break
        # you won, state transition back to map
        else:
            GameState.pop()
            # delete current monster
            GameState.top().map[player.getLocation()] = PathTile()

    else:
        break
