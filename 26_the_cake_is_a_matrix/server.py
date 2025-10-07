from Crypto.Util.number import getPrime
import random
from secret import FLAG

assert len(FLAG) == 41
assert FLAG[:8] == 'citadel{'
assert FLAG[-1] == '}'

flag = FLAG[8:-1]
p = getPrime(128)

def gen_key():
    return [[random.randint(0, p) for _ in range(len(flag)*2)] for _ in range(len(flag)*2)]

def multiply(a, b):
    return [sum(a[i][j] * b[j] for j in range(len(a[0])))%p  for i in range(len(a))]

def weee(s):
    return [int(x) for x in ''.join([bin(ord(i))[2:].zfill(8) for i in s])]

key = gen_key()
out = []
enc = []
for i in range(0,len(flag),8):
    enc.append(multiply(key,weee(flag[i:i+8])))

print('HERE HAVE CAKE:')
print(enc)

print('Now give me your ingredients:')
for i in range(56):
    print('Enter 8 bytes:')
    code = input().strip()
    if len(code) != 8:
        print('That is the wrong amount of ingredients >:(')
        break
    print('have your cake:')
    print(multiply(key,weee(code)))

print("that's all the cake you'll get :)")
print('PS. the prime is ',p)
