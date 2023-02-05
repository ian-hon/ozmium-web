import requests
import json
import datetime
import time

ape_key = 'NjM5ODk2YTIzYmFmY2JkMTAxODkzYTgyLkx0ZnM4RzBEYVRncHJKd0tIZENyWU1VTDZfejA4RzNn'

while True:
    tab = '\t'
    print(f'Updated at {time.strftime(f"%d/%m/%Y{tab}%H:%M:%S", time.localtime())}')

    language_data = requests.get('https://wakatime.com/api/v1/users/ajian_nedo/stats/all_time').json()
    language_data = sorted(language_data['data']['languages'], key=(lambda x:x['total_seconds']))[::-1]
    
    monkey_data = requests.get('https://api.monkeytype.com/users/ajian_nedo/profile').json()
    
    final = {
        'languages': {},
        'monkeytype': {}
    }
    for x in language_data:
        m, s = divmod(int(x['total_seconds']) + 180000, 60) # adding 50 hours to compensate for pre-wakatime tracking
        h, m = divmod(m, 60)
        final['languages'][x['name']] = f'{h}hrs {m}mins'
    
    final['monkeytype'] = {
        'acc': f"Acc: {monkey_data['data']['personalBests']['time']['15'][0]['acc']}%",
        'max': f"Avg: {monkey_data['data']['personalBests']['words']['10'][0]['wpm']}wpm",
        'tests': f"Tests: {int(monkey_data['data']['typingStats']['startedTests'])}"
    }

    with open('data.json', 'w', encoding='utf-8') as file:
        json.dump(final, file, indent=4)
    
    time.sleep(60)
