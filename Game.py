from StateStack import Stack, MapState, BattleState, ItemState
from Unit import Player
from map_functions import PathTile, MonsterTile, ItemTile
import os

# initialize player and map
player = Player("P1")
MS = MapState(3, player)

# initialize game State Stack
GameState = Stack()
# top is map state
GameState.push(MS)

while GameState:
    os.system('clear')

    if type(GameState.top()) == MapState:
        # returns the class of event (either item or monster)
        event_tile = GameState.top().prompt_move()
        # move player to current location on map
        player.setLocation(GameState.top().getLocation())
        # exit by breaking
        if event_tile == None:
            break
        # transition to battle if monster encounter
        if type(event_tile) == MonsterTile:
            GameState.push(BattleState(player, event_tile.monster))
        # transition to item if item tile
        if type(event_tile) == ItemTile:
            GameState.push(ItemState())

    elif type(GameState.top()) == BattleState:
        # returns battle result (won or not)
        Won = GameState.top().prompt_move()
        # you lost, exit
        if Won == False:
            break
        # you won, state transition back to map
        else:
            GameState.pop()
            # delete current monster
            GameState.top().map[player.getLocation()] = PathTile()
            GameState.top().monsters -= 1

    elif type(GameState.top()) == ItemState:
        input("Healed!")
        player.print_status()
        player.setHP(player.getHP() + 30)
        GameState.pop()
        # delete current item
        GameState.top().map[player.getLocation()] = PathTile()
        GameState.top().items -= 1

    else:
        break
