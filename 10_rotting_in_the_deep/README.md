## Rotting in the Deep

**Author**: AppleMango

**Category**: Cryptography

**Difficulty**: Easy

## Description
The floor is quiet, almost unnervingly so – like the Citadel has paused to take your measure. A soft ring of presence settles around the chamber, the kind that marks a true landing: from here, it will ask for more and, in return, grant more. Etched into its surface is a sequence of numbers, worn and faint, as if time itself is eating them away.
A whisper from the echoes guides you: 

*The message lies beneath the surface. Push it three steps forward in the cycle of life, and only then will the words emerge from the void.*


## Writeup

Flag is converted to an integer and each digit is shifted by 3. Reversing the process gets the flag.

```python
from Crypto.Util.number import *
ct = '6895840967002953721051398351211751734500850509315790892845302801984496338433523326225010635779036738800318'
flag = ''
for digit in ct:
    flag += str((int(digit)-3)%10)

print(long_to_bytes(int(flag)))
```

flag: `citadel{br0_r34lly_unr0tt3d_m3_b4ck_t0_l1f3}`
