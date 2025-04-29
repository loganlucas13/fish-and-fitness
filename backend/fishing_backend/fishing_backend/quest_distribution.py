import json
import sqlite3
import random

from fishing_backend.client import getDistance
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


def get_random_quest():
    try:
        conn = sqlite3.connect('fishing.db')
        conn.execute("PRAGMA foreign_keys = ON;")
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM preset_quests")

        result = cursor.fetchall()
        #print(result) #some debug checkup

        conn.close() # make sure to close connection before returning

        questIndex = random.randint(0, len(result) - 1)
        chosenQuest = result[questIndex]

        formattedResult = {
                'activity': chosenQuest[0],
                'distance': chosenQuest[1],
                'reward_type': chosenQuest[2],
                'reward_quantity': chosenQuest[3],
            }
        return formattedResult

    except sqlite3.Error as e:
        print(f"Error connecting to the database: {e}")


# View function to request a quest for a specific user
@csrf_exempt
def request_quest(request):
    if request.method == 'GET':
        try:
            username = request.GET.get('username')
            if not username:
                return JsonResponse({'ERROR': 'no username'}, status=400)
            
            conn = sqlite3.connect('fishing.db')
            conn.execute("PRAGMA foreign_keys = ON;")
            cursor = conn.cursor()
            cursor.execute('''
                SELECT activity, distance, distance_progress, reward_type, reward_quantity
                FROM pending_quests
                WHERE username = ?
                LIMIT 1
            ''', (username,))
            result = cursor.fetchone()
            # #this code is rly spaghetti, fix it later
            # if result:
            #     data = {
            #         'activity': result[0],
            #         'distance': result[1],
            #         'distance_progress': result[2],
            #         'reward_type': result[3],
            #         'reward_quantity': result[4],}
            #     conn.close()
            #     return JsonResponse({'quest_data': data}, status=200, safe=False)



            # If a quest is found, it would be returned, but currently it's skipped for a random quest
            # Instead, we are fetching a random quest and updating the database            
            data = get_random_quest()
            activity = data.get('activity')
            distance = data.get('distance')
            reward_type = data.get('reward_type')
            reward_quantity = data.get('reward_quantity')

            
            cursor.execute("REPLACE INTO pending_quests (username, activity, distance, distance_progress, reward_type, reward_quantity) VALUES (?, ?, ?, ?, ?, ?)", (username, activity, distance, 0, reward_type, reward_quantity))
            conn.commit()
            return JsonResponse({'quest_data': data}, status=200, safe=False)
        except Exception as e:
            return JsonResponse({'ERROR': str(e)}, status=500)
    return JsonResponse({'ERROR': 'invalid request method'}, status=405)


def add_user_quest(username, quest):
    print(username)
    print(quest)
    return []



# View function to accept a quest for a user 
@csrf_exempt
def accept_quest(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            quest = data.get('quest')

            contents = add_user_quest(username, quest)

            return JsonResponse({'message': f'contents: {contents}'}, status = 200)
        except Exception as e:
            return JsonResponse({'ERROR': str(e)}, status=500)
    return JsonResponse({'ERROR: invalid request method'}, status=405)



def check_progress(username):
    # check user's progress using Strava, update progress in data base, then return updated quest information to the user
    # make sure to include ALL columns from the user's quest table
    progress = getDistance()
    print(progress)
    return progress

@csrf_exempt
def request_update(request):
    if request.method == 'GET':
        try:
            username = request.GET.get('username')
            if not username:
                return JsonResponse({'ERROR': 'no username'}, status=400)

            data = check_progress(username)

            conn = sqlite3.connect('fishing.db')
            conn.execute("PRAGMA foreign_keys = ON;")
            cursor = conn.cursor()
            cursor.execute("UPDATE pending_quests SET distance_progress = ? WHERE username = ?", (data, username))
            conn.commit()
            conn.close()

            return JsonResponse({'quest_data': data}, status=200, safe=False)
        except Exception as e:
            return JsonResponse({'ERROR': str(e)}, status=500)
    return JsonResponse({'ERROR': 'invalid request method'}, status=405)