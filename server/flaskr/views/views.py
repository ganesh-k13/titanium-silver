from server.flaskr import app
from server.flaskr.API import apiServer
import os
from flask import request, abort, make_response, jsonify, render_template, send_from_directory
import random
from titanium_silver.docker_client import Docker_Client
import pdb

# @app.errorhandler(400)
# def notFound(error):
#     return make_response(
#     	jsonify({ 
#     		'error': 'Bad request' 
#     		}), 
#     	400)

# @app.errorhandler(404)
# def notFound(error):
#     return make_response(
#     	jsonify({ 
#     		'error': 'Not found' 
#     		}), 
#     	404)

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

@app.route("/api",methods=["POST"])
def api():
    print(request.get_json())
    return jsonify({"res":"success"})

# Serve React App
# @app.route("/")
# def home():
#     return render_template("index.html")

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if app.config["DEVELOPMENT"]:
        return "not valid"
    return render_template("index.html")
