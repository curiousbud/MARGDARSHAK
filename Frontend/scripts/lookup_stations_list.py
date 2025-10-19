#!/usr/bin/env python3
"""
lookup_stations_list.py
Queries Nominatim for coordinates of a hard-coded station list and saves results to station-lookup-results.json

Usage:
  python lookup_stations_list.py

Output:
  station-lookup-results.json

Notes:
 - Rate-limited: sleeps 1.1s between requests to be polite to Nominatim
 - Set USER_EMAIL below to a contact email to include in the 'From' header (recommended)
"""
import requests
import time
import json
import os

# Set contact email per Nominatim policy
USER_EMAIL = "your-email@example.com"
USER_AGENT = f"MARGDARSHAK/1.0 ({USER_EMAIL})"

stations = [
    "VIRAR",
    "Vaitarna",
    "Saphale",
    "Kelve Road",
    "Palghar",
    "Boisar",
    "Vangaon",
    "Dahanu Road",
    "Gholvad",
    "Umbergaon Road",
    "Sanjan",
    "Bhilad",
    "Karambeli",
    "Vapi",
    "Udvada",
    "Pardi",
    "Atul",
    "Valsad",
    "Dungri",
    "Joravasan",
    "Bilimora Junction",
    "Amalsad",
    "Ancheli",
    "Vedchha",
    "Navsari",
    "Maroli",
    "Sachin",
    "Bhestan",
    "Udhna Junction",
    "Surat"
]

base = 'https://nominatim.openstreetmap.org/search'
headers = {'User-Agent': USER_AGENT}
if USER_EMAIL:
    headers['From'] = USER_EMAIL

results = []


def lookup_overpass_by_name(name: str):
    """Try Overpass API to find a node/way/relation with the given name and a railway tag.
    Returns a dict with 'lat' and 'lon' keys or None.
    """
    overpass_url = 'https://overpass-api.de/api/interpreter'
    # build a case-insensitive name match for railway-tagged objects
    q = f'''[out:json][timeout:25];
(node["name"~"{name}",i]["railway"];way["name"~"{name}",i]["railway"];relation["name"~"{name}",i]["railway"];);
out center 1;'''
    try:
        r = requests.post(overpass_url, data={'data': q}, headers={'User-Agent': USER_AGENT}, timeout=60)
        if r.status_code != 200:
            return None
        data = r.json()
        elems = data.get('elements', [])
        if not elems:
            return None
        el = elems[0]
        # node has direct lat/lon
        if el.get('type') == 'node' and 'lat' in el and 'lon' in el:
            return {'lat': el.get('lat'), 'lon': el.get('lon'), 'display_name': el.get('tags', {}).get('name')}
        # way/relation should have a center
        center = el.get('center')
        if center and 'lat' in center and 'lon' in center:
            return {'lat': center.get('lat'), 'lon': center.get('lon'), 'display_name': el.get('tags', {}).get('name')}
        return None
    except Exception:
        return None

for name in stations:
    q = f"{name} railway station India"
    print(f"Looking up: {q}")
    try:
        r = requests.get(base, params={'q': q, 'format': 'json', 'limit': 1}, headers=headers, timeout=30)
        if r.status_code == 200:
            data = r.json()
            if data:
                item = data[0]
                results.append({
                    'query': name,
                    'display_name': item.get('display_name'),
                    'lat': item.get('lat'),
                    'lon': item.get('lon'),
                    'type': item.get('type')
                })
                print(' ->', item.get('lat'), item.get('lon'), '-', item.get('display_name'))
            else:
                print(' -> NOT FOUND in Nominatim, trying Overpass...')
                ov = lookup_overpass_by_name(name)
                if ov:
                    print(' -> Overpass found:', ov.get('lat'), ov.get('lon'), '-', ov.get('display_name'))
                    results.append({'query': name, 'display_name': ov.get('display_name'), 'lat': ov.get('lat'), 'lon': ov.get('lon'), 'source': 'overpass'})
                else:
                    print(' -> NOT FOUND')
                    results.append({'query': name, 'display_name': None, 'lat': None, 'lon': None})
        else:
            print(' -> HTTP', r.status_code)
            results.append({'query': name, 'error': f'HTTP {r.status_code}'})
    except Exception as e:
        print(' -> ERROR', e)
        results.append({'query': name, 'error': str(e)})
    time.sleep(1.1)

out = os.path.join(os.getcwd(), 'station-lookup-results.json')
with open(out, 'w', encoding='utf8') as f:
    json.dump(results, f, indent=2, ensure_ascii=False)

print('\nSaved results to', out)
print('Please review station-lookup-results.json and paste it here or attach it; I will inject coordinates into the map.')
