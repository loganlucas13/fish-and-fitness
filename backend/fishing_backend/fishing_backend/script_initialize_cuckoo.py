# WARNING WARNING
# if using this script, please run it from the backend/fishing_backend directory

import sqlite3
import pickle
from cuckoopy import CuckooFilter

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def request_cuckoo(request):
    if request.method == "POST":
        cuckoo_initialization()
        return JsonResponse({"message": "Cuckoo filter created and saved to cuckoo.pkl"})
    return JsonResponse({"ERROR: invalid request method"}, status=405)

def cuckoo_initialization():
    conn = sqlite3.connect("fishing.db")
    cursor = conn.cursor()

    cursor.execute("SELECT username FROM users")
    usernames = [row[0] for row in cursor.fetchall()]
    conn.close()

    cf = CuckooFilter(
        capacity=500, bucket_size=4, fingerprint_size=1, max_displacements=500
    )

    for username in usernames:
        cf.insert(username)

    with open("cuckoo.pkl", "wb") as f:
        pickle.dump(cf, f)
        
    print("Cuckoo filter created and saved to cuckoo.pkl")

def main():
    cuckoo_initialization()

if __name__ == "__main__":
    main()