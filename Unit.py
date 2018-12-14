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

    def print_full(self):
        self.print_status()
        print(self.items)
        print(self.attacks)


class Player(Unit):
    def __init__(self, start_location, name="Unit", MHP=30, MMP=10):
        Unit.__init__(self, "Player", MHP, MMP)
        self.location = start_location

    def setLocation(self, new_location):
        self.location = new_location

    def getLocation(self):
        return self.location
