from map_generator import generate_map
from map_functions import MAP_SIZE, print_map


for i in range(100):
    gm = generate_map(i)
    print_map(gm)
    print(i)
