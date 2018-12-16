class Item():
    def __init__(self, name="Item", des="An Item"):
        self.name = name
        self.description = des

    def print_status(self):
        print(f"{self.name}:")
        print(self.description)


class HealItem(Item):
    def __init__(self, name="Potion", des="A basic Potion", heal=10):
        Item.__init__(name, des)
        self.heal = heal

    def print_status(self):
        super.print_status()
        print(f"Heals {self.heal} points of HP")
