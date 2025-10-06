## Feels Like We Only Go Backwards

**Author**: shady

**Category**: Reverse Engineering

**Difficulty**: Medium

## Description

After finding the backdoor and making your way to the next floor, you step into a chamber awash with shifting colors and swirling echoes, a concert frozen in time. Kevin Parker stands at the center, his riffs bending reality around him. To ascend, you’ll need to join the session on his terms: push your voice further than comfort, align yourself with the number he hides in the haze, and piece together the melody concealed within layers of reverb. Only then will the music open the way upward.

## Writeup

There are multiple methods to solve this but directly opening it up in IDA/ghidra and reversing it is the easiest. 

* Upon opening the `main` func, we're led to the func which takes care of level 1 and 2 which are redundant.
* Basically the main func is `sub_1240`, where you will find some hardcoded constants and the flag validation mechanism:
    * Verifies if the flag is exactly 37 chars long.
    * for each position, checks if 
    `expected_value[i] == 5*i + key_byte[i] + 2*input_char[i]`


Here is the entire function reverse engineered to output the flag implemented in python:

```python
key_bytes = [0x03, 0x07, 0x0b, 0x0f, 0x0b, 0x07, 0x03, 0x07, 0x0b, 0x0f, 0x0b, 0x07, 0x03, 0x07, 0x0b, 0x0f, 0x0b, 0x07, 0x03, 0x07, 0x0b, 0x0f, 0x0b, 0x07, 0x03, 0x07, 0x0b, 0x0f, 0x0b, 0x07, 0x03, 0x07, 0x0b, 0x0f, 0x0b, 0x07, 0x03]

expected = [0x00c9, 0x00de, 0x00fd, 0x00e0, 0x00e7, 0x00ea, 0x00f9, 0x0120, 0x00ff, 0x009c, 0x0121, 0x00fc, 0x009f, 0x0124, 0x00b7, 0x0118, 0x0135, 0x00bc, 0x0141, 0x00cc, 0x012d, 0x0148, 0x00d9, 0x0164, 0x015f, 0x0142, 0x00ef, 0x0154, 0x015d, 0x0100, 0x0175, 0x0160, 0x018f, 0x011c, 0x0183, 0x011c, 0x01b1]

result = ""
for i in range(37):
    char_val = (expected[i] - key_bytes[i] - 5*i) // 2
    result += chr(char_val)

print("ye le flag: " + result)
```

**Flag:** `citadel{f0r_0n3_m0r3_h0ur_1_c4n_r4g3}`


    




