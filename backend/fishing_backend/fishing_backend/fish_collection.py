#generally the file where the database tables are created
#there's also the database connection
#some data is carried into the frontend
import json
import sqlite3
import random
from collections import defaultdict
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

#===========================DATABASE CREATION==========================
#
#                       USER CREATION/LOGIN
#
#
#
#
def database_new_user(username, password):
    try:
        conn = sqlite3.connect('fishing.db')
        conn.execute("PRAGMA foreign_keys = ON;")
        cursor = conn.cursor()
        cursor.execute("SELECT user_id FROM users WHERE username = ?", (username, ))
        user_exist = cursor.fetchone()
        #check if user already exists
        if user_exist:
            print("User already exists")
            conn.close()
            return user_exist
        #create the user, increments the highest user_id by one for the database
        else:
            cursor.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, password, ))
            conn.commit()
            print("User created")
            conn.close()
            return user_exist
    except sqlite3.Error as e:
        print(f"Error connecting to the database: {e}")

# parses request to actually create a user in the database
@csrf_exempt
def create_user(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            database_new_user(username, password)

            return JsonResponse({'message': f'user {username} created successfully'})
        except Exception as e:
            return JsonResponse({'ERROR': str(e)}, status=500)
    return JsonResponse({'ERROR: invalid request method'}, status=405)

# checks if user exists in database and if the input password matches the stored password in the database
def database_login_user(username, password):
    try:
        conn = sqlite3.connect('fishing.db')
        conn.execute("PRAGMA foreign_keys = ON;")
        cursor = conn.cursor()
        cursor.execute("SELECT user_id FROM users WHERE username = ?", (username, ))
        user_exist = cursor.fetchone()

        if not user_exist:
            return False

        cursor.execute("SELECT password FROM users WHERE username = ?", (username, ))
        stored_password = cursor.fetchone()

        if stored_password[0] != password:
            return False
        return True

    except sqlite3.Error as e:
        print(f"Error connecting to the database: {e}")

# parses request to login a user into the database
@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')

            successful = database_login_user(username, password)

            if successful:
                return JsonResponse({'message': f'user {username} logged in successfully'})
            return JsonResponse({'message': f'user {username} failed to log in'}, status = 400)
        except Exception as e:
            return JsonResponse({'ERROR': str(e)}, status=500)
    return JsonResponse({'ERROR: invalid request method'}, status=405)


#===========================DATABASE EXTRACTION==========================
#
#
#
#
#
def database_extraction():
    collection = defaultdict(int)
    try:
        conn = sqlite3.connect('fishing.db')
        conn.execute("PRAGMA foreign_keys = ON;")
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM fish")
        rows = cursor.fetchall()
        for row in rows:
            name = row[0]
            rarity = row[1]
            probability = row[2]
            collection[name] = (rarity, probability)
        conn.close()
    except sqlite3.Error as e:
        print(f"Error connecting to the database: {e}")
    return collection

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

        cursor.execute("SELECT fishname FROM fish WHERE rarities = ?", (rarity,))
        fish_options = cursor.fetchall()
        if not fish_options:
            raise Exception("No fish available for this rarity.")

        selected_fish = random.choice(fish_options)[0]

        cursor.execute("""
            SELECT quantity FROM collection WHERE user_id = ? AND fishname = ?
        """, (u_id, selected_fish))
        existing = cursor.fetchone()

        if existing:
            cursor.execute("""
                UPDATE collection SET quantity = quantity + 1
                WHERE user_id = ? AND fishname = ?
            """, (u_id, selected_fish))
        else:
            cursor.execute("""
                INSERT INTO collection (user_id, fishname, quantity)
                VALUES (?, ?, 1)
            """, (u_id, selected_fish))

        cursor.execute("""
            UPDATE chest_inventory
            SET quantity = quantity - 1
            WHERE user_id = ? AND rarity = ? AND quantity > 0
        """, (u_id, rarity))

        conn.commit()
        conn.close()

        return [{'fishname': selected_fish}]
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

#===================FUNCTION EXECUTION==========================
def fishmain(request):
    fishes = database_extraction()
    if not fishes:
        print("Didn't extract fish data")
        return JsonResponse({'error': "No fish"}, status=404)
    return JsonResponse(fishes, safe=False)

def usermain(request):
    user = "user" #PLEASE CHANGE THIS FOR DYNAMIC INPUT
    password = "password" #PLEASE CHANGE THIS FOR DYNAMIC INPUT
    new_user = database_new_user(user, password) #user_id is stored here for any future usage
    return JsonResponse((user, password), safe = False)