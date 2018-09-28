#!/usr/bin/python3

# import sys
from flask import Flask, jsonify, abort, request, make_response, url_for

def executeCode(inp):
	# --------------------------------------------------------------------------
	# Put your code to connect to a docker container.
	# --------------------------------------------------------------------------


	# --------------------------------------------------------------------------
	# Return a dictionary. 
	# Following is just a representation with some suggested keys.
	# Your dictionary can contain any result you deem important
	# for an user to see after he's submitted the code. 
	# --------------------------------------------------------------------------
	return {
		"errors":"",
		"warnings":"",
		"numOfTestCasesPassed":0,
		"testCasesPassed":[]
	}

app = Flask(__name__, static_url_path = "")
    
@app.errorhandler(400)
def notFound(error):
    return make_response(
    	jsonify({ 
    		'error': 'Bad request' 
    		}), 
    	400)

@app.errorhandler(404)
def notFound(error):
    return make_response(
    	jsonify({ 
    		'error': 'Not found' 
    		}), 
    	404)

@app.route('/submitCode/<int:USN>', methods = ['GET'])
def getInfo(USN):
    pass


@app.route('/submitCode', methods = ['POST'])
def getCode():
    if(not request.json):
        abort(400)
    inputJson = request.json
    # print(res["code"],file=sys.stderr)
    
    output = executeCode(inputJson)
    
    outputJson = jsonify({
    		"input":inputJson,
    		"output":output
    	})

    return (outputJson, 201)

if __name__ == '__main__':
    app.run(debug = True)