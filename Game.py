from StateStack import Stack, MapState, BattleState, ItemState, MapViewState, PlayerViewState
from Unit import Player
from Map import Map
from map_functions import PathTile, MonsterTile, ItemTile
import os

# initialize player and map
player = Player("P1")
game_map = Map(3)
MS = MapState(player, game_map)

# initialize game State Stack
GameState = Stack()
# top is map state
GameState.push(MS)

while GameState:
    os.system('clear')

    if type(GameState.top()) == MapState:
        # returns the class of event (either item or monster)
        result = GameState.top().prompt_move()
        # exit by breaking
        if result == "exit":
            break
        # transition to PlayerViewState if 'player' command
        if result == "player":
            GameState.push(PlayerViewState(player))
        # transition to MapViewState if 'map' command
        if result == "map":
            GameState.push(MapViewState(game_map))
        # transition to battle if monster encounter
        if type(result) == MonsterTile:
            GameState.push(BattleState(player, result.monster, game_map))
        # transition to item if item command
        if type(result) == ItemTile:
            GameState.push(ItemState(player, result.item))

    elif type(GameState.top()) == BattleState:
        # returns battle result (won or not)
        result = GameState.top().prompt_move()
        # exit by breaking
        if result == "exit":
            break
        # transition to PlayerViewState if 'player' command
        if result == "player":
            GameState.push(PlayerViewState(player))
        # transition to MapViewState if 'map' command
        if result == "map":
            GameState.push(MapViewState(game_map))
        # you lost, exit
        if result == "lost":
            break
        # you won, state transition back to map
        if result == "won":
            GameState.pop()

    elif type(GameState.top()) == ItemState:
        GameState.top().prompt_move()
        GameState.pop()

    elif type(GameState.top()) == MapViewState:
        GameState.top().prompt_move()
        GameState.pop()

    elif type(GameState.top()) == PlayerViewState:
        GameState.top().prompt_move()
        GameState.pop()

    else:
        break
