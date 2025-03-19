

class Fish:
    def __init__(self, name, rarity, average_weight = 0):
        self.name = name
        self.rarity = rarity
        self.average_weight = average_weight


# Datasets of all fishes in their respective zones   

florida_coast = {
    "Common": [
        Fish("Black Sea Bass", "Common", 2.5),
        Fish("Lane Snapper", "Common", 1.5),
        Fish("Mutton Snapper", "Common", 7.5),
        Fish("Schoolmaster Snapper", "Common", 2.0),
        Fish("White Grunt", "Common", 1.5),
        Fish("Red Lionfish", "Common", 1.0),
        Fish("Yellowtail Snapper", "Common", 3.0),
        Fish("Blue Runner", "Common", 2.0),
    ],
    "Rare": [
        Fish("Hogfish", "Rare", 5.0),
        Fish("Red Grouper", "Rare", 8.0),
        Fish("Sheepshead", "Rare", 4.0),
        Fish("Yellowfin Grouper", "Rare", 10.0),
        Fish("Dusky Smooth Hound", "Rare", 7.0),
        Fish("Common Snook", "Rare", 10.0),
    ],
    "Epic": [
        Fish("Blacknose Shark", "Epic", 25.0),
        Fish("Nassau Grouper", "Epic", 20.0),
        Fish("Red Snapper", "Epic", 8.0),
        Fish("Clearnose Skate", "Epic", 5.0),
    ],
    "Mythical": [
        Fish("Common Dolphinfish", "Mythical", 15.0),
        Fish("Great Barracuda", "Mythical", 10.0),
        Fish("Atlantic Tarpon", "Mythical", 40.0),
    ],
    "Legendary": [
        Fish("Bonnethead Shark", "Legendary", 20.0),
        Fish("Great Northern Tilefish", "Legendary", 25.0),
    ]
}

guntersville_lake = {
    "Common": [
        Fish("Black Crappie", "Common", 1.0),
        Fish("Bluegill", "Common", 0.5),
        Fish("Longear Sunfish", "Common", 0.25),
        Fish("Spotted Bass", "Common", 2.0),
        Fish("White Bass", "Common", 1.5),
        Fish("White Crappie", "Common", 1.0),
        Fish("American Eel", "Common", 2.0),
        Fish("Redear Sunfish", "Common", 1.0),
    ],
    "Rare": [
        Fish("Channel Catfish", "Rare", 5.0),
        Fish("Sauger", "Rare", 2.5),
        Fish("Smallmouth Bass", "Rare", 3.0),
        Fish("Walleye", "Rare", 4.0),
        Fish("Spotted Gar", "Rare", 5.0),
        Fish("Rock Bass", "Rare", 1.0),
    ],
    "Epic": [
        Fish("Blue Catfish", "Epic", 20.0),
        Fish("Striped Bass", "Epic", 15.0),
        Fish("Largemouth Bass", "Epic", 5.0),
        Fish("American Paddlefish", "Epic", 60.0),
    ],
    "Mythical": [
        Fish("Flathead Catfish", "Mythical", 30.0),
        Fish("Muskellunge", "Mythical", 15.0),
        Fish("Bigmouth Buffalo", "Mythical", 25.0),
    ],
    "Legendary": [
        Fish("Lake Sturgeon", "Legendary", 50.0),
        Fish("Albino Muskellunge", "Legendary", 15.0),
    ]
}

kenai_river = {
    "Common": [
        Fish("Bull Trout", "Common", 4.0),
        Fish("Dolly Varden Trout", "Common", 3.0),
        Fish("Brook Trout", "Common", 2.5),
        Fish("Round Whitefish", "Common", 1.5),
    ],
    "Rare": [
        Fish("Arctic Grayling", "Rare", 1.0),
        Fish("Nelma", "Rare", 10.0),
        Fish("Rainbow Trout", "Rare", 5.0),
        Fish("Brown Trout", "Rare", 6.0),
        Fish("Northern Pike", "Rare", 8.0),
    ],
    "Epic": [
        Fish("Chum Salmon", "Epic", 8.0),
        Fish("Lake Trout", "Epic", 15.0),
        Fish("Sockeye Salmon", "Epic", 10.0),
        Fish("Yellow Perch", "Epic", 1.0),
    ],
    "Mythical": [
        Fish("Chinook Salmon", "Mythical", 30.0),
        Fish("Golden Trout", "Mythical", 2.0),
        Fish("Coastal Rainbow Trout (Steelhead)", "Mythical", 8.0),
    ],
    "Legendary": [
        Fish("Blue Mutation Rainbow Trout (Blue Trout)", "Legendary", 5.0),
        Fish("Golden Rainbow Trout", "Legendary", 5.0),
    ]
}



