import json
import random
import sqlite3
import heapq

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

def extract_fish_for_user(username):
    # 1. get user id
    # 2. get fish data from fish table
    # 3. join users collection with fishname
    try:
        conn = sqlite3.connect('fishing.db')
        conn.execute("PRAGMA foreign_keys = ON;")
        cursor = conn.cursor()

        # get user id using username
        cursor.execute("SELECT user_id FROM users WHERE username = ?", (username, ))
        result = cursor.fetchone()
        if not result:
            return []

        u_id = result[0]

        # join data from collection and fish tables
        cursor.execute("""
        SELECT fish.fishname, fish.rarities, fish.probability,
            COALESCE(collection.quantity, 0) AS quantity
        FROM fish
        LEFT JOIN collection ON collection.fishname = fish.fishname AND collection.user_id = ?
        """, (u_id,))
        result = cursor.fetchall()

        conn.close() # make sure to close connection before returning

        print(u_id)
        # return formatted results
        return [
            {
                'fishname': row[0],
                'rarities': row[1],
                'probability': row[2],
                'quantity': row[3]
            }
            for row in result
        ]
    except sqlite3.Error as e:
        print(f"Error connecting to the database: {e}")
    return []

# parses request for username, then calls helper function to construct query and return proper response
@csrf_exempt
def request_fishapedia_data(request):
    if request.method == 'GET':
        try:
            username = request.GET.get('username')
            if not username:
                return JsonResponse({'ERROR': 'no username'}, status=400)

            data = extract_fish_for_user(username)

            return JsonResponse({'fish_data': data}, status=200, safe=False)
        except Exception as e:
            return JsonResponse({'ERROR': str(e)}, status=500)
    return JsonResponse({'ERROR': 'invalid request method'}, status=405)

# get fish crate inventory for user
def extract_user_inventory(username):
    try:
        conn = sqlite3.connect('fishing.db')
        conn.execute("PRAGMA foreign_keys = ON;")
        cursor = conn.cursor()

        # get user id using username
        cursor.execute("SELECT user_id FROM users WHERE username = ?", (username, ))
        result = cursor.fetchone()
        if not result:
            return []

        u_id = result[0]

        # join data from collection and fish tables
        cursor.execute("SELECT rarity, quantity FROM chest_inventory WHERE user_id = ?", (u_id,))
        result = cursor.fetchall()

        conn.close() # make sure to close connection before returning

        print(u_id)
        # return formatted results
        return [
            {
                'rarity': row[0],
                'quantity': row[1],
            }
            for row in result
        ]
    except sqlite3.Error as e:
        print(f"Error connecting to the database: {e}")
    return []

@csrf_exempt
def request_inventory(request):
    if request.method == 'GET':
        try:
            username = request.GET.get('username')
            if not username:
                return JsonResponse({'ERROR': 'no username'}, status=400)

            data = extract_user_inventory(username)

            return JsonResponse({'inventory': data}, status=200, safe=False)
        except Exception as e:
            return JsonResponse({'ERROR': str(e)}, status=500)
    return JsonResponse({'ERROR': 'invalid request method'}, status=405)

def perform_crate_opening(username, rarity):
    try:
        conn = sqlite3.connect('fishing.db')
        conn.execute("PRAGMA foreign_keys = ON;")
        cursor = conn.cursor()

        cursor.execute("SELECT user_id FROM users WHERE username = ?", (username,))
        result = cursor.fetchone()
        if not result:
            raise Exception("User not found.")
        u_id = result[0]

        cursor.execute("SELECT fishname, probability FROM fish WHERE rarities = ?", (rarity,))
        fish_options = cursor.fetchall()
        if not fish_options:
            raise Exception("No fish available for this rarity.")

        random_val = random.uniform(0.01, 1.00)
        #advanced data structure requirement here
        #kth largest with a heap
        heap = []
        for fishname, prob in fish_options:
            diff = abs(prob - random_val)
            heapq.heappush(heap, (diff, fishname, prob))
        k = random.randint(1, 3)
        top_k = heapq.nsmallest(k, heap)

        selected_fishes = []
        for f in top_k:
            selected_fishes.append(f[1])
        
        for fish in selected_fishes:
            cursor.execute("""
                SELECT quantity FROM collection WHERE user_id = ? AND fishname = ?
            """, (u_id, fish))
            existing = cursor.fetchone()

            if existing:
                cursor.execute("""
                    UPDATE collection SET quantity = quantity + 1
                    WHERE user_id = ? AND fishname = ?
                """, (u_id, fish))
            else:
                cursor.execute("""
                    INSERT INTO collection (user_id, fishname, quantity)
                    VALUES (?, ?, 1)
                """, (u_id, fish))

        cursor.execute("""
            UPDATE chest_inventory
            SET quantity = quantity - 1
            WHERE user_id = ? AND rarity = ? AND quantity > 0
        """, (u_id, rarity))

        conn.commit()
        conn.close()

        return [{'fishname': f} for f in selected_fishes]
    except sqlite3.Error as e:
        print(f"Database error during crate opening: {e}")
        return []
    except Exception as e:
        print(f"Error during crate opening: {e}")
        return []

@csrf_exempt
def open_crate(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            rarity = data.get('rarity')

            contents = perform_crate_opening(username, rarity)

            return JsonResponse({'message': f'contents: {contents}'}, status = 200)
        except Exception as e:
            return JsonResponse({'ERROR': str(e)}, status=500)
    return JsonResponse({'ERROR: invalid request method'}, status=405)