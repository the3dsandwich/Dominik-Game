from map_generator import generate_map
from map_functions import MAP_SIZE, LADDER, MONSTER, ITEM, print_map


class Map():
    def __init__(self, seed, size=MAP_SIZE):
        self.map = generate_map(seed, size)
        self.seed = seed
        self.size = size
        self.start_location = self.map.index(LADDER)
        self.monsters = self.map.count(MONSTER)
        self.items = self.map.count(ITEM)

    def print_map(self):
        print_map(self)
        print(f"SEED    : {self.seed}")
        print(f"SIZE    : {self.size}")
        print(
            f"STARTLOC: ({self.start_location % self.size + 1},{self.start_location // self.size + 1})")
        print(f"MONSTERS: {self.monsters}")
        print(f"ITEMS   : {self.items}")
