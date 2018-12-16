from Map import Map
from Battle import SingleBattle
from map_functions import MonsterTile, ItemTile
import os


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
        while True:
            self.print_location(self.player_location)
            command = input("Your next move: ")
            os.system('clear')
            if command == "map":
                # display full map
                self.print_map()
                continue
            elif command in ["exit", "e"]:
                # exit
                return None
            elif not self.move(command):
                # not valid direction command
                print("Wrong command")
            elif type(self.map[self.player_location]) == MonsterTile:
                # return current tile
                return self.map[self.player_location]
            elif type(self.map[self.player_location]) == ItemTile:
                # return current tile
                return self.map[self.player_location]


class BattleState(SingleBattle):
    def prompt_move(self):
        input("Enter Battle!")
        while True:
            self.print_status()
            command = input("Your next move: ")
            os.system('clear')
            if command in ["exit", "e"]:
                # You escaped
                return False
            elif command in ["attack", "a", ""]:
                self.make_move(None, 1)
                self.make_move(None, 2)
                if self.unit1.getHP() == 0:
                    # You lost
                    self.print_status()
                    print("You fainted")
                    return False
                if self.unit2.getHP() == 0:
                    # You won
                    print("You won!")
                    self.unit1.print_status()
                    input("(confirm)")
                    os.system('clear')
                    return True
            else:
                print("Wrong command")


class ItemState():
    def __init__(self):
        print("yay")
    pass
