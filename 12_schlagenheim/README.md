# schlagenheim


**Author**: teayah 

**Category**: Forensics

**Difficulty:** Medium


## Description

Your quest continues, but you feel something odd about this room. The only artifact on this floor is a corrupted file held in the hands of a jet-black statue, frozen in the pose of a band *mid*-performance. The passcode to the next floor is hidden within this piece of music, but it can’t be played, as if the wrong extension has scrambled it.

You must take the corrupted file and repair it to reveal the true code that will unlock the door forward.



## Solve

- The given file has the extension set as `.wav` but opening it in a hex editor to view its bytes, you notice that it has *magic bytes* that say `M1D1` which hints towards it being a MIDI file (along with hints from challenge name & description).
- The magic bytes in the header that say `M1D1` have to be changed to `MThd` as that is the file [header](https://ccrma.stanford.edu/~craig/14q/midifile/MidiFileFormat.html) for a MIDI file. 
- After making the modifications, saving it and opening it in a software that can visualize MIDI such as Audacity, the flag is shown.

![midi.png](https://github.com/BlueKnight2345/CITADEL-FINAL/blob/main/12_schlagenheim/midi.png?raw=true)

## Flag: `citadel{8lackM1D1wa5c00l}`

