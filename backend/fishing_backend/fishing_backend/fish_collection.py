#generally the file where the database tables are created
#there's also the database connection
#some data is carried into the frontend
import json
import sqlite3
from collections import defaultdict
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


#===========================DATABASE CREATION==========================
#
#               CURRENTLY NOT NEEDED, IT'S FOR REFERENCES
#
#
#
#
def database_creation():
    try:
        conn = sqlite3.connect('fishing.db')
        cursor = conn.cursor()
        cursor.execute(
            """
        CREATE TABLE IF NOT EXISTS users (
            username TEXT PRIMARY KEY UNIQUE,
            password TEXT NOT NULL
        )
        """
        )
        cursor.execute(
            """
        CREATE TABLE IF NOT EXISTS fish (
            fishname TEXT NOT NULL,
            rarities TEXT NOT NULL
        )
        """
        )
        cursor.execute(
            """
        CREATE TABLE IF NOT EXISTS collection (
            username TEXT PRIMARY KEY UNIQUE,
            fishname TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            FOREIGN KEY (username) REFERENCES users(username),
            FOREIGN KEY (fishname) REFERENCES fish(fishname)
        )
        """
        )
        conn.commit()
        conn.close()
        print("Table(s) created/checked")
    except sqlite3.Error as e:
        print(f"Error connecting to the database: {e}")

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
            print('not successful')
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

#===================FUNCTION EXECUTION==========================
def fishmain(request):
    #database_creation() #shouldn't be needed, as the database is already created
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