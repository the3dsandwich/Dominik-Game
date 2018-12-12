import random
from map_functions import *


def generate_map(seed):
    # Monster's neighbor will be path
    # Item's neighbor will be path
    # Path has to have one neighbor that's also path
    # Every path has to connect to edge
    # Field is everything else

    # seeds keep add up until map fulfills
    while True:
        # pass seed to random
        random.seed(seed)
        # initialize g_map with map size
        g_map = [None for _ in range(MAP_SIZE**2)]
        # randomly assign terrain choices by weight
        for i in range(MAP_SIZE**2):
            g_map[i] = random.choices(
                CHOICES, weights=[0.5, 0.01, 0.01, 0.48])[0]
        # Change Monster and Item neighbor to PATH
        for i in range(MAP_SIZE**2):
            if g_map[i] in [MONSTER, ITEM]:
                set_nei(i, g_map)
        # Shrink isolated FIELD
        for i in range(MAP_SIZE**2):
            if g_map[i] == FIELD and count_nei(i, g_map, FIELD) < 1:
                g_map[i] = PATH
        # Shrink isolated PATH
        for i in range(MAP_SIZE**2):
            if count_nei(i, g_map, PATH) < 2:
                g_map[i] = FIELD
        # Check Path connected
        # marker for visited tiles
        path_chked = [False for _ in range(MAP_SIZE**2)]
        for i in range(MAP_SIZE**2):
            # if new block of area
            if g_map[i] == PATH and not path_chked[i]:
                frontiers = [i]
                # add PATH to frontier if it's a neighbor of some tile in frontier.
                while True:
                    pre = frontiers
                    # add to frontier if is neighbor and a PATH
                    for j in frontiers:
                        path_chked[j] = True
                        frontiers.extend(filter(lambda x: is_nei(x, j, False) and (x not in pre) and (g_map[x] in [MONSTER, ITEM, PATH]), [
                            j-MAP_SIZE, j-1, j+1, j+MAP_SIZE]))
                    # exit when one pass adds nothing (finished growing the block)
                    if pre == frontiers:
                        break
                # delete blocks of size lesser than 1/3 of the map size
                if len(frontiers) < MAP_SIZE ** 2 / 3:
                    for j in frontiers:
                        g_map[j] = FIELD
        if map_correct(g_map):
            break
        else:
            seed += 1

    return g_map
