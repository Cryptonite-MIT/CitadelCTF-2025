# The Sound of Music

**Author**: teayah 

**Category**: OSINT

**Difficulty:** Medium


## Description

🗼OSINT pt2: `citadweller` had a newfound interest in tracking the music they *last* listened to and posting ratings of new albums on various online platforms.

The flag is hidden in these digital footprints across music platforms and split into three segments. You will need to find all three to uncover the complete code and move on to the next floor.


## Solve

- The description hints that there are profiles on sites such as last.fm, rateyourmusic, albumoftheyear for the user `citadweller`
- On the *shoutbox* of [last.fm/user/citadweller](https://www.last.fm/user/citadweller), there is one part of the flag 
	`citadel{c0mputers_st0pped_exchang1ng_1nf0rmat10n`
- On both [rateyourmusic](https://rateyourmusic.com/~citadweller) & [albumoftheyear](https://www.albumoftheyear.org/user/citadweller/), the same middle part of the flag exists in the profiles which is 
	`_n_started_shar1ng_st0r1es`
- The rateyourmusic & albumoftheyears accounts also have a [tinyurl link](https://tinyurl.com/citadweller) in their bios which is the Spotify under name `citadweller`
- Finally, on a public Spotify playlist by the user, the last flag part is in the playlist description.
	`_n_then_they_were_n0where_t0_be_f0und}`

## Flag: `citadel{c0mputers_st0pped_exchang1ng_1nf0rmat10n_n_started_shar1ng_st0r1es_n_then_they_were_n0where_t0_be_f0und}`


- Hint 1: You already found `citadweller`'s X account. Take a closer look at the link on their profile.

