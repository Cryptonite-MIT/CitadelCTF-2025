# track 8

**Author**: teayah 

**Category**: Cryptography, OSINT

**Difficulty:** Easy
## Description

Bypassing the second chamber leads to an empty floor except for a single artifact in the center: an old MP3 player, scratched and worn. On its surface, a cipher is etched, a message left behind for anyone who can decode it:
```
twj eys zpr ukm 'viamnwqw' bx lzgo: esmqqui{yyr_oshwwcm_bwupa}
```
When you power it on, the sound fills the chamber. The tracks play like whispers from a lost world, and you recognize it as a song from Panchiko’s latest studio album, particularly *track no. 8*. Its title feels familiar, hinting at a famous cipher. Decrypt it by using the *album name* as your key and continue your ascent.


## Solve

- Applying Vigenère decode with key `ginkgo` on the given ciphertext, as Ginkgo is currently the latest Panchiko album & track number 8 is named Vinegar, you get:
- 
```
now use the key 'panchiko' on flag: rigckmv{osd_ikumqog_tjkjm}
```

- Now using just the flag portion `rigckmv{osd_ikumqog_tjkjm}` and key `panchiko` you get:

```
citadel{add_vinegar_twice}
```


## Flag: `citadel{add_vinegar_twice}`
