#!../../flask/bin/python3

import requests as req
import argparse

from titanium_silver.thread_custom import threaded 

@threaded
def sendCode(usn, inputCodeFilePath, progLang, questionHash):
	# Open the code file using the path sent.
	
	code = None

	with open(inputCodeFilePath,"r") as fp:
		if(fp.readable()):
			code = fp.read()
	
	# Create the data object to be sent to server.
	data = {
		"USN":usn,
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

	parser.add_argument("--usn",
		dest='usn', 
		type=str, 
		required=True, 
		help="Your USN/SRN")


	parser.add_argument("--upload",
		dest='inputCodeFilePath', 
		type=str, 
		required=True, 
		help="/path/to/the/file/having/code.ext")

	parser.add_argument("--lang",
		dest='progLang', 
		type=str, 
		required=True, 
		help="Program language of uploaded code")

	parser.add_argument("--question",
		dest='questionHash', 
		type=str, 
		help="Hash value of the question")

	args = parser.parse_args()

	retCode = sendCode(args.usn, args.inputCodeFilePath, args.progLang, args.questionHash)
	print(retCode)
