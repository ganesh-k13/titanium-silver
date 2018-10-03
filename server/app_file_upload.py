import os
from flask import Flask, flash, request, redirect, url_for, abort, make_response, jsonify
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = './static/'
ALLOWED_EXTENSIONS = set(['cpp','py','c','rb','php','java'])

# app = Flask(__name__)
app = Flask(__name__, static_url_path = "")
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    print("filename:",filename)
    res = '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
    print("filename allowed : ",res)
    return res

@app.errorhandler(400)
def errorFn400(error):
    return make_response(
        jsonify({ 
            'error': "error" 
            }), 
        400)

@app.errorhandler(404)
def errorFn404(error):
    return make_response(
        jsonify({ 
            'error': 'Not found' 
            }), 
        404)

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/upload', methods=['GET', 'POST'])
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

