from Map import Map
from Battle import SingleBattle
from map_functions import MonsterTile


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
            elif type(self.map[self.player_location]) == MonsterTile:
                print("Monster Encounter")
                return self.map[self.player_location]


class BattleState(SingleBattle):
    def prompt_move(self):
        while True:
            self.print_status()
            command = input("Your next move: ")
            if command in ["exit", "e"]:
                return False
            if command in ["attack", "a"]:
                self.make_move(None, 1)
                self.make_move(None, 2)
                if self.unit1.getHP() == 0:
                    # You lost
                    self.print_status()
                    return False
                if self.unit2.getHP() == 0:
                    # You won
                    self.print_status()
                    return True
