from server.flaskr import app
import os
from flask import request, abort, make_response, jsonify, render_template, send_from_directory
import random


# @app.route("/api/setchallenge",methods=["POST"])
# def setchallenge():
# 	if request.method == "POST":
# 		print(request.get_json())

# Serve React App
# @app.route("/")
# def home():
#     return render_template("index.html")

# Serve React App
# DO NOT REMOVE THIS ROUTE
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if app.config["DEVELOPMENT"]:
        return "not valid"
    return render_template("index.html")
