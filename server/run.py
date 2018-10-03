#!../flask/bin/python3

import requests as req
import argparse
# not working as expected :/
# from titanium_silver import thread_custom 

import sys
sys.path.insert(0, '../titanium_silver')
from thread_custom import threaded 

def sendCode(inputCodeFilePath,questionHash):
	# Open the code file using the path sent.
	
	code = None

	with open(inputCodeFilePath,"r") as fp:
		if(fp.readable()):
			code = fp.read()
	
	# Create the data object to be sent to server.
	data = {
		"USN":"usn-1",
		"code":code,
		"progLang":"C++",
		"questionHash":questionHash,
	}

	# Make a post request with the data to be sent.
	res = req.post("http://localhost:8000/submitCode",
			json = data,
			headers={
				"content-type":"application/json"
			}
		)

	if(res.ok):
		return(res.text)
	else:
		return("Error occured : ",res.status_code)


if __name__=="__main__":
	# Parse CLI Arguments
	parser = argparse.ArgumentParser()

	parser.add_argument("-u","--upload",
		dest='inputCodeFilePath', 
		type=str, 
		required=True, 
		help="/path/to/the/file/having/code.ext")

	parser.add_argument("-q","--question",
		dest='questionHash', 
		type=str, 
		help="Hash value of the question")

	args = parser.parse_args()

	retCode = sendCode(args.inputCodeFilePath, args.questionHash)
	print(retCode)
