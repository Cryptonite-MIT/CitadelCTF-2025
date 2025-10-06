## Coco Conjecture

**Author**: Indrath

**Category**: Misc

**Difficulty**: Easy

## Description
The door to the next floor is guarded by a figure who calls herself "the dragon CEO". She does not speak of mercy or choice. only of order and efficiency.

To enter the next chamber, you must complete the task presented by her. Complete it exactly as instructed, achieving operational efficiency by her standards, and the path forward will open.


## Writeup

The description and transformations mentioned in [Coco_Conjecture.pdf](Coco_Conjecture.pdf) are self-explanatory. 

This mathematical problem is called [Collatz Conjecture](https://en.wikipedia.org/wiki/Collatz_conjecture).

With the help of the pdf we can make a function that will calculate the collatz steps for each number returned by the server, and using `helper.md` which is provided along with the pdf, we can modify the script to communicate with the instance via `socket` or `pwntools`.

[Solve script](solve.py)

**Flag**: `citadel{k1ryu_c0c0_h4s_4_g0_4t_4n_uns0lv3d_m4th3m4t1cs_pr0bl3m}`
 
