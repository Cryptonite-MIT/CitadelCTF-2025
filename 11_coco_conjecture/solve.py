import socket
import re

def steps(n: int) -> int:
    s = 0
    while n != 1:
        if (n & 1) == 0:
            lb = n & -n
            z = lb.bit_length() - 1
            n >>= z
            s += z
        else:
            n = 3 * n + 1
            s += 1
    return s

with socket.create_connection(("127.0.0.1", 420)) as s:
    f = s.makefile("rwb", buffering=0) # turn socket into file object which makes certain operations faster
    while True:
        line = f.readline()
        if not line:
            break
        message = line.decode().strip()
        print(message) # print server data

        m = re.search(r"Round \d+: (\d+)", message)
        if m:
            n = int(m.group(1))
            ans = str(steps(n)) + "\n"
            f.write(ans.encode())
            
        elif "citadel{" in message:
            break # break if flag found in server ouput
