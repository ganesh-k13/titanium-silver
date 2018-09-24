#!/bin/bash
# Basic while loop
counter=0
while [ $counter -le $2 ]
do
	sudo docker rm $1$counter
	((counter++))
done
