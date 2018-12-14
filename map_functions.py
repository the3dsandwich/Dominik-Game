from Unit import Unit

MAP_SIZE = 60
FIELD = {'display': 'X '}
MONSTER = {'display': 'M ', 'unit': Unit("Monster")}
ITEM = {'display': 'I '}
PATH = {'display': '  '}
LADDER = {'display': 'L '}
PLAYER = {'display': 'P '}
CHOICES = [FIELD, MONSTER, ITEM, PATH]
DIRECTIONS = {'UP': ['0', 'u', 'up'], 'RIGHT': ['1', 'r', 'right'], 'DOWN': [
    '2', 'd', 'down'], 'LEFT': ['3', 'l', 'left']}


def count_nei(i, g_map, ty, size=MAP_SIZE):
    # return the number of side neighbors (4 directions) that are type ty
    return len(list(filter(lambda x: is_nei(x, i, False, size=size) and g_map[x] == ty, [i-size-1, i-size, i-size+1, i-1, i+1, i+size-1, i+size, i+size+1])))


def set_nei(i, g_map, size=MAP_SIZE):
    # sets all neighbors of i to PATH
    for j in filter(lambda x: is_nei(x, i, size=size), [i-size-1, i-size, i-size+1, i-1, i+1, i+size-1, i+size, i+size+1]):
        g_map[j] = PATH


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
        print("".join([c['display']
                       for c in pm.map[i*pm.size: (i+1)*pm.size]]))


def print_location(pm, loc):
    # prints what player can see at given location
    print("O "*(pm.p_size+2))
    for i in range(pm.p_size):
        if i == pm.p_size//2:
            p = pm.map[loc - pm.p_size // 2 + pm.size *
                       (i - pm.p_size // 2): loc + pm.p_size // 2 + pm.size * (i - pm.p_size // 2)+1]
            p[i] = PLAYER
            print("O " + "".join([c['display'] for c in p]) + "O")
        else:
            print("O " +
                  "".join([c['display'] for c in pm.map[loc - pm.p_size // 2 + pm.size * (i - pm.p_size // 2): loc + pm.p_size // 2 + pm.size * (i - pm.p_size // 2)+1]]) +
                  "O")
    print("O "*(pm.p_size+2))
