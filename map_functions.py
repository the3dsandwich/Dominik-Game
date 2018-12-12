MAP_SIZE = 60
FIELD = 'X'
MONSTER = 'M'
ITEM = 'I'
PATH = ' '
CHOICES = [FIELD, MONSTER, ITEM, PATH]


def count_nei(i, g_map, ty):
    # return the number of side neighbors (4 directions) that are type ty
    return len(list(filter(lambda x: is_nei(x, i, False) and g_map[x] == ty, [i-MAP_SIZE-1, i-MAP_SIZE, i-MAP_SIZE+1, i-1, i+1, i+MAP_SIZE-1, i+MAP_SIZE, i+MAP_SIZE+1])))


def set_nei(i, g_map):
    # sets all neighbors of i to PATH
    for j in filter(lambda x: is_nei(x, i), [i-MAP_SIZE-1, i-MAP_SIZE, i-MAP_SIZE+1, i-1, i+1, i+MAP_SIZE-1, i+MAP_SIZE, i+MAP_SIZE+1]):
        g_map[j] = PATH


def is_nei(a, b, alldir=True):
    # True if is neighbor, False if out of bounds
    if 0 <= a < MAP_SIZE**2 and 0 <= b < MAP_SIZE**2:
        if abs(a-b) == 1:
            return a//MAP_SIZE == b//MAP_SIZE
        if abs(a-b) == MAP_SIZE:
            return True
        if (abs(a-b) == MAP_SIZE-1 or abs(a-b) == MAP_SIZE+1) and alldir:
            return a//MAP_SIZE != b//MAP_SIZE
    return False


def map_correct(m):
    # True if map is correct
    return len([i for i in m if i == PATH]) > MAP_SIZE**2/3


def print_map(pm):
    for i in range(MAP_SIZE):
        print(
            "".join([c+" " for c in pm[i*MAP_SIZE: (i+1)*MAP_SIZE]]))
