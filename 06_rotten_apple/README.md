# Rotten Apple

**Author**: teayah 

**Category**: Cryptography

**Difficulty:** Easy

## Description

Among the debris of this floor, you find a relic of sound: An album which turns out to be D>E>A>T>H>M>E>T>A>L by Panchiko, a long lost album. But the music is warped, as though it has undergone disc *rot*.

The path forward is hidden in the distortion. Similar to how the album was warped, the password to the next floor has been warped first by a factor of *47*, then by a factor of *13*. Untangle these changes to reveal the code and continue your ascent.

```
4:R256=Y3oRRoP0#~%Ro?A
```

## Solve

- Since the description hints at a 'rot' along with mentioning numbers 47 & 13, it's likely ROT-47 was being used and then ROT-13 and to decrypt you would have to:
  - Apply ROT-13: `4:E256=L3bEEbC0#~%Eb?N`
  - Then ROT-47: `citadel{b3tt3r_ROTt3n}`

## Flag: `citadel{b3tt3r_ROTt3n}`
