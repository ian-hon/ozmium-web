import requests
import json
import time

def get_name(i):
    d = {
        'JavaScript': 'js',
        'TypeScript': 'ts',
    }
    if i in d.keys():
        return d[i]
    return i.lower()

while True:
    try:
        response = requests.get('https://wakatime.com/api/v1/users/ian_hon/stats/all_time').json()
        data = {
            'time': time.time(),
            'data': [[get_name(i['name']), f"{i['hours']}hrs"] for i in response['data']['languages'] if not (i['name'].lower() in ['other', 'binary', 'json', 'text'])][0:9]
        }
        
        with open('data.json', 'w') as file:
            json.dump(data, file, indent=4)
        
        print(f'fetched : {time.time()}')
    except requests.HTTPError as e:
        print(f'error occured at {time.time()} : {e}')
    
    time.sleep(60 * 5)
