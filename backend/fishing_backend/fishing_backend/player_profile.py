import random
import time

class PlayerProfile:
    """Represents a player with fishing and fitness stats."""

    def __init__(self, name):
        self.name = name
        self.level = 1
        self.xp = 0
        self.bait_inventory = {"Base Bait": 1}
        self.fish_inventory = {}  # Stores caught fish
        self.biggest_fish = None
        self.total_fish_caught = 0
        self.calories_burned = 0
        self.distance_traveled = 0  # In kilometers
        self.total_steps = 0
        self.fitness_quests_completed = 0
        # self.achievements = []

    def add_bait(self, bait_name, amount=1):

        if bait_name in self.bait_inventory:
            self.bait_inventory[bait_name] += amount
        else:
            self.bait_inventory[bait_name] = amount

    def add_fish(self, fish_name, weight):
        """Adds caught fish to the inventory."""
        self.total_fish_caught += 1

        if fish_name in self.fish_inventory:
            self.fish_inventory[fish_name].append(weight)
        else:
            self.fish_inventory[fish_name] = [weight]

        # Check if it's the biggest fish caught
        if self.biggest_fish is None or weight > self.biggest_fish[1]:
            self.biggest_fish = (fish_name, weight)