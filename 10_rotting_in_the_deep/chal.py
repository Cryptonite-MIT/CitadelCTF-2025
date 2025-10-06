from Crypto.Util.number import *
from string import digits
        
flag = b"citadel{f4k3_fl4g_f4k3_fl4g}"
out = ""
KEY = 3
flag = str(bytes_to_long(flag))

for i in flag:
    out += digits[(int(i)+KEY)%10]

print(out)