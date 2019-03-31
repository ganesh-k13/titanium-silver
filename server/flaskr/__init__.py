from flask import Flask
import sys
import server.config as config
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(config.DevelopmentConfig)

CORS(app)
db = SQLAlchemy(app)

from server.flaskr import apiServer 
from server.flaskr import views 

from server.flaskr.models import models