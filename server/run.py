#!/usr/bin/python3

import requests as req
import argparse

# Parse CLI Arguments
parser = argparse.ArgumentParser()

parser.add_argument("-u","--upload",dest='inputFile', type=str, required=True, help="/path/to/the/file/having/code.ext")
parser.add_argument("-c","--code",dest='codeHash',  type=str, help="Hash value of the file containing the code")

args = parser.parse_args()

# Open the code file using the path sent.
fp = open(args.inputFile,"r")
code = None
if(fp.readable()):
	code = fp.readlines()

# Create the data object to be sent to server.
data = {
	"USN":"01FB15ECS889",
	"code":code,
	"progLang":"Python3",
	"codeHash":args.codeHash,
}

# Make a post request with the data to be sent.
res = req.post("http://localhost:5000/submitCode",json = data,headers={"content-type":"application/json"})

if(res.ok):
	print(res.text)
else:
	print("Error occured : ",res.status_code) #TODO: Change this to error code