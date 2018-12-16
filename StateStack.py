from Map import Map
from Battle import SingleBattle
from map_functions import MonsterTile, ItemTile, PathTile, LadderTile
from Item import HealItem
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
            os.system("clear")
            if command in ["map", "m"]:
                # transition to MapViewState
                return "map"
            elif command in ["player", "p"]:
                # transition to PlayerViewState
                return "player"
            elif command in ["item", "i"]:
                # transition to ItemState
                return "item"
            elif command in ["exit", "e"]:
                # exit
                return "exit"
            elif command in ['help', 'h']:
                return "help"
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
        if type(self.m.map[self.m.player_location]) == LadderTile:
            # return ladder tile
            return self.m.map[self.m.player_location]
        elif type(self.m.map[self.m.player_location]) == ItemTile:
            # add item to player.items list
            self.p.items.append(self.m.map[self.m.player_location].item)
            # wait for player Confirm
            input(
                f"Got {self.m.map[self.m.player_location].item.name}")
            os.system("clear")
            # delete Item from map
            self.m.map[self.m.player_location] = PathTile()
            self.m.items -= 1
        return None


class BattleState(State, SingleBattle):
    def __init__(self, unit1, unit2, m):
        State.__init__(self, unit1, m)
        SingleBattle.__init__(self, unit1, unit2)
        input("Battle!")
        os.system("clear")

    def prompt_move(self):
        # continue to prompt move until win or lose
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
            # You lost
            if self.unit1.getHP() == 0:
                # print both status
                self.print_status()
                input("")
                os.system('clear')
                input("oops!")
                os.system('clear')
                # wait for player Confirm
                input("You fainted")
                os.system("clear")
                # return result
                return "lost"
            # You won
            if self.unit2.getHP() == 0:
                # print player status
                self.unit1.print_status()
                # wait for player Confirm
                input("You won!")
                os.system("clear")
                # delete Monster from map
                self.m.map[self.m.player_location] = PathTile()
                self.m.monsters -= 1
                # return result
                return "won"
        else:
            print("Wrong command")
        return None


class ItemState(State):
    def __init__(self, p, m):
        State.__init__(self, p, m)

    def prompt_move(self):
        if self.p.items == []:
            input("No items to use!")
        else:
            while True:
                self.p.print_status()
                self.p.print_items()
                command = input("Use which item (index)? ")
                try:
                    item_index = int(command) - 1
                    if item_index > len(self.p.items):
                        raise Exception()
                except:
                    if command in ["exit", "e", ""]:
                        # exit
                        return "exit"
                    os.system("clear")
                    input("wrong index!")
                    os.system("clear")
                    continue
                command = input(
                    f"Are you sure you want to use {self.p.items[item_index].name}? (y/n) ")
                if command in ["yes", "y", ""]:
                    item_using = self.p.items[item_index]
                    os.system("clear")
                    self.do_action(item_using)
                    return 0
                else:
                    if command in ["exit", "e"]:
                        # exit
                        return "exit"
                    os.system("clear")
                    continue

    def do_action(self, item_using):
        if type(item_using) == HealItem:
            self.p.setHP(self.p.getHP() + item_using.heal)
            self.p.items.remove(item_using)
            self.p.print_status()
            self.p.print_items()
            input("Healed!")
            os.system("clear")


class MapViewState(State):
    def __init__(self, m):
        State.__init__(self, None, m)

    def prompt_move(self):
        # prints full map and exits
        self.m.print_map()
        input("")
        return None


class PlayerViewState(State):
    def __init__(self, p):
        State.__init__(self, p, None)

    def prompt_move(self):
        # prints full map and exits
        self.p.print_full()
        input("")
        return None


class StartViewState(State):
    def __init__(self):
        title_text = [
            "=======================",
            "=                     =",
            "=       DOMINIK       =",
            "=                     =",
            "======================="
        ]
        for i in title_text:
            print(i)
        self.player_nane = input("= WHAT'S YOUR NAME =\n\n")
        os.system('clear')


class InfoState(State):
    def __init__(self, p):
        State.__init__(self, p, None)

    def prompt_move(self):
        information_text = [
            f"Welcome, {self.p.name}!",
            "In this dungeon exploring game you're required to",
            "defeat all monsters on each floor. 'M' indicates",
            "the monsters you are required to defeat, and 'I' are",
            "the items you can pick up.",
            "When you've defeated all monsters in a floor, you",
            "may return to the ladder (indicated by 'L') to go up",
            "to the next floor."
            "=====================================================",
            "things you may want to remember:",
            "up/u        goes up",
            "down/d      goes down",
            "left/l      goes left",
            "right/r     goes right",
            "player/p    brings up your character status",
            "item/i      brings up your inventory",
            "help/h      brings up this info page",
            "exit/e      exits pretty much anywhere"
        ]
        for i in information_text:
            print(i)
        input("Enjoy!")
        os.system('clear')
        return None
