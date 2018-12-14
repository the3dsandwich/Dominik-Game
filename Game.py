from StateStack import Stack, MapState, BattleState
from Unit import Player
from map_functions import PATH

# initialize map and player
MS = MapState(3)
player = Player("P1", MS.start_location)

# initialize game State Stack
GameState = Stack()
# top is map state
GameState.push(MS)

while GameState:
    if type(GameState.top()) == MapState:
        # prompy_move() returns monster
        Monster = GameState.top().prompt_move()
        # exit by breaking
        if Monster == None:
            break
        # move player to location on map
        player.setLocation(GameState.top().getLocation())
        # state transition to battle with monster
        GameState.push(BattleState(player, Monster['unit']))

    elif type(GameState.top()) == BattleState:
        # gets battle result (won or not)
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
            GameState.top().map[player.getLocation()] = PATH

    else:
        break
