# Field Day

Author: pikaze
Category: Hardware
Level: Medium


### Challenge Description
 Deep within the fortified citadel, ancient UNIVAC mainframes hum with classified transmissions. You have spent days infiltrating the Citadel's military grade communication defenses and manage to intercept a FIELDATA transmission encoded onto one of the first methods of storing data. However the data is trapped behind a peculiar digital representation of the FIELDATA encoding, different from the usual 6 bit pairing. Decode the 12 bit transmission to uncover the resistance's secret message.
 
 Attachments: `transmission.txt`
 Flag Format: `citadel{decodedtransmission}`


### Solve
The question mentions the FIELDATA format, and looking for `UNIVAC FIELDATA` will lead you to this [page](https://www.fourmilab.ch/documents/univac/fieldata.html). One of the first methods of storing data in computers were [punched cards](https://en.wikipedia.org/wiki/Punched_card). We need to interpret the data as if it was stored in 80 column punched cards (which have 12 rows, as evident from the lookup table on the aforementioned site). 

We have to decode the binary data from _12 bit pairs_, where **`1`s represent the punched rows**, `0`s represent the unpunched row numbers and each column is a 12 bit pair. In punched cards, the rows are always numbered as 12th, 11th, and then 0-9th in order. 

What is key to note in the description is that we are dealing with _military_  FIELDATA transmission, which **allows for a conversion between upper and lower case**, by using two specific punched card combinations (`[` for converting the subsequent characters to lower case and similarly, `]` for converting the subsequent characters as upper case).


We can script a solution follows to obtain the flag from the given FIELDATA data,
```python
ENCODE_TABLE = {
    '@': '000000000110',  # 7-8
    '#': '100000000110',  # 12-7-8
    '\n': '010000000110',  # 11-7-8 (Carriage Return)
    ' ': '000000000000',  # (Space)
    'A': '100100000000',  # 12-1
    'B': '100010000000',  # 12-2
    'C': '100001000000',  # 12-3
    'D': '100000100000',  # 12-4
    'E': '100000010000',  # 12-5
    'F': '100000001000',  # 12-6
    'G': '100000000100',  # 12-7
    'H': '100000000010',  # 12-8
    'I': '100000000001',  # 12-9
    'J': '010100000000',  # 11-1
    'K': '010010000000',  # 11-2
    'L': '010001000000',  # 11-3
    'M': '010000100000',  # 11-4
    'N': '010000010000',  # 11-5
    'O': '010000001000',  # 11-6
    'P': '010000000100',  # 11-7
    'Q': '010000000010',  # 11-8
    'R': '010000000001',  # 11-9
    'S': '001010000000',  # 0-2
    'T': '001001000000',  # 0-3
    'U': '001000100000',  # 0-4
    'V': '001000010000',  # 0-5
    'W': '001000001000',  # 0-6
    'X': '001000000100',  # 0-7
    'Y': '001000000010',  # 0-8
    'Z': '001000000001',  # 0-9
    ')': '100000100010',  # 12-4-8
    '-': '010000000000',  # 11
    '+': '100000000000',  # 12
    '<': '100000001010',  # 12-6-8
    '=': '000001000010',  # 3-8
    '>': '000000001010',  # 6-8
    '&': '000010000010',  # 2-8
    '$': '010001000010',  # 11-3-8
    '*': '010000100010',  # 11-4-8
    '(': '001000100010',  # 0-4-8
    '%': '001000010010',  # 0-5-8
    ':': '000000010010',  # 5-8
    '?': '101000000000',  # 12-0
    '!': '011000000000',  # 11-0
    ',': '001001000010',  # 0-3-8
    '\\': '001000001010', # 0-6-8 (End of Message)
    '0': '001000000000',  # 0
    '1': '000100000000',  # 1
    '2': '000010000000',  # 2
    '3': '000001000000',  # 3
    '4': '000000100000',  # 4
    '5': '000000010000',  # 5
    '6': '000000001000',  # 6
    '7': '000000000100',  # 7
    '8': '000000000010',  # 8
    '9': '000000000001',  # 9
    "'": '000000100010', # 4-8
    ';': '010000001010',  # 11-6-8
    '/': '001100000000',  # 0-1
    '.': '100001000010',  # 12-3-8
}

DECODE_TABLE = {v: k for k, v in ENCODE_TABLE.items()}
UPPER_CASE = '100000010010'
LOWER_CASE = '010000010010'

def decoder(bin_str):
    if len(bin_str) % 12 != 0:
        return "Error: Binary string length must be multiple of 12"
    
    result = []
    case_mode = 'UPPER'
    
    for i in range(0, len(bin_str), 12):
        pattern = bin_str[i:i+12]
        
        if pattern == UPPER_CASE:
            case_mode = 'UPPER'
        elif pattern == LOWER_CASE:
            case_mode = 'LOWER'
        elif pattern in DECODE_TABLE:
            char = DECODE_TABLE[pattern]
            if char.isalpha() and case_mode == 'LOWER':
                char = char.lower()
            result.append(char)
    
    return ''.join(result)

binary = input().strip()
print(decoder(binary))
```

### Flag: `citadel{r3b3ll10n$&BU1lt:0nH0p3}`
