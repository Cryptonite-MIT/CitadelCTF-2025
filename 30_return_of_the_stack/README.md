# Return of the Stack

Author: pseudonymous

Category: Binary Exploitation

Difficulty: Hard

## Description

## Solve

- 3 functions are given, main(), vuln(), win().
- main() calls vuln(), which has a buffer overflow.
- via the buffer overflow, you can call win() and get the flag.
- looking at the disassembly of the binary, you can see that there is `movaps  xmm1, xmm0`, which is purposely misaligning the stack.
- to get the flag, you need to send a ROP gadget (ret;)

### Flag: citadel{4lw4y5_b0rr0w_&_r3turn}
