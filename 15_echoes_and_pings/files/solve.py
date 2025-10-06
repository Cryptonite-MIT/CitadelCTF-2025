from scapy.all import rdpcap, ICMP, Raw

pkts = rdpcap("challenge.pcap")

chunks = []
for p in pkts:
    if p.haslayer(ICMP) and p.haslayer(Raw):
        chunks.append((getattr(p[ICMP], "seq", 0), p[Raw].load))

chunks.sort(key=lambda x: x[0])

with open("flag.jpg", "wb") as f:
    f.write(b"".join(c for _, c in chunks))
