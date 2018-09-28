#!flask/bin/python3

import requests as req
import argparse

def sendCode():
	# Open the code file using the path sent.
	fp = open(args.inputCode,"r")
	code = None
	if(fp.readable()):
		code = fp.readlines()

	# Create the data object to be sent to server.
	data = {
		"USN":"01FB15ECS889",
		"code":code,
		"progLang":"Python3",
		"questionHash":args.questionHash,
	}

	# Make a post request with the data to be sent.
	res = req.post("http://localhost:5000/submitCode",json = data,headers={"content-type":"application/json"})

	if(res.ok):
		return(res.text)
	else:
		return("Error occured : ",res.status_code) #TODO: Change this to error code


if __name__=="main":
	# Parse CLI Arguments
	parser = argparse.ArgumentParser()

	parser.add_argument("-u","--upload",dest='inputCode', type=str, required=True, help="/path/to/the/file/having/code.ext")
	parser.add_argument("-q","--question",dest='questionHash',  type=str, help="Hash value of the question")

	args = parser.parse_args()

	retCode = sendCode(args.inputCode, args.questionHash)
	print(retCode)
