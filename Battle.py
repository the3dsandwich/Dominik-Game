import random
from Unit import Unit


class SingleBattle():
    def __init__(self, unit1=Unit("unit1"), unit2=Unit("unit2")):
        self.unit1 = unit1
        self.unit2 = unit2

    def print_status(self):
        self.unit1.print_status()
        self.unit2.print_status()

    def make_move(self, move, acting_unit=1):
        acting = self.unit2 if acting_unit == 2 else self.unit1
        target = self.unit1 if acting == self.unit2 else self.unit2
        # to be changed, only basic attacking
        target.setHP(target.getHP - random.randint(1, 3))
