## The Cake is a Matrix

**Author**: goosbo

**Category**: Cryptography

**Difficulty**: Hard

## Description
You enter this floor to find a vast dining hall, sterile and impossibly clean. At the head of the table sits a towering mechanical guardian, cables coiled like a throne, her single glowing eye fixed on you. 
On her plate there seems to be a matrix of symbols masquerading as dessert that are generated from a program beside her. Her voice floats across the hall, sweet and mocking: “Go on… eat. I insist. The cake is… well, something else entirely.” Maybe by deciphering the matrix, you might unlock the key to the next floor?

## Writeup

### Given

So the script imports a secret `FLAG` and strips the flag wrapper. This leaves 36 unknown ascii characters.

The `weee` function converts each character in a string to 8 bits and creates a bit vector.
```python
def weee(s):
    return [int(x) for x in ''.join([bin(ord(i))[2:].zfill(8) for i in s])]
``` 

We can see that the flag is converted to chunks of 8 characters each, and each block is passed to the weee function. These resultant bitvectors are multiplied to a secret randomly generated key matrix under modulus of a prime `p`.

The key matrix is a 64x64 matrix with random numbers from 1 to p-1. Each flag block is of order 64x1, so a 64x1 vector of integers less than p is the output of the matrix multiplication. These outputs are printed to the user.

```python
def gen_key():
    return [[random.randint(0, p) for _ in range(len(flag)*2)] for _ in range(len(flag)*2)]

def multiply(a, b):
    return [sum(a[i][j] * b[j] for j in range(len(a[0])))%p  for i in range(len(a))]
```

Then the user can input their own 8 character chunks to multiply with the key matrix under modulus `p`. 

But they are allowed only 56 queries while 64 is needed to make the system of equations deterministic.

### Solution

56 equations are not enough to solve for 64 unknowns per row. But an important observation is that the flag contains only printable ascii characters which has ascii values less than 128.

This means that the 8th bit(MSB) will always be zero. When multiplied with the flag, the key values at these columns are redundant.

Therefore we need only 56 key elements per row making the number of equations sufficient.

Once you query the `nc` with 56 random 8 length string(who are all made up of ascii values less than 128), The important key columns can be solved for.

This can be done using a library that can solve linear equations in modular math like sympy or sage, or gaussian eliminiation can be implemented.

Once the important key elements are found, the flag bits can be recovered by inverting the matrix multiplication.

### Script
```python
from sage.all import *
from pwn import *
import random
import string

HOST = ...
PORT = ...
r = remote(HOST, PORT, level='debug')

def weee(s):
    return [int(x) for x in ''.join([bin(ord(i))[2:].zfill(8)[1:] for i in s])]

def rev_weee(s):
    x = ''
    for i in range(0, len(s), 7):
        x += chr(int(''.join(s[i:i+7]), 2))
    return x

r.recvuntil(b'HERE HAVE CAKE:\r\n')
enc = eval(r.recvline().decode())   
out = []
codes = []

for i in range(56):
    r.recvuntil(b"Enter 8 bytes:\r\n")
    code = ''.join([random.choice(string.ascii_letters + string.digits) for _ in range(8)])
    r.sendline(code.encode())
    r.recvuntil(b'have your cake:\r\n')
    val_line = r.recvline().strip().decode()
    out.append(eval(val_line))
    codes.append(code)

r.recvuntil(b'PS. the prime is ')
p = int(r.recvline().strip().decode())
codes = [weee(code) for code in codes]

out = matrix(GF(p),out)
codes = matrix(GF(p),codes)

mat = codes.T.solve_left(out.T)
flag = 'citadel{'
enc = [matrix(GF(p),e[:56]) for e in enc]
for x in enc:
    e = (mat[:56].solve_right(x.T)).list()
    e = [str(x) for x in e]
    flag += rev_weee(e)

print(flag + '}')
```

Flag: `citadel{7h3_m4tr1x_i5_4_li3_4nd_50_wa5_1}`
