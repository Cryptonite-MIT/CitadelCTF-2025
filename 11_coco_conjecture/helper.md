## Guide to connect to an nc

## The 4 very basic things you need to do

1. **Connect**: open a TCP connection to `host:port`.
2. **Receive**: read bytes the server sends.
3. **Send**: send bytes to the server.
4. **Close**: cleanly close the connection.

You can use `pwntools` or `socket` to connect to the nc.

---

### Functions which will help you

**pwntools**

* `remote(host, port, timeout)`: open a TCP connection.
* `recv(timeout=...)`: read bytes (waits up to timeout).
* `recvuntil(delim, timeout=...)`: read until a delimiter like `b"\n"`.
* `send(data)` / `sendline(data)`: send bytes (sendline adds `\n`).
* `close()`: close the connection.

**socket**

* `socket.create_connection((host,port), timeout)`: open & connect a socket.
* `sock.recv(bufsize)`: receive up to `bufsize` bytes (returns `b''` if closed).
* `sock.sendall(bytes)`: send all bytes reliably.
* `sock.makefile('rb')` + `readline()`: convenient for line-based reads.
* `sock.close()`: close the socket.

---

## pwntools example

Run `pip install pwntools` to install pwntools.

Example script to connect to `127.0.0.1 9999`:
```python

from pwn import remote

r = remote('127.0.0.1', 9999)      # connect
print('connected')
print('server said:', r.recv(timeout=1))   # try to read what the server sends
r.sendline(b'i love citadel ctf')        # send a line
print('reply:', r.recv(timeout=1))
r.close()                              # close
```


---

## socket example

Example script to connect to `127.0.0.1 9999`:
```python

import socket

s = socket.create_connection(('127.0.0.1', 9999), timeout=5)  # connect
print('connected')
print('server said:', s.recv(1024))            # try to read
s.sendall(b'wow this ctf is so good\n')       # send a line
print('reply:', s.recv(1024))
s.close()                                      # close
```



