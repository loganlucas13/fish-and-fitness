# This script is just to assign % to each fish
# between 1-100 uniquely
# only cares about same rarities
import sqlite3
import random
from collections import defaultdict

conn = sqlite3.connect("backend/fishing_backend/fishing.db")
cur = conn.cursor()
cur.execute("SELECT fishname, rarities FROM fish")
fishes = cur.fetchall()

rarity_buckets = defaultdict(list)
for fishname, rarities in fishes:
    rarity_buckets[rarities].append(fishname)

updates = []
for rarity, fish_list in rarity_buckets.items():
    probs = random.sample(range(1, 101), len(fish_list))
    for fishname, prob in zip(fish_list, probs):
        updates.append((prob / 100.0, fishname))

cur.executemany("UPDATE fish SET probability = ? WHERE fishname = ?", updates)
conn.commit()
conn.close()
