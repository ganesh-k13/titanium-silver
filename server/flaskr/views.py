from server.flaskr import app
from server.flaskr import apiServer
import os
from flask import request, abort, make_response, jsonify
import random
from titanium_silver.docker_client import Docker_Client
import pdb

@app.route('/')
def home():
    return "Home page, under development"

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
    #pdb.set_trace()
    if(not request.form):
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
    inputJson = dict(request.form)
    inputJson.update({key:value[0] for key, value in inputJson.items()})
    inputJson['code'] = request.files['code'].stream.read().decode()
    print(inputJson)

    # Get output Dictionary
    output = apiServer.uploadCode(inputJson)


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
