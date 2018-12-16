from map_generator import generate_map
from map_functions import MAP_SIZE, DIRECTIONS, LadderTile, MonsterTile, ItemTile, FieldTile, print_map, print_location, is_nei
from time import time


class Map():
    def __init__(self, seed=time(), size=MAP_SIZE, p_size=7):
        self.map, self.block_size, self.player_location = generate_map(
            seed, size)
        self.seed = seed
        self.size = size
        self.monsters = sum(isinstance(i, MonsterTile) for i in self.map)
        self.items = sum(isinstance(i, ItemTile) for i in self.map)
        self.p_size = p_size

    def print_map(self):
        # prints whole map
        print_map(self)
        print(f"SIZE    : {self.size}")
        print(f"MONSTERS: {self.monsters}")
        print(f"ITEMS   : {self.items}")

    def print_location(self, loc):
        # prints what player can see in current location and other info
        print_location(self, loc)

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
        if direction in DIRECTIONS['UP']:
            self.player_location = self.player_location - self.size if is_nei(
                self.player_location, self.player_location-self.size, False, size=self.size) and type(self.map[self.player_location-self.size]) is not FieldTile else self.player_location
        elif direction in DIRECTIONS['RIGHT']:
            self.player_location = self.player_location + \
                1 if is_nei(self.player_location, self.player_location+1,
                            False, size=self.size) and type(self.map[self.player_location+1]) is not FieldTile else self.player_location
        elif direction in DIRECTIONS['DOWN']:
            self.player_location = self.player_location + self.size if is_nei(
                self.player_location, self.player_location+self.size, False, size=self.size) and type(self.map[self.player_location+self.size]) is not FieldTile else self.player_location
        elif direction in DIRECTIONS['LEFT']:
            self.player_location = self.player_location - \
                1 if is_nei(self.player_location, self.player_location-1,
                            False, size=self.size) and type(self.map[self.player_location-1]) is not FieldTile else self.player_location
        else:
            return False
        return True

    def getLocation(self):
        return self.player_location
