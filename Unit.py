class Unit():
    def __init__(self, name="Unit", MHP=10, MMP=10):
        self.name = name
        self.HP = MHP
        self.MP = MMP
        self.MHP = MHP
        self.MMP = MMP
        self.items = []
        self.attacks = []

    def setHP(self, newHP):
        self.HP = newHP if newHP < self.MHP else self.MHP
        self.HP = 0 if self.HP < 0 else self.HP

    def getHP(self):
        return self.HP

    def setMP(self, newMP):
        self.MP = newMP if newMP < self.MMP else self.MMP
        self.MP = 0 if self.MP < 0 else self.MP

    def getMP(self):
        return self.MP

    def print_status(self):
        print(self.name)
        print(f"HP = {self.HP}/{self.MHP}")
        print(f"MP = {self.MP}/{self.MMP}")


class Player(Unit):
    def __init__(self, start_location, name="Player", MHP=30, MMP=10):
        Unit.__init__(self, name, MHP, MMP)
        self.location = start_location
        self.monster_defeated = 0

    def setMD(self):
        self.monster_defeated += 1

    def getMD(self):
        return self.monster_defeated

    def getScore(self):
        return self.monster_defeated * 100 + len(self.items) * 10

    def setLocation(self, new_location):
        self.location = new_location

    def getLocation(self):
        return self.location

    def print_items(self):
        print("Items:")
        if self.items != []:
            for index, i in enumerate(self.items):
                print(f"  {index+1}: {i}")
        else:
            print("  None")

    def print_attacks(self):
        print("Attacks:")
        if self.attacks != []:
            for index, a in enumerate(self.attacks):
                print(f"  {index+1}: {a}")
        else:
            print("  None")

    def print_full(self):
        self.print_status()
        self.print_items()
        self.print_attacks()
        print(f"Defeated monsters: {self.getMD()}")
        print("Score:", self.getScore())


class Monster(Unit):
    def __init__(self, name="Monster", MHP=10, MMP=10):
        Unit.__init__(self, name, MHP, MMP)
