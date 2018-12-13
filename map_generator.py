import random
from map_functions import *


def generate_map(seed, size=MAP_SIZE):
    # Monster's neighbor will be path
    # Item's neighbor will be path
    # Path has to have one neighbor that's also path
    # Every path has to connect to edge
    # Field is everything else

    # pass seed to random
    random.seed(seed)
    # initialize g_map with map size
    g_map = [None for _ in range(size**2)]
    # randomly assign terrain choices by weight
    for i in range(size**2):
        g_map[i] = random.choices(
            CHOICES, weights=[0.5, 0.01, 0.01, 0.48])[0]
    # Change Monster and Item neighbor to PATH
    for i in range(size**2):
        if g_map[i] in [MONSTER, ITEM]:
            set_nei(i, g_map, size=size)
    # Shrink isolated FIELD
    for i in range(size**2):
        if g_map[i] == FIELD and count_nei(i, g_map, FIELD, size=size) < 1:
            g_map[i] = PATH
    # Shrink isolated PATH
    for i in range(size**2):
        if count_nei(i, g_map, PATH, size=size) < 2:
            g_map[i] = FIELD
    # Change border to FIELD
    for i in range(size**2):
        if i // size == 0 or i // size == size-1 or i % size == 0 or i % size == size-1:
            g_map[i] = FIELD
    # Check Path connected
    # marker for visited tiles
    path_chked = [False for _ in range(size**2)]
    # largest block in map
    largest_block = []
    # Mark visited tiles as True in path_chked in visited blocks
    for i in range(size**2):
        # if new block of area
        if g_map[i] == PATH and not path_chked[i]:
            frontiers = [i]
            # add PATH to frontier if it's a neighbor of some tile in frontier.
            while True:
                pre = frontiers
                # add to frontier if is neighbor and a PATH
                for j in frontiers:
                    path_chked[j] = True
                    frontiers.extend(filter(lambda x: is_nei(x, j, alldir=False, size=size) and (x not in pre) and (g_map[x] in [MONSTER, ITEM, PATH]), [
                        j-size, j-1, j+1, j+size]))
                # exit when one pass adds nothing (finished growing the block)
                if pre == frontiers:
                    # save largest block in largest_block
                    if len(largest_block) < len(frontiers):
                        largest_block = frontiers
                    break
    # Delete all blocks that are not the largest block
    for i in range(size**2):
        if i not in largest_block:
            g_map[i] = FIELD
    # Assign random tile as LADDER
    g_map[random.choice(largest_block)] = LADDER
    # return pair of map and size of path block
    return (g_map, len(largest_block))
