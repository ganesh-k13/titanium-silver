from server.flaskr import app
import os
from flask import request, abort, make_response, jsonify, render_template, send_from_directory
import random

# Serve React App
# DO NOT REMOVE THIS ROUTE
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if app.config["DEVELOPMENT"]:
        return "not valid"
    return render_template("index.html")
