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
    # Create a filename: 
    # inpFileName = 
    #    USN_of_user + _ + questionHash + "." + extension_of_user_code
    # Eg: USN:usn-11, questionHash = 1, progLang = cpp gives :
    # inpFileName = usn-11_1.cpp

    inpFileName = os.path.join(
        INPUT_FOLDER,
        inputJson['USN']+"_"+inputJson['questionHash']+"."+EXTENSIONS[inputJson["progLang"]]
    )
    
    # Open the file in 'w' mode to either overwrite previous
    # submission or create a new file for new submission.
    inputFp = open(inpFileName,"w")

    # Write incoming 'code' string into the file.
    inputFp.write(inputJson['code'])

    inputFp.close()
    
    # ------------------------------------------------------
    # Add lines of code here to communicate with docker code
    # and then read the OP file. Not syncing here will 
    # cause major discrepancies.
    # ------------------------------------------------------

    # Create a filename: 
    # opFileName = 
    #    "op" + _ + USN_of_user + _ + questionHash

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
    return "For testing only"


@app.route('/submitCode', methods = ['POST'])
def getCode():
    if(not request.json):
        abort(400)

    # Read incoming JSON
    # JSON Structure as Key-Value pairs (proposed):
    # +--------------+---------+
    # | USN          | String  |
    # | code         | String  |
    # | progLang     | String  |
    # | questionHash | String  |
    # +--------------+---------+
    #
    
    inputJson = request.json

    # Get output Dictionary
    output = uploadCode(inputJson)


    # JSON Structure as Key-Value pairs (proposed):
    # +--------+--------+
    # | input  | JSON   |
    # | output | String |
    # +--------+--------+
    #

    outputJson = jsonify({
            "input":inputJson,
            "output":output
    })

    return (outputJson, 201)

# Below is some code to directly upload files. May be used in future.
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

