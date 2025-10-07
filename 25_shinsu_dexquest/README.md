## Shinsu DEXquest

**Author**: AppleMangoOrange

**Category**: Reverse Engineering, Android

**Difficulty**: Medium

## Description
As you climb the path, a guardian emerges, its form shifting between the visage of a long-dead climber and a metallic sentinel. It moves with a strange grace, holding out a cartridge containing a single file. You realize the file is compatible with the device you carry and may be the key to continue your ascent toward the Citadel’s heart.

## Writeup
### Part 1: Running the APK
- Running the given .apk file on any Android device shows a main page with a door. Swiping left and right shows two rooms with a button each: one to "enter a barrier" and another to "Observe the Observer".
- The "Enter Barrier" button, upon pressing, crashes the app with the Toast message "You were absolutely deep fried by the barrier". The other button unlocks another page with a number input, which outputs different values for the same input (at times), now we should move onto static analysis.
### Part 2: Static Analysis
- As hinted in the challenge name, open the `.apk` file in JADX. The first instinct is to look for suspicious strings in `Resources/resources.arsc/res/values/strings.xml`, but this does not lead anywhere.
- `MainActivity` is the class that is run on startup. It is located in `Source Code/com/shinsu.dexquest/MainActivity`. There is some `@Metadata(d1 = ` gibberish shown, but this is because it is compiled from Kotlin.
- The MainActivity has a line `Intent intent = new Intent(this, (Class<?>) Room.class);`, which redirects us to the `Room` class in `Source Code/com/shinsu.dexquest/Room`.
- The `Room` class has a lot of code, but the most interesting part is the `switch` statement at the end:
```
switch (position) {
    case 0:
        return NextRoom.INSTANCE.newInstance();
    case 1:
        return Barrier.INSTANCE.newInstance();
    case 2:
        return Entrance.INSTANCE.newInstance();
    case 3:
        return Observer.INSTANCE.newInstance();
    case 4:
        return Vault.INSTANCE.newInstance();
    default:
        throw new IllegalStateException("Unexpected position " + position);
}
```
- Case 4, the `Vault`, is probably where we want to go, as they seem to be ordered as left to right. The leftmost room `NextRoom` is probably the screen being blocked by the "Enter Barrier" button.
- The `NextRoom` class is in `Source Code/com/shinsu.dexquest/screens/NextRoom`. It has a `getFlag()` function, but it seems to require the password from the `Vault` class: `byte[] password = new BigInteger(Vault.INSTANCE.getPassword()).toByteArray();`.
- Looking at the `Vault` class in `Source Code/com/shinsu.dexquest/screens/Vault`, there is a very long function `private final int correctDigits()` that seems to check whether the input is correct, but it also uses random numbers if the value is incorrect (`RangesKt.random(RangesKt.until(0, green), Random.INSTANCE);`), which means the only way to get the correct input is to reverse the logic.
- The function checks the input digit-by-digit, but this can easily be copied over to any other language, with slight modification. The result is the correct input, which is 99 digits and passes the check.:
```
246451121036528202623890120011222498714684815355211850969748918921930947358058258074789422723982625
```
- Enter the correct input into the number field, which shows a Toast message "You have acquired a brand new Shinsu Stabilizer Crystal!". Now pressing the "Enter Barrier" button no longer crashes the app, and takes us to the previously seen `NextRoom` screen. Press the button with the text `<flag>`, which copies the flag to the clipboard:

**Flag**: `citadel{f33ls_g00d_to_n0t_g3t_d33p_fr13d}`
