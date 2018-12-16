from Map import Map
from Battle import SingleBattle
from map_functions import MonsterTile, ItemTile, PathTile
import os
import time


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


class State():
    def __init__(self, Player, Map):
        self.p = Player
        self.m = Map

    def print_status(self):
        pass

    def prompt_move(self):
        while True:
            self.print_status()
            command = input("Your next move: ")
            command = command.lower()
            os.system('clear')
            if command in ["map", "m"]:
                # transition to MapViewState
                return "map"
            elif command in ['player', "p"]:
                # transition to PlayerViewState
                return "player"
            elif command in ["exit", "e"]:
                # exit
                return "exit"
            else:
                result = self.do_action(command)
                if result != None:
                    return result

    def do_action(self, command=None):
        pass


class MapState(State, Map):
    def __init__(self, p, m, seed=time.time()):
        State.__init__(self, p, m)
        Map.__init__(self, seed)

    def print_status(self):
        self.m.print_location(self.m.player_location)

    def do_action(self, command):
        if not self.m.move(command):
            # not valid direction command
            print("Wrong command")
        if type(self.m.map[self.m.player_location]) == MonsterTile:
            # return monster tile
            return self.m.map[self.m.player_location]
        elif type(self.m.map[self.m.player_location]) == ItemTile:
            # add item to player.items and delete current item from map
            self.p.items.append(self.m.map[self.m.player_location].item)
            # print(f"Got {self.map[self.player_location].item.name)}")
        return None


class BattleState(State, SingleBattle):
    def __init__(self, unit1, unit2, m):
        State.__init__(self, unit1, m)
        SingleBattle.__init__(self, unit1, unit2)

    def prompt_move(self):
        # continue to prompt move until win or lose
        input("Battle!")
        os.system('clear')
        return State.prompt_move(self)

    def print_status(self):
        self.print_health()

    def do_action(self, command):
        if command in ["attack", "a", ""]:
            # normal attack
            # unit one moves with None move
            self.make_move(None, 1)
            # unit two moves with None move
            self.make_move(None, 2)
            if self.unit1.getHP() == 0:
                # You lost
                self.print_status()
                print("You fainted")
                return "lost"
            if self.unit2.getHP() == 0:
                # You won
                print("You won!")
                self.unit1.print_status()
                input("(confirm)")
                os.system('clear')
                self.m.map[self.m.player_location] = PathTile()
                self.m.monsters -= 1
                return "won"
        else:
            print("Wrong command")
        return None


class ItemState(State):
    def __init__(self, player, item):
        self.player = player
        self.item = item

    def prompt_move(self):
        self.player.print_full()
        input("use item?")


class MapViewState(State):
    def __init__(self, m):
        State.__init__(self, None, m)

    def prompt_move(self):
        # prints full map and exits
        self.m.print_map()
        input('(Confirm)')
        return None


class PlayerViewState(State):
    def __init__(self, p):
        State.__init__(self, p, None)

    def prompt_move(self):
        # prints full map and exits
        self.p.print_full()
        input('(Confirm)')
        return None
