#!/bin/bash
# Basic while loop
counter=0
while [ $counter le $1 ]
do
	cp $2 "$3$counter.cpp"
	((counter++))
done
