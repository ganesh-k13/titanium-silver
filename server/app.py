#!flask/bin/python3

from flask import Flask, jsonify, abort, request, make_response, url_for

app = Flask(__name__, static_url_path = "")
    
@app.errorhandler(400)
def notFound(error):
    return make_response(jsonify( { 'error': 'Bad request' } ), 400)

@app.errorhandler(404)
def notFound(error):
    return make_response(jsonify( { 'error': 'Not found' } ), 404)

@app.route('/submitCode/<int:USN>', methods = ['GET'])
def getInfo(USN):
    pass


@app.route('/submitCode', methods = ['POST'])
def getCode():
    if(not request.json):
        abort(400)
    return (jsonify( { 'task': request.json } ), 201)

if __name__ == '__main__':
    app.run(debug = True)