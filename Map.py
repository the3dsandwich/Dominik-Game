from map_generator import generate_map
from map_functions import MAP_SIZE, LADDER, MONSTER, ITEM, FIELD, DIRECTIONS, print_map, print_location, is_nei
from time import time


class Map():
    def __init__(self, seed=time(), size=MAP_SIZE, p_size=5):
        self.map, self.block_size = generate_map(seed, size)
        self.seed = seed
        self.size = size
        self.start_location = self.map.index(LADDER)
        self.monsters = self.map.count(MONSTER)
        self.items = self.map.count(ITEM)
        self.player_location = self.start_location
        self.p_size = p_size

    def print_map(self):
        # prints whole map
        print_map(self)
        print(f"SEED    : {self.seed}")
        print(f"SIZE    : {self.size}")
        print(f"BLK SIZE: {self.block_size}")
        print(
            f"STARTLOC: ({self.start_location % self.size + 1},{self.start_location // self.size + 1})")
        print(f"MONSTERS: {self.monsters}")
        print(f"ITEMS   : {self.items}")

    def print_location(self, loc):
        # prints what player can see in current location and other info
        print_location(self, loc)
        print(f"SEED    : {self.seed}")
        print(f"MONSTERS: {self.monsters}")
        print(f"ITEMS   : {self.items}")

    def set_p_size(self, p_size):
        # sets print_location seeing size
        self.p_size = p_size

    def move(self, direction):
        # moves according to direction and print location
        # return True if move valid
        # 0 is up
        # 1 is right
        # 2 is down
        # 3 is left
        direction = direction.lower()
        if direction in DIRECTIONS['UP']:
            self.player_location = self.player_location - self.size if is_nei(
                self.player_location, self.player_location-self.size, False, size=self.size) and self.map[self.player_location-self.size] != FIELD else self.player_location
        elif direction in DIRECTIONS['RIGHT']:
            self.player_location = self.player_location + \
                1 if is_nei(self.player_location, self.player_location+1,
                            False, size=self.size) and self.map[self.player_location+1] != FIELD else self.player_location
        elif direction in DIRECTIONS['DOWN']:
            self.player_location = self.player_location + self.size if is_nei(
                self.player_location, self.player_location+self.size, False, size=self.size) and self.map[self.player_location+self.size] != FIELD else self.player_location
        elif direction in DIRECTIONS['LEFT']:
            self.player_location = self.player_location - \
                1 if is_nei(self.player_location, self.player_location-1,
                            False, size=self.size) and self.map[self.player_location-1] != FIELD else self.player_location
        else:
            return False

        self.print_location(self.player_location)
        return True

    def getLocation(self):
        return self.player_location
