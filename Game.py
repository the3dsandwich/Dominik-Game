from StateStack import *

MS = MapState(10)

GameState = Stack()

GameState.push(MS)

while GameState:
    if type(GameState.top()) == MapState:
        Monster = GameState.top().prompt_move()
        GameState.push(BattleState())
    else:
        print(GameState)
        break
