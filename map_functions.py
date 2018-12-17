from Unit import Monster
from Item import HealItem

MAP_SIZE = 30
DIRECTIONS = {'UP': ['0', 'w', 'up'], 'RIGHT': ['1', 'd', 'right'], 'DOWN': [
    '2', 's', 'down'], 'LEFT': ['3', 'a', 'left']}


class Tile():
    def __init__(self):
        self.display = 'E '


class FieldTile(Tile):
    def __init__(self):
        self.display = 'X '


class PathTile(Tile):
    def __init__(self):
        self.display = '  '


class LadderTile(Tile):
    def __init__(self):
        self.display = 'L '


class PlayerTile(Tile):
    def __init__(self):
        self.display = 'P '


class ItemTile(Tile):
    def __init__(self):
        self.display = 'I '
        self.item = HealItem()


class MonsterTile(Tile):
    def __init__(self):
        self.display = 'M '
        self.monster = Monster()


def choices():
    return [FieldTile(), ItemTile(), MonsterTile(), PathTile()]


def count_nei(i, g_map, ty, size=MAP_SIZE):
    # return the number of side neighbors (4 directions) that are type ty
    return len(list(filter(lambda x: is_nei(x, i, False, size=size) and type(g_map[x]) == ty, [i-size-1, i-size, i-size+1, i-1, i+1, i+size-1, i+size, i+size+1])))


def set_nei(i, g_map, size=MAP_SIZE):
    # sets all neighbors of i to PATH
    for j in filter(lambda x: is_nei(x, i, size=size), [i-size-1, i-size, i-size+1, i-1, i+1, i+size-1, i+size, i+size+1]):
        g_map[j] = PathTile()


def is_nei(a, b, alldir=True, size=MAP_SIZE):
    # True if is neighbor, False if out of bounds
    if 0 <= a < size**2 and 0 <= b < size**2:
        if abs(a-b) == 1:
            return a//size == b//size
        if abs(a-b) == size:
            return True
        if (abs(a-b) == size-1 or abs(a-b) == size+1) and alldir:
            return a//size != b//size
    return False


def print_map(pm):
    # prints map
    for i in range(pm.size):
        print("".join([c.display
                       for c in pm.map[i*pm.size: (i+1)*pm.size]]))


def print_location(pm, loc):
    # prints what player can see at given location
    print("O "*(pm.p_size+2))
    for i in range(pm.p_size):
        p = []
        for j in range(loc - pm.p_size // 2 + pm.size * (i - pm.p_size // 2),
                       loc + pm.p_size // 2 + pm.size * (i - pm.p_size // 2) + 1):
            if 0 <= j < pm.size**2 and 0 <= j-(loc//pm.size - pm.p_size//2 + i)*pm.size < pm.size:
                p.append(pm.map[j])
            else:
                p.append(FieldTile())
        if i == pm.p_size//2:
            p[i] = PlayerTile()
        print("O " + "".join([c.display for c in p]) + "O")
    print("O "*(pm.p_size+2))
