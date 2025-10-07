## Fast Track

**Author**: kafka

**Category**: web

**Difficulty**: Hard

## Description
At the summit you face a faceless, shifting entity that calls itself the Tower’s creator. It has no shape, no voice, only presence. This is the final trial, not of strength but of *timing*. The Tower moves fast and does not wait. Be *fast*, or be left behind.

## Solve
- Register on the Tower of God portal from `Become Regular`
-  Discover `/store` has `Guardian's Secret Scroll` which is worth 50 points but our balance is 0, Our goal is to be able to buy secret scroll
- There is a `/redeem` page but no promotional vouchers are available for use mentioning how the vouchers were redeemed earlier `All promotional vouchers have been redeemed earlier.`
- By carefully analyzing the source code  discover how redeem vouchers work especially  the mention of `/redeem?discountCode=${encodeURIComponent(code)}` 
- Try going to endpoint `/redeem?discountCode=any` and observe the JSON response : 
   ```
   {
  "success": false,
  "message": "Invalid discount code! Try injections"
   }
  ```
- Following injections try doing Sqli injection to get : 
  ```
  {"success":false,"message":"Wrong database, it's not-SQL"}
  ```

- From the source observe the database being used is Mongo.db which is suspectible to `null` vector vulnerability meaning we can use  Improper Neutralization of Null Byte via `redeem?discountCode[$ne]=null` to leak things.

- Get the voucher `HoHoHo25` from the database and increase your Shinsho Coins from 0 to 5
- From `routes.js` given notice `await new Promise(resolve => setTimeout(resolve, 2000));` which tells you there is 2 seconds delay between sending request and checking. If we could send the same voucher code in between the 2 second window we can sucessfully get to 50 points. This is called Race condition. 

- Use `solve.py` to concurrently send multiple request with the voucher to get the flag.


## Flag:  `citadel{ak1ra_w4it5_f0r_y0u_4t_n1te}`


