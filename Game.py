from StateStack import Stack, MapState, BattleState

MS = MapState(10)

GameState = Stack()

GameState.push(MS)

while GameState:
    if type(GameState.top()) == MapState:
        Command = GameState.top().prompt_move()
        if Command == None:
            break
        GameState.push(BattleState(Command))
    else:
        print(GameState)
        break
