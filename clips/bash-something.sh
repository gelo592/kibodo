#!/bin/bash
for v in *.mp4
do
        ffmpeg -i $v -c copy -an $v
done
exit 0
