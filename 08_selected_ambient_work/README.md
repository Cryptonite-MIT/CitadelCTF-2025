# Selected Ambient Work


**Author**: teayah 

**Category**: Forensics

**Difficulty:** Easy


## Description

The symphonic adventure does not end here. On the next floor, a single song keeps echoing through the floor, repeating in a haunting loop. Amid the sound, you find a note left by a past candidate. It hints that the song holds a secret message, hidden in plain sight, much like how Aphex Twin concealed his face within his music with the help of spectrograms.

To move forward, you must find the message hidden in this sound. 

Note: Separate the words in the flag with _ and make it UPPERCASE. Example: citadel{S3L3CT3D_AMB13NT_W0RK}



## Solve

- Upon opening the WAV file, a few seconds into the music, Morse code starts playing and it plays throughout the rest of the audio.
- The Morse code audio isn't easily decodable by online tools due to the audio being a bit distorted but on opening the audio and viewing its spectrogram in a program such as Audacity or Sonic Visualiser, the flag format `citadel{` is visible at the 1:00 mark and the closing `}` at 1:12. This indicates the flag is the Morse code in between these timestamps.

![spectrogram.png](spectrogram.png)

- The spectrogram gives a clear view of the flag now which is `.----   .-.. ----- ...- ...--   .---- -.. --` or `1 L0V3 1DM`
- Also, the rest of the Morse code around the flag isn't really important, it decodes to:
```
RICHARD D JAMES AKA APHEX TWIN IS A BRITISH MUSICIAN, COMPOSER AND DJ ACTIVE IN ELECTRONIC MUSIC SINCE 1988 AND IS A PIONEERING FIGURE IN THE INTELLIGENT DANCE MUSIC (IDM) GENRE.
```

## Flag: `citadel{1_L0V3_1DM}`


