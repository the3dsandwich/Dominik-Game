class SingleBattle():
    def __init__(self, player, opponent):
        self.player = player
        self.opponent = opponent


from Unit import Unit

sb = SingleBattle(Unit("Player"), Unit("Opponent"))
sb.player.print_status()
sb.opponent.print_status()
