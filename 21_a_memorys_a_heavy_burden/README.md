## A Memory's a Heavy Burden

**Author**: Indrath

**Category**: Osint

**Difficulty**: Medium

## Description
You now find yourself in the place where many climbers have been laid to rest. A cold wind moves through the *temple* grounds, carrying whispers of the departed. Stone lanterns and marble graves reflect *Buddhist* traditions, their shadows stretching across the frost-covered earth.

The temple rests in the shadow of a very *iconic mountain*, quiet and imposing. Every detail in the image, the arrangement of the graves, the lanterns, and the lingering scent of incense, holds clues to its true location. You need to uncover the exact coordinates of where you are to move on from here.

Note: round off coordinates to 3 decimal places.

Flag format: citadel{XX.XXX_XXX.XXX}

## Writeup

Looking at the [picture](location.png), first comes the identification of the mountain. Looking at the epitaphs on the graves and the *iconic mountain* we can decipher that the location is in Japan and the mountain is `Mt. Fuji`.

Now, looking at the compass at the bottom right we see that Mt. Fuji is to the **south**. So we now need to look for a *Buddhist temple* containing a graveyard to the north of *Mt. Fuji*.
![](<images/image1.png>)

Searching for "temple" will give us the above results, now going to street view for each temple will eventually give the correct temple and the exact view as in the picture.

![](<images/image2.png>)

![](<images/image.png>)

We get exact coordinates as - 35.485689, 138.698744. Rounding off to 3 decimal places, we get our flag.

**Flag**: `citadel{35.486_138.699}`
 
