import json
import sqlite3
import random

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


def get_random_quest():
    try:
        conn = sqlite3.connect('fishing.db')
        conn.execute("PRAGMA foreign_keys = ON;")
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM preset_quests")

        result = cursor.fetchall()
        print(result)

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

@csrf_exempt
def request_quest(request):
    if request.method == 'GET':
        try:
            data = get_random_quest()

            return JsonResponse({'quest_data': data}, status=200, safe=False)
        except Exception as e:
            return JsonResponse({'ERROR': str(e)}, status=500)
    return JsonResponse({'ERROR': 'invalid request method'}, status=405)


def add_user_quest(username, quest):
    print(username)
    print(quest)
    return []

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
    return

@csrf_exempt
def request_update(request):
    if request.method == 'GET':
        try:
            username = request.GET.get('username')
            if not username:
                return JsonResponse({'ERROR': 'no username'}, status=400)

            data = check_progress(username)

            return JsonResponse({'quest_data': data}, status=200, safe=False)
        except Exception as e:
            return JsonResponse({'ERROR': str(e)}, status=500)
    return JsonResponse({'ERROR': 'invalid request method'}, status=405)