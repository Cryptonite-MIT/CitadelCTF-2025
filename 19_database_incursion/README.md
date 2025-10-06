## Database Incursion

**Author**: BlueKnight2345

**Category**: Web

**Difficulty**: Medium

## Description

After your legendary battle with the artist, the virtual world has returned, stretching around you in endless grids and flickering data, you find a rogue data terminal and on careful inspection, you find you’re able to inject rogue structured queries. Using this critical vulnerability, find a way to extract the hidden passcode.

## Writeup

First we are presented with a basic login page with fields for username and password which is vulnerable to sql injections, which are used to malform sql queries run by servers. 

A simple sql query for a login page, is usually something along the lines of `select * from table where username = '$variable' and password = '$variable';`

So, our payload aims to inject something into the query, which always returns `true`.

For the first login page, a working payload is `' or 1=1;--`

Following this we are presented with a screen where we can see details of various employees and search via name, but we can only see 4 employees at a time. The page also includes a field for entering admin password.

One of the initial employees' notes states someone from management has the admin password.

So, management employees can be sorted through using `' or department='Management'--`

This reveals another clue stating that an employee named 'Kiwi' has the password

So by simply searching or querying, for 'Kiwi' we find 4 employees named Kiwi, but none of whom are in management.

So the query is specified to `'or (department='Management' and name='Kiwi')--`

This gets us the required employee entry and gives us the flag

**Flag:** `citadel{wh3n_w1ll_y0u_f1nd_0u7_1f_175_5ql_0r_53qu3l?}`
