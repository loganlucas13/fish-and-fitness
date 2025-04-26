import json
import sqlite3
import random

from fishing_backend.client import getDistance
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


def get_random_quest():
    try:
        conn = sqlite3.connect("fishing.db")
        conn.execute("PRAGMA foreign_keys = ON;")
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM preset_quests")

        result = cursor.fetchall()

        conn.close()  # make sure to close connection before returning

        questIndex = random.randint(0, len(result) - 1)
        chosenQuest = result[questIndex]

        formattedResult = {
            "activity": chosenQuest[0],
            "distance": chosenQuest[1],
            "reward_type": chosenQuest[2],
            "reward_quantity": chosenQuest[3],
        }
        return formattedResult

    except sqlite3.Error as e:
        print(f"Error connecting to the database: {e}")


@csrf_exempt
def request_quest(request):
    if request.method == "GET":
        try:
            data = get_random_quest()
            return JsonResponse({"quest_data": data}, status=200, safe=False)
        except Exception as e:
            return JsonResponse({"ERROR": str(e)}, status=500)
    return JsonResponse({"ERROR": "invalid request method"}, status=405)


def add_user_quest(username, quest):
    if not username:
        return JsonResponse({"ERROR": "no username"}, status=400)

    conn = sqlite3.connect("fishing.db")
    conn.execute("PRAGMA foreign_keys = ON;")
    cursor = conn.cursor()

    quest_data = quest["quest_data"]

    activity = quest_data.get("activity")
    distance = quest_data.get("distance")
    reward_type = quest_data.get("reward_type")
    reward_quantity = quest_data.get("reward_quantity")

    cursor.execute(
        "REPLACE INTO pending_quests (username, activity, distance, distance_progress, reward_type, reward_quantity) VALUES (?, ?, ?, ?, ?, ?)",
        (username, activity, distance, 0, reward_type, reward_quantity),
    )
    conn.commit()
    return {
        "activity": activity,
        "distance": distance,
        "distance_progress": 0,
        "reward_type": reward_type,
        "reward_quantity": reward_quantity,
    }


@csrf_exempt
def accept_quest(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            quest = data.get("quest")

            contents = add_user_quest(username, quest)

            return JsonResponse({"quest_data": contents}, status=200)
        except Exception as e:
            return JsonResponse({"ERROR": str(e)}, status=500)
    return JsonResponse({"ERROR: invalid request method"}, status=405)


def check_progress(username):
    progress = getDistance()
    return progress


@csrf_exempt
def request_update(request):
    if request.method == "GET":
        try:
            username = request.GET.get("username")
            if not username:
                return JsonResponse({"ERROR": "no username"}, status=400)

            data = check_progress(username)

            conn = sqlite3.connect("fishing.db")
            conn.execute("PRAGMA foreign_keys = ON;")
            cursor = conn.cursor()
            cursor.execute(
                "UPDATE pending_quests SET distance_progress = ? WHERE username = ?",
                (data, username),
            )
            conn.commit()

            cursor.execute(
                "SELECT * FROM pending_quests WHERE username = ?", (username,)
            )
            row = cursor.fetchone()
            columns = [column[0] for column in cursor.description]

            conn.close()

            if row is None:
                return JsonResponse({"ERROR": "No quest found"}, status=404)

            quest_data = dict(zip(columns, row))

            return JsonResponse({"quest_data": quest_data}, status=200)
        except Exception as e:
            return JsonResponse({"ERROR": str(e)}, status=500)
    return JsonResponse({"ERROR": "invalid request method"}, status=405)


def get_current_quest(username):
    try:
        conn = sqlite3.connect("fishing.db")
        conn.execute("PRAGMA foreign_keys = ON;")
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM pending_quests WHERE username = ?", (username,))
        row = cursor.fetchone()
        columns = [column[0] for column in cursor.description]

        conn.close()

        if row is None:
            return None

        quest_data = dict(zip(columns, row))
        return quest_data

    except sqlite3.Error as e:
        print(f"Error connecting to the database: {e}")
        return {"ERROR": str(e)}


@csrf_exempt
def request_current_quest(request):
    if request.method == "GET":
        try:
            username = request.GET.get("username")
            data = get_current_quest(username)
            return JsonResponse({"quest_data": data}, status=200, safe=False)
        except Exception as e:
            return JsonResponse({"ERROR": str(e)}, status=500)
    return JsonResponse({"ERROR": "invalid request method"}, status=405)


def add_reward_to_database(username):
    try:
        current_quest = get_current_quest(username)

        if not current_quest:
            return False

        reward_type = current_quest.get("reward_type")
        reward_quantity = current_quest.get("reward_quantity")

        conn = sqlite3.connect("fishing.db")
        conn.execute("PRAGMA foreign_keys = ON;")
        cursor = conn.cursor()

        cursor.execute(
            "SELECT quantity FROM chest_inventory WHERE username = ? AND rarity = ?",
            (username, reward_type),
        )
        row = cursor.fetchone()

        if row:
            current_quantity = row[0]
            new_quantity = current_quantity + reward_quantity
            cursor.execute(
                "UPDATE chest_inventory SET quantity = ? WHERE username = ? AND rarity = ?",
                (new_quantity, username, reward_type),
            )
        else:
            cursor.execute(
                "INSERT INTO chest_inventory (username, rarity, quantity) VALUES (?, ?, ?)",
                (username, reward_type, reward_quantity),
            )
        conn.commit()
        conn.close()
        return True
    except sqlite3.Error as e:
        print(f"Error connecting to the database: {e}")
        return {"ERROR": str(e)}


def clear_quest(username):
    try:
        current_quest = get_current_quest(username)

        if not current_quest:
            return False

        conn = sqlite3.connect("fishing.db")
        conn.execute("PRAGMA foreign_keys = ON;")
        cursor = conn.cursor()

        cursor.execute("DELETE FROM pending_quests WHERE username = ?", (username,))
        conn.commit()
        conn.close()
        return True
    except sqlite3.Error as e:
        print(f"Error connecting to the database: {e}")
        return {"ERROR": str(e)}


@csrf_exempt
def claim_reward(request):
    if request.method == "GET":
        try:
            username = request.GET.get("username")
            rewardAdded = add_reward_to_database(username)
            questDeleted = clear_quest(username)
            return JsonResponse(
                {"successful": rewardAdded and questDeleted}, status=200, safe=False
            )
        except Exception as e:
            return JsonResponse({"ERROR": str(e)}, status=500)
    return JsonResponse({"ERROR": "invalid request method"}, status=405)
