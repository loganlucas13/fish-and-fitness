# WARNING WARNING
# if using this script, please run it from the fgp-al-khwarizmi root folder

import sqlite3
import pickle
from cuckoopy import CuckooFilter

conn = sqlite3.connect("backend/fishing_backend/fishing.db")
cursor = conn.cursor()

cursor.execute("SELECT username FROM users")
usernames = [row[0] for row in cursor.fetchall()]
conn.close()

cf = CuckooFilter(
    capacity=10000, bucket_size=4, fingerprint_size=1, max_displacements=500
)

for username in usernames:
    cf.insert(username)

with open("backend/fishing_backend/cuckoo.pkl", "wb") as f:
    pickle.dump(cf, f)

print("Cuckoo filter created and saved to cuckoo.pkl")
