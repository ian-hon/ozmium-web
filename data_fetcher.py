import requests
import json
import datetime
import time

while True:
    tab = '\t'
    print(f'Updated at {time.strftime(f"%d/%m/%Y{tab}%H:%M:%S", time.localtime())}')

    data = requests.get('https://wakatime.com/api/v1/users/ajian_nedo/stats/all_time').json()
    data = sorted(data['data']['languages'], key=(lambda x:x['total_seconds']))[::-1]
    
    final = {}
    for x in data:
        m, s = divmod(int(x['total_seconds']), 60)
        h, m = divmod(m, 60)
        final[x['name']] = f'{h}hrs {m}mins'

    with open('language_data.json', 'w', encoding='utf-8') as file:
        json.dump(final, file, indent=4)
    
    time.sleep(60)
