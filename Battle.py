import random
from Unit import Unit


class SingleBattle():
    def __init__(self, unit1=Unit("unit1"), unit2=Unit("unit2")):
        self.unit1 = unit1
        self.unit2 = unit2

    def print_status(self):
        self.unit1.print_status()
        self.unit2.print_status()

    def make_move(self, acting_unit):
        pass
