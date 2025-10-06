## Case Sensitivity

**Author**: Guitaristsam

**Category**: Misc

**Difficulty**: Medium

## Description

You step into a constricted floor where every movement and operation is limited. Commands are few, space is tight, and options are restricted.        
    
A guardian looms over the floor, its body shifting like liquid metal, enforcing these constraints. It watches your every move, daring you to make do with what you have and uncover the passcode to the next floor despite the restrictions.    



## Writeup

When you connect to the nc you get:
```bash
Ha, I bet you can't find what "FLAG" is in this shitty python interpreter.
What could you possibly even do here?

>>>
```

The word `"FLAG"` is an immediately hint        

Trying basic commands give us this:
```bash
>>> cat flag
cat flag

ERROR:
Traceback (most recent call last):
  File "/chall", line 23, in <module>
    exec('from os import *; ' + clean(user_input))
                                ^^^^^^^^^^^^^^^^^
  File "/chall", line 15, in clean
    raise ValueError(f"NUH UH, {word} is not allowed!{although}")
ValueError: NUH UH, cat is not allowed!
```
    
This helps in realising that it is a Pyjail with a Whitelist     

Trying basic commands like `print` we get:    
```bash
>>> print
print

ERROR:
Traceback (most recent call last):
  File "/chall", line 23, in <module>
    exec('from os import *; ' + clean(user_input))
                                ^^^^^^^^^^^^^^^^^
  File "/chall", line 15, in clean
    raise ValueError(f"NUH UH, {word} is not allowed!{although}")
ValueError: NUH UH, print is not allowed! (although print is very close)
```

We got `ValueError: NUH UH, print is not allowed! (although print is very close)`, which means that we're doing something right.

Also this line => `exec('from os import *; ' + clean(user_input))`, we can see that something is being imported, combining that with our knowledge of `"FLAG"`, we know that it is an environment variable.        

Trying `environ` also gives us:        
```bash
>>> environ
environ

ERROR:
Traceback (most recent call last):
  File "/chall", line 23, in <module>
    exec('from os import *; ' + clean(user_input))
                                ^^^^^^^^^^^^^^^^^
  File "/chall", line 15, in clean
    raise ValueError(f"NUH UH, {word} is not allowed!{although}")
ValueError: NUH UH, environ is not allowed! (although environ is very close)
```        
        
By now we know that the whitelist will have something related to `environ`,`FLAG` and `print`.        

Trying more commands we can figure out that `exec` also works:    
```bash
>>> exec
exec
```    

So now we know that `whitelist=["FLAG","exec",somethingrelatedto(print),somethingrelatedto(environ),...,...]`     

Seeing this and the fact that the challenge is called `Case Sensitivity`, the challenger will try:
```bash
>>> PRINT
PRINT

ERROR:
Traceback (most recent call last):
  File "/chall", line 23, in <module>
    exec('from os import *; ' + clean(user_input))
  File "<string>", line 1, in <module>
NameError: name 'PRINT' is not defined

>>> ENVIRON
ENVIRON

ERROR:
Traceback (most recent call last):
  File "/chall", line 23, in <module>
    exec('from os import *; ' + clean(user_input))
  File "<string>", line 1, in <module>
NameError: name 'ENVIRON' is not defined
```
now looking that the output we can see that it is `NameError: name 'XXXX' is not defined` and not `ValueError: NUH UH, 'XXXX' is not allowed!`                
        
So now we know that : `whitelist=["FLAG","exec",PRINT,ENVIRON,...,...]`

So now we have to figure out how we can use `exec` to craft a payload that somehow gives us the `ENVIRON` variable `"FLAG"`.        
                        
Using this knowlenge the challenger will figures out the word : `lower`.

So the final whitelist will become: `whitelist = ["PRINT", "ENVIRON", "FLAG", "lower", 'exec']`        

Now it's just a matter of making the payload, the challenger can either do :  **`exec("PRINT(ENVIRON".lower() + "['FLAG'])")`** or **`exec("PRINT(ENVIRON".lower() + ")")`**

Final Exploit:
```bash
Ha, I bet you can't find what "FLAG" is in this shitty python interpreter.
What could you possibly even do here?

>>> exec("PRINT(ENVIRON".lower() + "['FLAG'])")
exec("PRINT(ENVIRON".lower() + "['FLAG'])")
citadel{d34th_d035_n07_fr33_y0u_fr0m_7h3_gu17ar15t}
```        

**Flag**: `citadel{d34th_d035_n07_fr33_y0u_fr0m_7h3_gu17ar15t}`            




    
To understand how this works you can look behind the hood:        
```python
import traceback
import re
import sys
sys.stderr = sys.stdout

allowed_words = ["PRINT", "ENVIRON", "FLAG", "lower", 'exec']

def clean(code):
    words = re.findall(r'\b[A-Za-z_][A-Za-z0-9_]*\b', code)
    although = ''
    for word in words:
        if word not in allowed_words:
            if word.upper() in allowed_words:
                although = f" (although {word} is very close)"
            raise ValueError(f"NUH UH, {word} is not allowed!{although}")
    return code

print("Ha, I bet you can't find what \"FLAG\" is in this shitty python interpreter.\nWhat could you possibly even do here?\n")

while True:
    try:
        user_input = input(">>> ")
        exec('from os import *; ' + clean(user_input))
    except Exception as e:
        print("\nERROR: ")
        traceback.print_exception(e)
        print()
```       
