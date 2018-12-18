from StateStack import Stack, MapState, BattleState, ItemState, MapViewState, PlayerViewState, StartViewState, InfoState
from Unit import Player
from Map import Map
from map_functions import PathTile, MonsterTile, ItemTile, LadderTile
import os

# initialize player and map
SVS = StartViewState()

# initialize game State Stack
GameState = Stack()
# top is map state
GameState.push(SVS)

while GameState:
    os.system('clear')

    if type(GameState.top()) == StartViewState:
        name = GameState.top().player_nane
        game_map = Map(1, size=10)
        player = Player(game_map.player_location, name=name)
        GameState.push(MapState(player, game_map))
        GameState.push(InfoState(player))

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
        # transition to ItemState if 'map' command
        if result == "item":
            GameState.push(ItemState(player, game_map))
        # transition to InfoState if 'help' command
        if result == "help":
            GameState.push(InfoState(player))
        # transition to battle if monster encounter
        if type(result) == MonsterTile:
            GameState.push(BattleState(player, result.monster, game_map))
        # transition to item if item command
        if type(result) == ItemTile:
            GameState.push(ItemState(player, result.item))
        # new map if defeated all monsters and returned to ladder
        if type(result) == LadderTile and GameState.top().m.monsters == 0:
            game_map = Map()
            MS = MapState(player, game_map)
            GameState.pop()
            GameState.push(MS)

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
        # transition to ItemState if 'map' command
        if result == "item":
            GameState.push(ItemState(player, game_map))
        # you lost, exit
        if result == "lost":
            break
        # you won, state transition back to map
        if result == "won":
            GameState.pop()

    elif type(GameState.top()) == InfoState:
        GameState.top().prompt_move()
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
