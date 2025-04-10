#generally the file where the database tables are created
#there's also the database connection
#some data is carried into the frontend
import sqlite3
from collections import defaultdict
from django.http import JsonResponse

#===========================DATABASE CREATION==========================
#
#
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
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM fish")
        rows = cursor.fetchall()
        for row in rows:
            name = row[0]
            rarity = row[1]
            collection[name] = rarity
        conn.close()
    except sqlite3.Error as e:
        print(f"Error connecting to the database: {e}")
    return collection


#===================FUNCTION EXECUTION==========================
def fishmain(request):
    database_creation()
    fishes = database_extraction()
    if not fishes:
        print("Didn't extract fish data")
        return JsonResponse({'error': "No fish"}, status=404)
    return JsonResponse(fishes, safe=False)