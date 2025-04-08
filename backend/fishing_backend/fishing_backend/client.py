import requests
import urllib3

#Ignores the warning........
#It's probably fine
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

auth_url = "https://www.strava.com/oauth/token"
activities_url = "https://www.strava.com/api/v3/athlete/activities"


#==============================================================================

payload = {
    'client_id' : 'something', #forever engrained for ur client
    'client_secret' : 'something', #hidden in your strava/settings/api
    'refresh_token' : 'something', #doesn't expire, must find in your post request, heres a guide: https://towardsdatascience.com/using-the-strava-api-and-pandas-to-explore-your-activity-data-d94901d9bfde/
    'grant_type' : 'refresh_token',
    'f' : 'json'
}

print("\nRequesting token...\n")
res = requests.post(auth_url, data = payload, verify = False)
access_token = res.json()['access_token']
print("Access Token: {}\n".format(access_token)) #not static

header = {}
header['Authorization'] = 'Bearer ' + access_token
parameter = {}
parameter['per_page'] = 200
parameter['page'] = 1
my_dataset = requests.get(activities_url, headers = header, params = parameter).json()
print(my_dataset[0]["distance"]) #gets the distance of an activity