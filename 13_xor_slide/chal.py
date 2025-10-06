import os
from secret import flag

wrapper = [
    b'bro i have a cRAzy story to tell you i went to ant4rctica and BOOM i saw a random ', 
    b' it was crazy like how did it get there??'
] 

ks = os.urandom(len(wrapper[0] + wrapper[1]) + 9)

flag = bytearray(wrapper[0] + flag + wrapper[1])

for i in range(len(flag) - len(ks) + 1):
    for j in range(len(ks)):
        flag[i + j] = flag[i + j] ^ ks[j]

print(flag.hex())

