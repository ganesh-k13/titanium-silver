#!../flask/bin/python3

import os
from flask import Flask, flash, request, redirect, url_for, abort, make_response, jsonify
from werkzeug.utils import secure_filename

INPUT_FOLDER = './codes/Input'
OUTPUT_FOLDER = './codes/Output'
EXTENSIONS = {
    "C++":"cpp",
    "Python":"py",
    "Python3":"py",
    "C":"c",
    "Ruby":"rb",
    "PHP5.x":"php",
    "PHP7.x":"php",
    "Java":"java"
}

app = Flask(__name__, static_url_path = "")
app.config['INPUT_FOLDER'] = INPUT_FOLDER
app.config['OUTPUT_FOLDER'] = OUTPUT_FOLDER

def uploadCode(inputJson):
    inpFileName = os.path.join(
        INPUT_FOLDER,
        inputJson['USN']+"_"+inputJson['questionHash']+"."+EXTENSIONS[inputJson["progLang"]]
    )
    
    inputFp = open(inpFileName,"w")
    inputFp.write(inputJson['code'])

    inputFp.close()
    
    opFileName = os.path.join(
        OUTPUT_FOLDER,
        "op"+"_"+inputJson['USN']+"_"+inputJson['questionHash']
    )

    outputFp = open(opFileName,"r")
    output = outputFp.read()
    
    #codeOutput should be a dictionary.
    codeOutput = {"output":output}

    return codeOutput

    
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
    print(inputJson)
    # print(res["code"],file=sys.stderr)
    
    output = uploadCode(inputJson)
    
    outputJson = jsonify({
            "input":inputJson,
            "output":output
    })

    return (outputJson, 201)

# @app.route('/uploadFile', methods=['POST'])
# def uploadFile():
#     if request.method == 'POST':
        
#         if 'file' not in request.files:
#             return make_response(jsonify({'error':'No file part'}),404)

#         file = request.files['file']

#         if file.filename == '':
#             return make_response(jsonify({'error':'No selected file'}),404)
        
#         if file and allowed_file(file.filename):
#             filename = secure_filename(file.filename)
#             file.save(os.path.join(app.config['INPUT_FOLDER'], filename))

#             return "Done!"


if __name__ == '__main__':
    app.run(debug = True)

