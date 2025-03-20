import random
import fish_init

class Bait:

    def __init__(self, name, tier, catch_modifier, weight_modifier_range):
        self.name = name
        self.tier = tier
        self.catch_modifier = catch_modifier  # Adjusts chance of catching rarer fish
        self.weight_modifier_range = weight_modifier_range  # Affects fish weight

baits = {
    "Base Bait": Bait("Base Bait", "Base", {"Common": 1.0, "Rare": 0.5, "Epic": 0.2, "Mythical": 0.1, "Legendary": 0.05}, (0.9, 1.0)),
    "Common Pro Bait": Bait("Common Pro Bait", "Common", {"Common": 1.5, "Rare": 1.0, "Epic": 0.6, "Mythical": 0.3, "Legendary": 0.1}, (1.0, 1.1)),
    "Rare Pro Bait": Bait("Rare Pro Bait", "Rare", {"Common": 1.0, "Rare": 1.5, "Epic": 1.2, "Mythical": 0.7, "Legendary": 0.3}, (1.05, 1.2)),
    "Epic Pro Bait": Bait("Epic Pro Bait", "Epic", {"Common": 0.8, "Rare": 1.0, "Epic": 1.5, "Mythical": 1.2, "Legendary": 0.5}, (1.1, 1.3)),
    "Mythical Pro Bait": Bait("Mythical Pro Bait", "Mythical", {"Common": 0.5, "Rare": 0.8, "Epic": 1.2, "Mythical": 1.5, "Legendary": 1.0}, (1.2, 1.4)),
    "Legendary Pro Bait": Bait("Legendary Pro Bait", "Legendary", {"Common": 0.3, "Rare": 0.5, "Epic": 1.0, "Mythical": 1.3, "Legendary": 1.5}, (1.3, 1.5)),
}

class FishingAction:
    def __init__(self, location):
        self.location_data = getattr(fish_init, location)  # Get fish data from the module
        self.weather = self.get_random_weather()
        self.time_of_day = self.get_random_time()

    def get_random_weather(self):
        weather_conditions = {
            "Sunny & Clear": (0.9, 1.05),
            "Cloudy/Overcast": (1.0, 1.1),
            "Rainy": (1.05, 1.15),
            "Thunderstorm": (1.1, 1.3),
            "Foggy": (1.0, 1.2),
            "Windy": (0.85, 1.0),
            "Snowy": (0.8, 1.0),
            "Heatwave": (0.9, 1.05),
        }
        weather = random.choice(list(weather_conditions.keys()))
        return weather_conditions[weather]

    def get_random_time(self):
        time_periods = {
            "Early Morning (4 AM - 8 AM)": (1.1, 1.3),
            "Morning (8 AM - 12 PM)": (1.0, 1.1),
            "Afternoon (12 PM - 4 PM)": (0.9, 1.05),
            "Evening (4 PM - 8 PM)": (1.0, 1.15),
            "Night (8 PM - 4 AM)": (0.95, 1.2),
        }
        time = random.choice(list(time_periods.keys()))
        return time_periods[time]
    

    def fish(self):
        rarity_probabilities = {
            "Common": 0.5,
            "Rare": 0.3,
            "Epic": 0.12,
            "Mythical": 0.06,
            "Legendary": 0.02,
        }
        
        rarity = random.choices(list(rarity_probabilities.keys()), weights=rarity_probabilities.values())[0]
        fish = random.choice(self.location_data[rarity])

        mean_weight = fish.average_weight
        std_dev = mean_weight * 0.2  # 20% standard deviation
        fish_weight = max(0.5, random.gauss(mean_weight, std_dev))

        weather_modifier = random.uniform(*self.weather) 
        time_of_day_modifier = random.uniform(*self.time_of_day)
        bait_quality_modifier = random.uniform(1.0, 1.2)

        final_weight = fish_weight * weather_modifier * time_of_day_modifier * bait_quality_modifier
        final_weight = round(final_weight, 2)

        return f"You caught a {fish.name} ({rarity}) weighing {final_weight} lbs!"