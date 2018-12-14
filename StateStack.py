from Map import Map
from map_functions import MONSTER


class Stack:
    def __init__(self):
        self.items = []

    def isEmpty(self):
        return self.items == []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        return self.items.pop()

    def top(self):
        return self.items[len(self.items)-1]

    def size(self):
        return len(self.items)


class MapState(Map):
    def prompt_move(self):
        # continue prompt move and call self.move() until input invalid
        self.print_location(self.player_location)
        while True:
            command = input("Your next move: ")
            if command == "map":
                self.print_map()
                continue
            if command in ["exit", "e"]:
                return None
            if not self.move(command):
                print("Wrong command")
            elif self.map[self.player_location] == MONSTER:
                print("Monster Encounter")
                return self.map[self.player_location]


class BattleState():
    def __init__(self, a):
        pass
    pass
