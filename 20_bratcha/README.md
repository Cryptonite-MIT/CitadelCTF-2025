# BRATCHA

**Author**: teayah 

**Category**: Miscellaneous

**Difficulty:** Medium

## Description

A clear chime rolls through the chamber and a new crest ignites on your badge – a quiet promotion. The outer ring is behind you. From here, the Citadel opens its inner systems, and the locks grow heavier because the keys are worth more. Your answers now carry more weight – and earn more in return. The citadel welcomes you to the inner climb.

Near the gate to the next floor you come across a CAPTCHA verification test, but it has been covered by scratches on the decaying wall and misleading letters stopping you from finding the correct key, all to prove you’re human.


## Solve

- First, the visible overlapping letters can be assigned to each position: `c/s g/q x/y h/n x/v B/D h/n S/Z`
- A script with a dictionary of these characters can be used that brutes positions until a valid link is formed.
```python
import requests
from itertools import product
base = "https://pastebin.com/"
chars = {
    '1': ['c','s'],
    '2': ['g','q'],
    '3': ['x','y'],
    '4': ['n','h'],
    '5': ['x','v'],
    '6': ['B','D'],
    '7': ['n','h'],
    '8': ['S','Z']
}
keys = list(chars.keys())
combos = [chars[k] for k in keys]
for combo in product(*combos):
    path = ''.join(combo)
    url = base+path
    response = requests.get(url)
    if response.status_code == 200 and "pastebin.com" in response.text:
        print("[!] Found url:", url)
        break
    else:
        print("[x] Tried url:", url)
```
- Pastebin URL: https://pastebin.com/sqxnxBhZ

## Flag: `citadel{1m_3v3rywh3r3_1m_s0_jul1a}`
