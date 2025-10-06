## Omniscient Flag's Metadata

**Author**: Indrath

**Category**: Forensics

**Difficulty**: Easy

## Description
As you step into the second chamber, a figure manifests before you. Before you stands a forgotten deity, a dead god spoken of only in whispers. Known by countless names: *“Apostle of Epilogue and Eternity,”* *“Lone Messiah”* and many more lost to time.

They leave nothing but a single image, a relic carrying his final secret. Hidden within its layers lies the key to ascend to the next chamber.


## Writeup

As the challenge talks about Metadata we first run `exiftool` on the image.
```
ExifTool Version Number         : 12.57
File Name                       : challenge.jpg
Directory                       : .
File Size                       : 371 kB
File Modification Date/Time     : 2025:10:02 02:43:04+05:30
File Access Date/Time           : 2025:10:02 02:43:04+05:30
File Inode Change Date/Time     : 2025:10:02 02:43:04+05:30
File Permissions                : -rw-r--r--
File Type                       : JPEG
File Type Extension             : jpg
MIME Type                       : image/jpeg
XMP Toolkit                     : Image::ExifTool 12.57
Author                          : kdj had a habit of hiding images within images
Image Width                     : 640
Image Height                    : 1017
Encoding Process                : Baseline DCT, Huffman coding
Bits Per Sample                 : 8
Color Components                : 3
Y Cb Cr Sub Sampling            : YCbCr4:2:0 (2 2)
Image Size                      : 640x1017
Megapixels                      : 0.651
```

we get a big hint - `kdj had a habit of hiding images within images`. this clearly means a image is hidden within this image. We can extract the embedded image using `foremost` or `binwalk`.

Here we run `foremost` on challenge.jpg to extract the hidden image within the file. Alternatively we can also use `binwalk` on the terminal or its [online alternative](https://www.unroll.ing/)
```
foremost challenge.jpg
Processing: challenge.jpg
|*|
```
This gives us the embedded PNG which gives us the flag.

![](<flag.png>)


**Flag:** `citadel{th1s_ch4ll3ng3_1s_f0r_th4t_0n3_ex1ft00l_4nd_b1nw4lk_enthus14st}`
`
 
