# Randomly Accessed Memories

Author: pseudonymous

Category: Misc

Difficulty: Easy

On your ascent to this floor, you hear these fragments being played back —

```
clone it, pull it, reset it, stage it, 
commit, push it, fork, rebase it. 
merge it, branch it, tag it, log it, 
add it, stash it, diff, untrack it … 
```

You look around and discover a chamber containing a vast archive of Daft Punk’s music, intertwined with cryptic commits left behind by other musicians. They seem ordinary at first glance, but not everything in the history is what it seems. The archive: <https://github.com/evilcryptonite/daft-punk-archive>

## Solve

- Flag is split into 3 secret chunks.
- Secret pieces placed at commits: [56, 122, 279]
- pieces are b64 encoded, decoding & attaching them gives you the flag.

### Flag: citadel{w3_4r3_up_4ll_n1t3_t0_g1t_lucky}
