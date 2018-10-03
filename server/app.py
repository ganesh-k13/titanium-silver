#!../flask/bin/python3

import os
from flask import Flask, flash, request, redirect, url_for, abort, make_response, jsonify
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = './static/'
ALLOWED_EXTENSIONS = set(['cpp','py','c','rb','php','java'])

# app = Flask(__name__)
app = Flask(__name__, static_url_path = "")
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

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
    return "Hello World"


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

@app.route('/upload', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        
        if 'file' not in request.files:
            return make_response(jsonify({'error':'No file part'}),404)

        file = request.files['file']

        if file.filename == '':
            return make_response(jsonify({'error':'No selected file'}),404)

        file = request.files['file']
        
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

            return "Done!"


if __name__ == '__main__':
    app.run(debug = True)