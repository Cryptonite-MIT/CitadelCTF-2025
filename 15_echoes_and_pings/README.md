## Echoes and Pings

**Author**: Indrath

**Category**: Forensics

**Difficulty**: Medium

## Description
You come across the remnants of a fallen corporation and the final network communication ever sent by them.

Allegedly, the message contained an *image* that predicted the rise of the Citadel. Your task is to uncover what was sent and decode the communication to extract the passcode that will unlock the next floor.
## Writeup

Looking at the protocol hierarchy of the pcap we see there are 36 TCP packets and 2 ICMP packets. As the description says a "image" was sent over a protocol, we can search for starting bytes of an image.

![protocol_hierarchy](<files/protocol_hierarchy.png>)


Now looking at the data of the 1st ICMP packet we see the signature bytes of a jpg file - `ff d8 ff e0` followed by JFIF,

![packet 1](<files/jpg_packet1.png>)

Now looking at the 2nd ICMP packet, we see the ending bytes of a jpg file -`ff d9`

![packet 1](<files/jpg_packet2.png>)

So this means a jpg file was sent in over the ICMP protocol, so we extract the ICMP data of the packets and we save it as a jpg file.

There are multiple ways to do this, we can write a [python script](files/solve.py) utilizing scapy to save the extracted ICMP packet data.

![flag](<files/flag.jpg>)


**Flag**: `citadel{1_r34lly_w4nt_t0_st4y_4t_y0ur_h0us3}`
 
