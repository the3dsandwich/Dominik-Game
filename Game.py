from StateStack import Stack, MapState, BattleState
from Unit import Unit

player = Unit("P1")

MS = MapState(3)

GameState = Stack()

GameState.push(MS)

while GameState:
    if type(GameState.top()) == MapState:
        Monster = GameState.top().prompt_move()
        if Monster == None:
            break
        GameState.push(BattleState(player, Monster['unit']))

    elif type(GameState.top()) == BattleState:
        GameState.top().prompt_move()
        GameState.pop()

    else:
        break
