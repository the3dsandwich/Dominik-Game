import random
from map_functions import MAP_SIZE, DIRECTIONS, FieldTile, MonsterTile, ItemTile, PathTile, LadderTile, choices, count_nei, set_nei, is_nei, print_map, print_location


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
            choices(), weights=[0.5, 0.01, 0.01, 0.48])[0]
    # Change Monster and Item neighbor to PATH
    for i in range(size**2):
        if type(g_map[i]) == MonsterTile or type(g_map[i]) == ItemTile:
            set_nei(i, g_map, size=size)
    # Shrink isolated FIELD
    for i in range(size**2):
        if type(g_map[i]) == FieldTile and count_nei(i, g_map, FieldTile, size=size) < 1:
            g_map[i] = PathTile()
    # Shrink isolated PATH
    for i in range(size**2):
        if count_nei(i, g_map, PathTile, size=size) < 2:
            g_map[i] = FieldTile()
    # Change border to FIELD
    for i in range(size**2):
        if i // size == 0 or i // size == size-1 or i % size == 0 or i % size == size-1:
            g_map[i] = FieldTile()
    # Check Path connected
    # marker for visited tiles
    path_chked = [False for _ in range(size**2)]
    # largest block in map
    largest_block = []
    # Mark visited tiles as True in path_chked in visited blocks
    for i in range(size**2):
        # if new block of area
        if type(g_map[i]) is PathTile and not path_chked[i]:
            frontiers = [i]
            # add PATH to frontier if it's a neighbor of some tile in frontier.
            while True:
                pre = frontiers
                # add to frontier if is neighbor and a PATH
                for j in frontiers:
                    path_chked[j] = True
                    frontiers.extend(filter(lambda x: is_nei(x, j, alldir=False, size=size) and (x not in pre) and (type(g_map[x]) is MonsterTile or type(g_map[x]) is ItemTile or type(g_map[x]) is PathTile), [
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
            g_map[i] = FieldTile()
    # Assign random tile as LADDER
    ladder_index = random.choice(largest_block)
    g_map[ladder_index] = LadderTile()
    # return pair of map and size of path block
    return (g_map, len(largest_block), ladder_index)
