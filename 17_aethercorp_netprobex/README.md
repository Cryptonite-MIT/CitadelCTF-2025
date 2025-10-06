## AetherCorp NetprobeX 

**Author**: dunruh

**Category**: Web

**Difficulty**: medium

## Description

You step into a simulation of the past, entering the ruins of AetherCorp, the most ambitious corporation in history, and their creation, NetProbeX, once the most advanced networking tool the world had ever seen. The floor reconstructs the events that led to humanity’s downfall.

Your task is to find the hidden backdoor in NetProbeX, the flaw that triggered the collapse. By uncovering it, you can reverse the damage and retrieve the passcode to advance to the next floor.


## Solve

- Figure out that `%0A` can be used to chain commands.
- Using `ls` command, we can find the files in the directory.
- Using `less` command, we can read the contents of the `mission_briefing.txt` file.
- The file hints that the key is hidden deep within the AetherCorp network.  
- Find the `aethercorp` directory in `/var/lib/` and navigate to it.
- Use `ls` command to find the files in the `aethercorp` directory.
- Use `ls /var/lib/aethercorp/archive -a` command to find `.secrets` directory.
- Use `ls /var/lib/aethercorp/archive/.secrets` command to find `blacksite_key.dat` file.
- Use `less /var/lib/aethercorp/archive/.secrets/blacksite_key.dat` command to read the contents of the `blacksite_key.dat` file and get the flag. 


## Flag:  `citadel{bl4ck51t3_4cc3ss_gr4nt3d}`

